import { z } from "zod";

export const createPostSchema = z.object({
    content: z.string().max(50,"Too long")
})

export const updatePostSchema = z.object({
    content: z.string().max(50,"Too long").nullable().nullish(),
    likeFlag: z.boolean().default(false),
})