"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createSpecialityZodSchema, updateSpecialityZodSchema } from "@/zod/specialities.validation";
import { revalidateTag } from "next/cache";

export async function createSpeciality(_prevState: any, formData: FormData) {
    try {
        const validationPayload = {
            title: formData.get("title") as string,
        };

        const validatedPayload = zodValidator(validationPayload, createSpecialityZodSchema);

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

        // Prepare FormData for file upload
        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(validatedPayload.data));

        // Add file if provided
        const file = formData.get("file") as File;
        if (file && file.size > 0) {
            newFormData.append("file", file);
        }

        const response = await serverFetch.post("/specialties", {
            body: newFormData,
        });

        const result = await response.json();

        if (result.success) {
            revalidateTag("specialities-list", { expire: 0 });
            revalidateTag("admin-specialities", { expire: 0 });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        };
    }
}

export async function getSpecialities(queryString?: string) {
    try {
        const endpoint = queryString ? `/specialties?${queryString}` : "/specialties";
        const response = await serverFetch.get(endpoint, {
            next: {
                revalidate: 0, // No cache for immediate updates
                tags: ["specialities-list", "admin-specialities"],
            },
        });

        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
            data: [],
        };
    }
}

export async function getSpecialityById(id: string) {
    try {
        const response = await serverFetch.get(`/specialties/${id}`, {
            next: {
                revalidate: 0,
                tags: [`speciality-${id}`],
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

export async function updateSpeciality(id: string, _prevState: any, formData: FormData) {
    try {
        const validationPayload = {
            title: formData.get("title") as string,
        };

        const validatedPayload = zodValidator(validationPayload, updateSpecialityZodSchema);

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

        // Prepare FormData for file upload
        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(validatedPayload.data));

        // Add file if provided
        const file = formData.get("file") as File;
        if (file && file.size > 0) {
            newFormData.append("file", file);
        }

        const response = await serverFetch.patch(`/specialties/${id}`, {
            body: newFormData,
        });

        const result = await response.json();

        if (result.success) {
            revalidateTag("specialities-list", { expire: 0 });
            revalidateTag("admin-specialities", { expire: 0 });
            revalidateTag(`speciality-${id}`, { expire: 0 });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        };
    }
}

export async function deleteSpeciality(id: string) {
    try {
        const response = await serverFetch.delete(`/specialties/${id}`);
        const result = await response.json();

        if (result.success) {
            revalidateTag("specialities-list", { expire: 0 });
            revalidateTag("admin-specialities", { expire: 0 });
            revalidateTag(`speciality-${id}`, { expire: 0 });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        };
    }
}