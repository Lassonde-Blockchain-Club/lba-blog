import {db} from "./db"
import BlogSchema from "../Schema/Blog"
import {z} from "zod"


// getting all the available blogs in the databse 
export async function getBlog(){
    return db.blog.findMany()
}

export async function getBlogById(id:string) {
    return db.blog.findUnique({
        where:{
            id,
        },
    })
}

export async function getBlogByAuthorId(authorId: string) {
    return db.blog.findMany({
        where : {
            authorId,
        },
    })
}