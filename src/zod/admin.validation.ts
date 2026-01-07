import z from "zod";

export const createAdminZodSchema = z.object({
    name: z.string().min(1, "Name is required").min(3, "Name must be at least 3 characters long"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    contactNumber: z.string().min(1, "Contact Number is required").min(10, "Contact Number must be at least 10 characters long"),
    profilePhoto: z.instanceof(File).refine((file) => file.size > 0, {
        message: "Profile photo is required",
    }),
});

export const updateAdminZodSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").optional(),
    contactNumber: z.string().min(10, "Contact Number must be at least 10 characters long").optional(),
});