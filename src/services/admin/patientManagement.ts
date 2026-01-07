"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { updatePatientZodSchema } from "@/zod/patient.validation";
import { revalidateTag } from "next/cache";

export async function getPatients(queryString?: string) {
    try {
        const endpoint = queryString ? `/patient?${queryString}` : "/patient";
        
        const response = await serverFetch.get(endpoint, {
            next: {
                revalidate: 0, // No cache for immediate updates
                tags: ["patients-list"],
            },
        });

        const result = await response.json();
        
        // If the API call failed due to missing table, return a helpful error
        if (!result.success && result.message?.includes('madical_reports')) {
            return {
                success: false,
                message: "Database schema issue: medical_reports table is missing. Please run database migrations or update backend to exclude medical reports.",
                data: [],
                error: "MISSING_TABLE"
            };
        }
        
        return result;
    } catch (error: any) {
        // Check if error is related to missing medical_reports table
        if (error.message?.includes('madical_reports') || error.message?.includes('medical_reports')) {
            return {
                success: false,
                message: "Database table 'medical_reports' does not exist. Please create the table or update backend to exclude medical reports from patient queries.",
                data: [],
                error: "MISSING_TABLE"
            };
        }
        
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
            data: [],
        };
    }
}

export async function getPatientById(id: string) {
    try {
        const response = await serverFetch.get(`/patient/${id}`, {
            next: {
                revalidate: 0, // No cache for immediate updates
                tags: [`patient-${id}`],
            },
        });

        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        };
    }
}

export async function updatePatient(id: string, _prevState: any, formData: FormData) {
    try {
        const validationPayload = {
            name: formData.get("name") as string,
            contactNumber: formData.get("contactNumber") as string,
            address: formData.get("address") as string,
        };

        const validatedPayload = zodValidator(validationPayload, updatePatientZodSchema);

        if (!validatedPayload.success && validatedPayload.errors) {
            return {
                success: false,
                message: "Validation failed",
                formData: validationPayload,
                errors: validatedPayload.errors,
            };
        }

        if (!validatedPayload.data) {
            return {
                success: false,
                message: "Validation failed",
                formData: validationPayload,
            };
        }

        const response = await serverFetch.patch(`/patient/${id}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validatedPayload.data),
        });

        const result = await response.json();

        if (result.success) {
            revalidateTag("patients-list", { expire: 0 });
            revalidateTag(`patient-${id}`, { expire: 0 });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        };
    }
}

export async function softDeletePatient(id: string) {
    try {
        const response = await serverFetch.delete(`/patient/soft/${id}`);
        const result = await response.json();

        if (result.success) {
            revalidateTag("patients-list", { expire: 0 });
            revalidateTag(`patient-${id}`, { expire: 0 });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        };
    }
}