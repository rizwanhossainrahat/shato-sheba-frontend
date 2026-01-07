"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { updateAppointmentStatusZodSchema } from "@/zod/appointment.validation";
import { revalidateTag } from "next/cache";

export async function getAppointments(queryString?: string) {
    try {
        const endpoint = queryString ? `/appointment?${queryString}` : "/appointment";
        const response = await serverFetch.get(endpoint, {
            next: {
                revalidate: 180,
                tags: ["appointments-list"],
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

export async function getAppointmentById(id: string) {
    try {
        const response = await serverFetch.get(`/appointment/${id}`, {
            next: {
                revalidate: 180,
                tags: [`appointment-${id}`],
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

export async function updateAppointmentStatus(id: string, status: string) {
    try {
        const validationPayload = { status };

        const validatedPayload = zodValidator(validationPayload, updateAppointmentStatusZodSchema);

        if (!validatedPayload.success && validatedPayload.errors) {
            return {
                success: false,
                message: "Validation failed",
                errors: validatedPayload.errors,
            };
        }

        if (!validatedPayload.data) {
            return {
                success: false,
                message: "Validation failed",
            };
        }

        const response = await serverFetch.patch(`/appointment/status/${id}`, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: validatedPayload.data.status }),
        });

        const result = await response.json();

        if (result.success) {
            revalidateTag("appointments-list", { expire: 0 });
            revalidateTag(`appointment-${id}`, { expire: 0 });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        };
    }
}