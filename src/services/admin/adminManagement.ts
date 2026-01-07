"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createAdminZodSchema, updateAdminZodSchema } from "@/zod/admin.validation";
import { revalidateTag } from "next/cache";

export async function createAdmin(_prevState: any, formData: FormData) {
    try {
        const validationPayload = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            contactNumber: formData.get("contactNumber") as string,
            profilePhoto: formData.get("file") as File,
        };

        const validatedPayload = zodValidator(validationPayload, createAdminZodSchema);

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

        const backendPayload = {
            password: validatedPayload.data.password,
            admin: {
                name: validatedPayload.data.name,
                email: validatedPayload.data.email,
                contactNumber: validatedPayload.data.contactNumber,
            }
        };

        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(backendPayload));
        newFormData.append("file", formData.get("file") as Blob);

        const response = await serverFetch.post("/user/create-admin", {
            body: newFormData,
        });

        const result = await response.json();

        if (result.success) {
            revalidateTag("admins-list", { expire: 0 });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        };
    }
}

export async function getAdmins(queryString?: string) {
    try {
        const endpoint = queryString ? `/admin?${queryString}` : "/admin";
        const response = await serverFetch.get(endpoint, {
            next: {
                revalidate: 180,
                tags: ["admins-list"],
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

export async function getAdminById(id: string) {
    try {
        const response = await serverFetch.get(`/admin/${id}`, {
            next: {
                revalidate: 180,
                tags: [`admin-${id}`],
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

export async function updateAdmin(id: string, _prevState: any, formData: FormData) {
    try {
        const validationPayload = {
            name: formData.get("name") as string,
            contactNumber: formData.get("contactNumber") as string,
        };

        const validatedPayload = zodValidator(validationPayload, updateAdminZodSchema);

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

        const response = await serverFetch.patch(`/admin/${id}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validatedPayload.data),
        });

        const result = await response.json();

        if (result.success) {
            revalidateTag("admins-list", { expire: 0 });
            revalidateTag(`admin-${id}`, { expire: 0 });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        };
    }
}

export async function softDeleteAdmin(id: string) {
    try {
        const response = await serverFetch.delete(`/admin/soft/${id}`);
        const result = await response.json();

        if (result.success) {
            revalidateTag("admins-list", { expire: 0 });
            revalidateTag(`admin-${id}`, { expire: 0 });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        };
    }
}