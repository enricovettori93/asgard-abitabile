import {z, ZodType} from "zod";
import {AddLocationForm, LocationSearchForm} from "@/types/location";
import {ACCEPTED_IMAGE_TYPES, ADULTS_PER_NIGHT} from "@/utils/constants";
import {AddUserForm, EditUserForm, EditUserPasswordForm} from "@/types/user";

export const NewLocationSchema: ZodType<AddLocationForm> = z.object({
    title: z.string().min(1).max(50),
    description: z.string().min(1).max(1000),
    lat: z.number(),
    lng: z.number(),
    maxAdultsForNight: z.number().min(1).max(20),
    priceForNight: z.number().min(0),
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

export const SearchLocationSchema: ZodType<LocationSearchForm> = z.object({
    city: z.string().min(1).max(100),
    to: z.string(),
    maxAdultsForNight: z.number().min(ADULTS_PER_NIGHT.MIN).max(ADULTS_PER_NIGHT.MAX).optional(),
    priceForNight: z.number().min(0).optional(),
    from: z.string()
}).refine((data) => new Date(data.from) < new Date(data.to), {
    message: "End date cannot be earlier than start date.",
    path: ["to"],
});

const passwordPattern = z
    .string()
    .min(8, {message: "At least 8 chars long"})
    .regex(/[0-9]/, { message: 'Contain at least one number' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter' })
    .trim();

export const SignupSchema: ZodType<AddUserForm> = z.object({
    email: z.string().email(),
    name: z.string().min(1).max(20),
    surname: z.string().min(1).max(20),
    profile: z.string().min(1).max(20),
    password: passwordPattern,
    confirmPassword: passwordPattern
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must be equals",
    path: ["confirmPassword"]
});

export const EditAccountSchema: ZodType<EditUserForm> = z.object({
    name: z.string().min(1).max(20),
    surname: z.string().min(1).max(20),
});

export const UpdatePasswordSchema: ZodType<EditUserPasswordForm> = z.object({
    password: passwordPattern,
    newPassword: passwordPattern,
    repeatNewPassword: passwordPattern
}).refine(data => data.newPassword === data.repeatNewPassword, {
    message: "Passwords must be equals",
    path: ["repeatNewPassword"]
});

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});
