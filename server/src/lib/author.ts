import BlogSchema from "../Schema/Blog";
import {Blog} from "@prisma/client";
import { z } from "zod";
import {db} from "../Lib/db";
import { error } from "console";



// @TODO 📝 Fetch blogs by specific author id
const getBlogByAuthorId = async (authorId: string): Promise<Blog[] | null> => {
    return db.blog.findMany({
        where: {
            authorId: authorId,
        },
    });
}

// @TODO 💻 Retrieve all blogs from database
const getAllBlogs = async (): Promise<Blog[] | null> => {
    return db.blog.findMany();
}

// @TODO 📋 Fetch blogs belonging to a specific category
const getBlogByCategory = async (category: any): Promise<Blog[]> => {
    return db.blog.findMany({
        where: {
            category: category,
        },
    });
}

const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
    return db.blog.findUnique({
        where: { slug: slug },
    });
}
const getBlogById = async(id: string) => {
    return db.author.findUnique({
        where: {id, }
    });
}
// mutations
export async function createBlog(data: z.infer<typeof BlogSchema>) {
    const validatedBlog = BlogSchema.safeParse(data)
    if (!validatedBlog.success) throw new Error("Invalid blog data")

    //Change this to current user id by session
    const currentUser = {
        id: "7d7b47a3-e8b4-40e5-ab95-9a5fddc369c6",
    } 

    const { title, category, description, content, imageUrl, slug } =
        validatedBlog.data

    const existingBlogbySlug = await getBlogBySlug(slug)
    if (existingBlogbySlug)
        return {
            error: "Existing Slug",
        }

    await db.blog
        .create({
            data: {
                title,
                category,
                description,
                content,
                imageUrl,
                slug,
                author: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
            select: {
                id: true,
            },
        })
        .catch((error) => {
            console.log("CREATE BLOG ERROR")
            return { error: "Something went wrong" }
        })

    return { success: "Blog created successfully" }

}
// export async function updateBlog(data: z.infer<typeof BlogSchema>) {
//     const validatedBlog = BlogSchema.safeParse(data)
//     if (!validatedBlog.success) throw new Error("Invalid blog data")

//     //Change this to current user id by session
//     const currentUser = {
//         id: "7d7b47a3-e8b4-40e5-ab95-9a5fddc369c6",
//     } 

//     const { title, category, description, content, imageUrl, slug } =
//         validatedBlog.data

//     const existingBlogbySlug = await getBlogById(id)
//     if (!existingBlogbySlug)
//         return {error: "No blogs for this id exist"}

//     await db.blog
//     .update({
//         where:{
//             id,
//         },
//             data: {
//                 title,
//                 category,
//                 description,
//                 content,
//                 imageUrl,
//                 slug,
//                 author: {
//                     connect: {
//                         id: currentUser.id,
//                     },
//                 },
//             },
//         })
//         .catch((error) => {
//             console.log("CREATE BLOG ERROR")
//             return { error: "Something went wrong" }
//         })

//     return { success: "Blog created successfully" }

// }

export async function deleteBlog(id:string) {
    const existingBlogbySlug = await getBlogById(id)
    if(!existingBlogbySlug) return { error : "No blogs with this id"}
    await db.blog.delete({
        where : {
            id,
        },
    })
    .catch( (error) => {
        console.log("Delete BLOG error")
        return {error : "something went wrong"}
    })
    return {success : "Blog Deleted successfully"}
    
}

export {
    getBlogBySlug,
    getBlogByAuthorId,
    getAllBlogs,
    getBlogByCategory,
};
