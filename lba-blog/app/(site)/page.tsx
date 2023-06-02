import { getBlogs } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import FeaturedSidebar from "./components/FeaturedSidebar";

export default async function Home() {
  //get props and paths the blog and map the data to the page
  const blogs = await getBlogs();

  return (
    <>
      <div>
        {/* header section */}
        {/* replace this section with header component  */}
        <div className="">
          <h1 className="text-7xl font-extrabold">
            Hello this is{" "}
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
              Lassonde Blockchain
            </span>
          </h1>

          <p className="mt-3 text-xl text-gray-600">
            Weclome everyone! Check out our blogs!
          </p>
        </div>

        <h2 className="my-10 font-bold text-gray-700 text-8xl">Trending Now</h2>

        {/* blog box section*/}
        <div className="mt-5 grid grid-cols-4">
          <div className="col-span-3">
            {/* display info from each blog */}
            {blogs.map((blog) => (
              <Link
                href={`/projects/${blog.slug}`}
                key={blog._id}
                // className="border-2 border-gray-500 rounded-lg p-1 "
              >
                <div className="flex items-center my-5">
                  <div className=" group cursor-pointer overflow-hidden p-5 ">
                    {blog.image && (
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        width={200}
                        height={200}
                        // className="object-cover rounded-lg border border-gray-500"
                        className=" flex h-60 w-60 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                      />
                    )}
                  </div>
                  <div className="flex flex-col px-4">
                    <p className=" text-sm tracking-wider uppercase">
                      Categories: {blog.categories.toString()}
                    </p>
                    <p className="mt-8">
                      {moment(blog.publichedAt).format("MMM D")}
                    </p>
                    <p className="text-5xl font-extrabold">{blog.title}</p>
                    {/* {blog.author && (
                      <Image
                        src={blog.author.image}
                        alt={blog.author.name}
                        className="mx-2 h-12 w-12 counded-full"
                      />
                    )} */}
                    <p className="mt-1 text-sm uppercase font-extrabold">
                      {blog.description}
                    </p>
                    <span className="uppercase font-extralight">
                      By {blog.author.name}{" "}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <FeaturedSidebar />
        </div>
      </div>
    </>
  );
}
