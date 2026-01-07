import z from "zod";

export const createDoctorZodSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    name: z.string().min(1, "Name is required").min(3, "Name must be at least 3 characters long"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    contactNumber: z.string().min(1, "Contact Number is required").min(10, "Contact Number must be at least 10 characters long"),
    address: z.string().optional().default(""),
    registrationNumber: z.string().min(1, "Registration Number is required").min(3, "Registration Number must be at least 3 characters long"),
    experience: z.number().min(0, "Experience cannot be negative").default(0),
    gender: z.enum(["MALE", "FEMALE"], { message: "Gender must be either 'MALE' or 'FEMALE'" }),
    appointmentFee: z.number().min(0, "Appointment Fee cannot be negative").default(0),
    qualification: z.string().min(1, "Qualification is required").min(3, "Qualification must be at least 3 characters long"),
    currentWorkingPlace: z.string().min(1, "Current Working Place is required").min(3, "Current Working Place must be at least 3 characters long"),
    designation: z.string().min(1, "Designation is required").min(2, "Designation must be at least 2 characters long"),
    specialties: z.array(
        z.string().uuid({ message: "Each specialty must be a valid UUID" })
    ).min(1, { message: "At least one specialty is required" }).optional(),
    profilePhoto: z.any().optional(),
});

export const updateDoctorZodSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").optional(),
    profilePhoto: z.string().optional(),
    contactNumber: z.string().min(10, "Contact Number must be at least 10 characters long").optional(),
    address: z.string().optional(),
    registrationNumber: z.string().min(3, "Registration Number must be at least 3 characters long").optional(),
    experience: z.number().min(0, "Experience cannot be negative").optional(),
    gender: z.enum(["MALE", "FEMALE"], { message: "Gender must be either 'MALE' or 'FEMALE'" }).optional(),
    appointmentFee: z.number().min(0, "Appointment Fee cannot be negative").optional(),
    qualification: z.string().min(3, "Qualification must be at least 3 characters long").optional(),
    currentWorkingPlace: z.string().min(3, "Current Working Place must be at least 3 characters long").optional(),
    designation: z.string().min(2, "Designation must be at least 2 characters long").optional(),
    specialties: z.array(z.string()).optional(),
    removeSpecialties: z.array(z.string()).optional(),
});