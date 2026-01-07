import z from "zod";

export const createScheduleZodSchema = z.object({
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
}).refine((data) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    return endDate >= startDate;
}, {
    message: "End date must be greater than or equal to start date",
    path: ["endDate"],
}).refine((data) => {
    // Compare times only if dates are the same
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    
    if (startDate.toDateString() === endDate.toDateString()) {
        const [startHour, startMinute] = data.startTime.split(':').map(Number);
        const [endHour, endMinute] = data.endTime.split(':').map(Number);
        
        const startTimeMinutes = startHour * 60 + startMinute;
        const endTimeMinutes = endHour * 60 + endMinute;
        
        return endTimeMinutes > startTimeMinutes;
    }
    
    return true;
}, {
    message: "End time must be greater than start time",
    path: ["endTime"],
});