import { z } from "zod";

export const priceSchema = z.object({
    amount: z.number().min(0),
    currency: z.enum(["USD"]),
})