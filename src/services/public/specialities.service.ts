"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getPublicSpecialities() {
    try {
        const response = await serverFetch.get("/specialties", {
            next: {
                revalidate: 3600, // Cache for 1 hour since specialities don't change frequently
                tags: ["public-specialities"],
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