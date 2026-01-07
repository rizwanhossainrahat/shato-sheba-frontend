/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IDoctor } from "@/types/doctor.interface";
import { createDoctorZodSchema, updateDoctorZodSchema } from "@/zod/doctors.validation";
import { revalidateTag } from "next/cache";

export async function createDoctor(_prevState: any, formData: FormData) {

    // Log all form data entries
    console.log("=== Form Data Entries ===");
    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
    console.log("=========================");

    // Parse specialties array - make it optional
    const specialtiesString = formData.get("specialties") as string;
    console.log("Raw specialties string:", specialtiesString);
    
    let specialties: string[] = [];
    if (specialtiesString && specialtiesString !== "[]" && specialtiesString !== "" && specialtiesString !== "null") {
        try {
            const parsed = JSON.parse(specialtiesString);
            console.log("Parsed specialties:", parsed);
            if (Array.isArray(parsed)) {
                specialties = parsed.filter((id: string) => id && id.length > 0);
            }
        } catch (e) {
            console.log("JSON parse error:", e);
            specialties = [];
        }
    }
    
    console.log("Final specialties array:", specialties);
    console.log("Specialties length:", specialties.length);

    const experienceValue = formData.get("experience");
    const appointmentFeeValue = formData.get("appointmentFee");

    // Get file and check if it's valid
    const file = formData.get("file") as File;
    const hasValidFile = file && file.size > 0;

    const validationPayload: IDoctor = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        contactNumber: formData.get("contactNumber") as string,
        address: (formData.get("address") as string) || "",
        registrationNumber: formData.get("registrationNumber") as string,
        experience: experienceValue ? Number(experienceValue) : 0,
        gender: formData.get("gender") as "MALE" | "FEMALE",
        appointmentFee: appointmentFeeValue ? Number(appointmentFeeValue) : 0,
        qualification: formData.get("qualification") as string,
        currentWorkingPlace: formData.get("currentWorkingPlace") as string,
        designation: formData.get("designation") as string,
        password: formData.get("password") as string,
        // Only include specialties if we have them
        ...(specialties.length > 0 && { specialties }),
        ...(hasValidFile && { profilePhoto: file }),
    }

    const validatedPayload = zodValidator(validationPayload, createDoctorZodSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        console.log("Validation errors:", validatedPayload.errors);
        // Create a more descriptive error message
        const errorMessages = validatedPayload.errors.map((e: any) => `${e.field}: ${e.message}`).join(", ");
        return {
            success: validatedPayload.success,
            message: `Validation failed: ${errorMessages}`,
            formData: validationPayload,
            errors: validatedPayload.errors,
        }
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        }
    }
    // Transform specialties array - ensure they are valid UUIDs
    const specialtiesForBackend = Array.isArray(validatedPayload.data.specialties) 
        ? validatedPayload.data.specialties.filter((id: string) => id && id.length > 0) 
        : [];
    
    // Build payload exactly as backend expects
    const backendPayload = {
        password: validatedPayload.data.password,
        doctor: {
            name: validatedPayload.data.name,
            email: validatedPayload.data.email,
            contactNumber: validatedPayload.data.contactNumber,
            registrationNumber: validatedPayload.data.registrationNumber,
            gender: validatedPayload.data.gender,
            appointmentFee: validatedPayload.data.appointmentFee || 0,
            qualification: validatedPayload.data.qualification,
            currentWorkingPlace: validatedPayload.data.currentWorkingPlace,
            designation: validatedPayload.data.designation,
            // Only include specialties if we have them
            ...(specialtiesForBackend.length > 0 && { specialties: specialtiesForBackend }),
        }
    };
    
    console.log("Backend payload being sent:", JSON.stringify(backendPayload, null, 2));
    if (specialtiesForBackend.length > 0) {
        console.log("Specialties being sent:", specialtiesForBackend);
        console.log("Number of specialties:", specialtiesForBackend.length);
        console.log("Individual specialty UUIDs:", specialtiesForBackend.map((id, index) => `${index}: "${id}" (length: ${id.length})`));
    } else {
        console.log("No specialties being sent (optional field)");
    }
    
    const newFormData = new FormData()
    newFormData.append("data", JSON.stringify(backendPayload))
    if (hasValidFile) {
        newFormData.append("file", file)
    }

    try {
        const response = await serverFetch.post("/user/create-doctor", {
            body: newFormData,
        })

        const result = await response.json();

        if (result.success) {
            revalidateTag('doctors-list', { expire: 0 });
            revalidateTag('doctors-page-1', { expire: 0 });
            revalidateTag('doctors-search-all', { expire: 0 });
            revalidateTag('admin-dashboard-meta', { expire: 0 });
            revalidateTag('doctor-dashboard-meta', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`,
            formData: validationPayload,

        }
    }
}

export async function getDoctors(queryString?: string) {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";
        const response = await serverFetch.get(`/doctor${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "doctors-list",
                        `doctors-page-${page}`,
                        `doctors-search-${searchTerm}`,
                    ],
                    revalidate: 0, // No cache in development for immediate updates
                },
            });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function getDoctorById(id: string) {
    try {
        const response = await serverFetch.get(`/doctor/${id}`, {
            next: {
                tags: [`doctor-${id}`, "doctors-list"],
                // Reduced to 180s for more responsive doctor profile updates
                revalidate: 180,
            }
        })
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function updateDoctor(id: string, _prevState: any, formData: FormData) {
    const experienceValue = formData.get("experience");
    const appointmentFeeValue = formData.get("appointmentFee");


    const validationPayload: Partial<IDoctor> = {
        name: formData.get("name") as string,
        contactNumber: formData.get("contactNumber") as string,
        address: formData.get("address") as string,
        registrationNumber: formData.get("registrationNumber") as string,
        experience: experienceValue ? Number(experienceValue) : 0,
        gender: formData.get("gender") as "MALE" | "FEMALE",
        appointmentFee: appointmentFeeValue ? Number(appointmentFeeValue) : 0,
        qualification: formData.get("qualification") as string,
        currentWorkingPlace: formData.get("currentWorkingPlace") as string,
        designation: formData.get("designation") as string,
    };

    // Parse specialties array (for adding new specialties)
    const specialtiesValue = formData.get("specialties") as string;
    if (specialtiesValue) {
        try {
            const parsed = JSON.parse(specialtiesValue);
            if (Array.isArray(parsed) && parsed.length > 0) {
                validationPayload.specialties = parsed;
            }
        } catch {
            // Ignore invalid JSON
        }
    }

    // Parse removeSpecialties array (for removing existing specialties)
    const removeSpecialtiesValue = formData.get("removeSpecialties") as string;
    if (removeSpecialtiesValue) {
        try {
            const parsed = JSON.parse(removeSpecialtiesValue);
            if (Array.isArray(parsed) && parsed.length > 0) {
                validationPayload.removeSpecialties = parsed;
            }
        } catch {
            // Ignore invalid JSON
        }
    }
    const validatedPayload = zodValidator(validationPayload, updateDoctorZodSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: validatedPayload.success,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        }
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        }
    }

    try {
        const response = await serverFetch.patch(`/doctor/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedPayload.data),
        })
        const result = await response.json();
        if (result.success) {
            revalidateTag('doctors-list', { expire: 0 });
            revalidateTag(`doctor-${id}`, { expire: 0 });
            revalidateTag('doctors-page-1', { expire: 0 });
            revalidateTag('doctors-search-all', { expire: 0 });
            revalidateTag('admin-dashboard-meta', { expire: 0 });
            revalidateTag('doctor-dashboard-meta', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`,
            formData: validationPayload,
        }
    }
}

export async function softDeleteDoctor(id: string) {
    try {
        const response = await serverFetch.delete(`/doctor/soft/${id}`)
        const result = await response.json();
        if (result.success) {
            revalidateTag('doctors-list', { expire: 0 });
            revalidateTag(`doctor-${id}`, { expire: 0 });
            revalidateTag('doctors-page-1', { expire: 0 });
            revalidateTag('doctors-search-all', { expire: 0 });
            revalidateTag('admin-dashboard-meta', { expire: 0 });
            revalidateTag('doctor-dashboard-meta', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
export async function deleteDoctor(id: string) {
    try {
        const response = await serverFetch.delete(`/doctor/${id}`)
        const result = await response.json();
        if (result.success) {
            revalidateTag('doctors-list', { expire: 0 });
            revalidateTag(`doctor-${id}`, { expire: 0 });
            revalidateTag('doctors-page-1', { expire: 0 });
            revalidateTag('doctors-search-all', { expire: 0 });
            revalidateTag('admin-dashboard-meta', { expire: 0 });
            revalidateTag('doctor-dashboard-meta', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}