import {z, ZodType} from "zod";
import {AddLocationForm} from "@/types/location";
import {ADULTS_PER_NIGHT} from "@/utils/constants";

export const NewLocationSchema: ZodType<AddLocationForm> = z.object({
    title: z.string().min(1).max(50),
    description: z.string().min(1).max(1000),
    lat: z.number(),
    lng: z.number(),
    maxAdultsForNight: z.number().min(1).max(20),
    published: z.boolean()
});

export const SearchLocationSchema = z.object({
    city: z.string().min(1).max(100),
    to: z.string(),
    maxAdultsForNight: z.number().min(ADULTS_PER_NIGHT.MIN).max(ADULTS_PER_NIGHT.MAX),
    from: z.string()
}).refine((data) => new Date(data.from) < new Date(data.to), {
    message: "End date cannot be earlier than start date.",
    path: ["to"],
})
