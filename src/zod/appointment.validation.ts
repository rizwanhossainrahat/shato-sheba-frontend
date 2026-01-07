import z from "zod";

export const updateAppointmentStatusZodSchema = z.object({
    status: z.enum(["SCHEDULED", "INPROGRESS", "COMPLETED", "CANCELED"], {
        message: "Status must be one of: SCHEDULED, INPROGRESS, COMPLETED, CANCELED"
    }),
});