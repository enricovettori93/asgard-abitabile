import {z, ZodType} from "zod";
import {AddLocationForm} from "@/types/location";

export const NewLocationSchema: ZodType<AddLocationForm> = z.object({
    title: z.string().min(1).max(50),
    description: z.string().min(1).max(1000),
    lat: z.number(),
    lng: z.number(),
    published: z.boolean()
});

export const SearchLocationSchema = z.object({
    city: z.string().min(1).max(100),
    to: z.date(),
    from: z.date()
});
