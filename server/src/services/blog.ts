import { publicProcedure } from "../trpc"
import { z } from "zod"
import { BlogSchema } from "../schema/blog.schema"
import { createBlog, getBlogById, getBlogs } from "../lib/data"
import { TRPCError } from "@trpc/server"

/*
TODO: assign type for all of this functions
*/

// export function getAllBlogs(): any {
//     publicProcedure.query(() => {
//         return getBlogs()
//     })
// }

// export function getById(): any {
//     publicProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
//         const post = getBlogById(input.id)
//         if (!post) throw new TRPCError({ code: "NOT_FOUND" })
//         return post
//     })
// }

// export function createBlog(): any {
//     publicProcedure.input(BlogSchema).mutation(async (opts) => {
//         const createBlogProcess = await createBlog(opts.input)
//         if (!createBlogProcess)
//             throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
//         return
//     })
// }
