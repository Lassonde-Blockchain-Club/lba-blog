import { publicProcedure, router } from "../trpc"
import {
    createBlog,
    deleteBlog,
    getBlogById,
    getBlogBySlug,
    getBlogs,
    getBlogsByAuthorId,
    updateBlog,
} from "../lib/data"
import { TRPCError } from "@trpc/server"
import z from "zod"
import { BlogSchema } from "../schema/blog.schema"

// export const blogRouter = router({
//     getAllBlogs: getAllBlogs(),
//     getBlogById: getById(),
//     createBlog: createBlog(),
// })

export const blogRouter = router({
    getBlogs: publicProcedure.query(() => {
        return getBlogs()
    }),
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input }) => {
            const blog = getBlogById(input.id)
            if (!blog) throw new TRPCError({ code: "NOT_FOUND" })
            return blog
        }),
    getBySlug: publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(({ input }) => {
            const blog = getBlogBySlug(input.slug)
            if (!blog) throw new TRPCError({ code: "NOT_FOUND" })
            return blog
        }),
    getAuthorBlogs: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async (opts) => {
            const blogs = getBlogsByAuthorId(opts.input.id)
            if (!blogs) throw new TRPCError({ code: "NOT_FOUND" })
            return blogs
        }),
    createBlog: publicProcedure.input(BlogSchema).mutation(async (opts) => {
        const createBlogProcess = await createBlog(opts.input)
        if (!createBlogProcess)
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong",
            })
        return createBlogProcess
    }),
    updateBlog: publicProcedure
        .input(
            z.object({
                id: z.string(),
                BlogSchema,
            }),
        )
        .mutation(async (opts) => {
            const updateBlogProcess = await updateBlog(
                opts.input.id,
                opts.input.BlogSchema,
            )
            if (!updateBlogProcess)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Something went wrong",
                })
            return updateBlogProcess
        }),
    deleteBlog: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async (opts) => {
            const detleteBlogProcess = await deleteBlog(opts.input.id)
            if (!detleteBlogProcess)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Something went wrong",
                })
            return detleteBlogProcess
        }),
})
