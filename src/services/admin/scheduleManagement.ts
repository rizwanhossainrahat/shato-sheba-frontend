"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createScheduleZodSchema } from "@/zod/schedule.validation";
import { revalidateTag } from "next/cache";

export async function createSchedule(_prevState: any, formData: FormData) {
    try {
        const validationPayload = {
            startDate: formData.get("startDate") as string,
            endDate: formData.get("endDate") as string,
            startTime: formData.get("startTime") as string,
            endTime: formData.get("endTime") as string,
        };

        const validatedPayload = zodValidator(validationPayload, createScheduleZodSchema);

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

        // Send data in the exact format backend expects
        const backendPayload = {
            startDate: validatedPayload.data.startDate,
            endDate: validatedPayload.data.endDate,
            startTime: validatedPayload.data.startTime,
            endTime: validatedPayload.data.endTime,
        };

        const response = await serverFetch.post("/schedule", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(backendPayload),
        });

        const result = await response.json();

        if (result.success) {
            revalidateTag("schedules-list", { expire: 0 });
            revalidateTag("admin-schedules", { expire: 0 });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        };
    }
}

export async function getSchedules(queryString?: string) {
    try {
        const endpoint = queryString ? `/schedule?${queryString}` : "/schedule";
        const response = await serverFetch.get(endpoint, {
            next: {
                revalidate: 0, // No cache in development
                tags: ["schedules-list", "admin-schedules"],
            },
        });

        const result = await response.json();
        
        // Debug logging to see actual response structure
        if (process.env.NODE_ENV === 'development') {
            console.log("=== SCHEDULE RESPONSE DEBUG ===");
            console.log("Success:", result.success);
            console.log("Data length:", result.data?.length || 0);
            if (result.data && result.data.length > 0) {
                console.log("First schedule structure:", JSON.stringify(result.data[0], null, 2));
            }
            console.log("===============================");
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
            data: [],
        };
    }
}

export async function getScheduleById(id: string) {
    try {
        const response = await serverFetch.get(`/schedule/${id}`, {
            next: {
                revalidate: 180,
                tags: [`schedule-${id}`],
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

export async function deleteSchedule(id: string) {
    try {
        const response = await serverFetch.delete(`/schedule/${id}`);
        const result = await response.json();

        if (result.success) {
            revalidateTag("schedules-list", { expire: 0 });
            revalidateTag("admin-schedules", { expire: 0 });
            revalidateTag(`schedule-${id}`, { expire: 0 });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
        };
    }
}