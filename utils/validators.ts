import {z, ZodType} from "zod";
import {AddLocationForm} from "@/types/location";
import {ACCEPTED_IMAGE_TYPES, ADULTS_PER_NIGHT} from "@/utils/constants";

export const NewLocationSchema: ZodType<AddLocationForm> = z.object({
    title: z.string().min(1).max(50),
    description: z.string().min(1).max(1000),
    lat: z.number(),
    lng: z.number(),
    maxAdultsForNight: z.number().min(1).max(20),
    published: z.boolean(),
    pictures: z.any().refine(
        (files) => {
            return Object.values(files as unknown as File).every((file: File) => {
                return ACCEPTED_IMAGE_TYPES.includes(file.type)
            });
        },
        ".jpg, .jpeg, .png and .webp files are accepted."
    ).optional(),
});

export const SearchLocationSchema = z.object({
    city: z.string().min(1).max(100),
    to: z.string(),
    maxAdultsForNight: z.number().min(ADULTS_PER_NIGHT.MIN).max(ADULTS_PER_NIGHT.MAX),
    from: z.string()
}).refine((data) => new Date(data.from) < new Date(data.to), {
    message: "End date cannot be earlier than start date.",
    path: ["to"],
});

export const SignupSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1).max(20),
    surname: z.string().min(1).max(20),
    profile: z.string().min(1).max(20),
    password: z
        .string()
        .min(8, {message: "At least 8 chars long"})
        .regex(/[0-9]/, { message: 'Contain at least one number' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter' })
        .trim(),
    confirmPassword: z
        .string()
        .min(8, {message: "At least 8 chars long"})
        .regex(/[0-9]/, { message: 'Contain at least one number' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter' })
        .trim(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must be equals",
    path: ["confirmPassword"]
});


export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});
