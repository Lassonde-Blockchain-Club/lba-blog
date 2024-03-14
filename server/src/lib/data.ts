import {db} from "./db"
import BlogSchema from "../Schema/Blog"
import {z} from "zod"
import { PrismaClient, Category } from '@prisma/client';


// getting all the available blogs in the databse 
export async function getBlog(){
    return db.blog.findMany()
}

export async function getBlogByAuthorId(authorId: string) {
    return db.blog.findMany({
        where : {
            authorId,
        },
    })
}

// Create
async function createAuthor(firstName: string, lastName: string, email: string, password: string): Promise<Author> {
  return await prisma.author.create({
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
}

async function createBlog(title: string, category: Category, description: string, slug: string, content: string, imageUrl: string, authorId: string): Promise<Blog> {
  return await prisma.blog.create({
    data: {
      title,
      category,
      description,
      slug,
      content,
      imageUrl,
      authorId,
    },
  });
}

// Read
async function getAuthorById(id: string): Promise<Author | null> {
  return await prisma.author.findUnique({
    where: { id },
    include: { Blogs: true },
  });
}

async function getBlogById(id: string): Promise<Blog | null> {
  return await prisma.blog.findUnique({
    where: { id },
    include: { author: true },
  });
}

// Update
async function updateAuthor(id: string, data: Partial<Author>): Promise<Author | null> {
  return await prisma.author.update({
    where: { id },
    data,
  });
}

async function updateBlog(id: string, data: Partial<Blog>): Promise<Blog | null> {
  return await prisma.blog.update({
    where: { id },
    data,
  });
}

// Delete
async function deleteAuthor(id: string): Promise<Author | null> {
  return await prisma.author.delete({
    where: { id },
  });
}

async function deleteBlog(id: string): Promise<Blog | null> {
  return await prisma.blog.delete({
    where: { id },
  });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
