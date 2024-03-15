"use client";
import {
  getBlogs,
  getFilterAIBlogs,
  getFilterMetaverseBlogs,
  getFilterBlockchainBlogs,
  getFilterMarketBlogs,
  getFilteredBlogs,
} from "@/sanity/sanity-utils";
import FeaturedSidebar from "./components/FeaturedSidebar";
import CategoryTab from "./components/CategoryTab";
import TrendingBlogs from "./components/TrendingBlogs";
import { useEffect, useState, createContext, useContext } from "react";
import React from "react";
import { Blog } from "@/types/Blog";
import { ThemeProvider } from "next-themes";
import SelectedCategorySingleton from "./components/globalSelectedCategory";
import Link from "next/link";

export default function Home() {

  // NEW CODE

  const cardData = [
    {
      title: "Lorem Ipsum 1",
      content: "Lorem ipsum. Repellendus quidem officiis, nihil animi dicta hic accusamus ipsa, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, placeat aspernatur minus magnam unde nobis cum suscipit modi repudiandae iusto non labore autem enim quod debitis deleniti est eos nulla!",
      author: "Author 1"
    },
    {
      title: "Lorem Ipsum 2",
      content: "Lorem ipsum. Repellendus quidem officiis, nihil animi dicta hic accusamus ipsa, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, placeat aspernatur minus magnam unde nobis cum suscipit modi repudiandae iusto non labore autem enim quod debitis deleniti est eos nulla!",
      author: "Author 2"
    },
    {
      title: "Lorem Ipsum 3",
      content: "Lorem ipsum. Repellendus quidem officiis, nihil animi dicta hic accusamus ipsa, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, placeat aspernatur minus magnam unde nobis cum suscipit modi repudiandae iusto non labore autem enim quod debitis deleniti est eos nulla!",
      author: "Author 3"
    }
  ];

  const Card = ({ title, content, author }: { title: string; content: string; author: string; }) => {
    return (
      <div className="flex gap-6 h-full">
        <div className="bg-gray-300 w-[35%] h-full rounded-xl md:rounded-none"></div>
        <div className="flex flex-col w-[65%]">
          <h1 className="text-2xl text-normal mb-2">{title}</h1>
          <p className="text-xs mb-3">{content}</p>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <div className="p-3 rounded-full bg-gray-300"></div>
              <p className="text-xs ml-3">{author}</p>
            </div>
            <div className="grid md:grid-cols-2 md:gap-x-2 items-center">
              <div className="hidden md:block p-2.5 rounded-3xl bg-gray-300 w-16"></div>
              <div className="hidden md:block p-2.5 rounded-3xl bg-gray-300 w-16"></div>
              <p className="block md:hidden text-xs ml-3">Date</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // OLD CODE
  //get props and paths the blog and map the data to the page

  // const [selectedCategoryTitle, setSelectedCategoryTitle] = useState(
  //   SelectedCategorySingleton.getSelectedCategory()
  // );
  // const [blogs, setBlogs] = useState<Blog[]>([]);

  // const updateSelectedCategory = (newValue: string) => {
  //   if (selectedCategoryTitle === newValue) {
  //     setSelectedCategoryTitle("");
  //     SelectedCategorySingleton.setSelectedCategory("");
  //   } else {
  //     setSelectedCategoryTitle(newValue);
  //     SelectedCategorySingleton.setSelectedCategory(newValue);
  //   }
  // };

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       if (selectedCategoryTitle === "") {
  //         var blogVal = await getBlogs();
  //         setBlogs(blogVal);
  //       } else if (selectedCategoryTitle === "AI/ML") {
  //         var blogVal = await getFilterAIBlogs();
  //         setBlogs(blogVal);
  //       } else if (selectedCategoryTitle === "Blockchain") {
  //         var blogVal = await getFilterBlockchainBlogs();
  //         setBlogs(blogVal);
  //       } else if (selectedCategoryTitle === "Mateverse") {
  //         var blogVal = await getFilterBlockchainBlogs();
  //         setBlogs(blogVal);
  //       } else if (selectedCategoryTitle === "Market") {
  //         var blogVal = await getFilterMarketBlogs();
  //         setBlogs(blogVal);
  //       } else {
  //         var blogVal = await getFilterMetaverseBlogs();
  //         setBlogs(blogVal);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching blogs:", error);
  //     }
  //   };

  //   fetchBlogs();
  // }, [selectedCategoryTitle]);

  return (
    <>
      <div>
        <div className="mt-24 md:mt-20 my-6 md:mx-14">
          <h2 className="font-medium text-5xl text-center text-gray-800 dark:text-blue-50 md:mb-9">
            LBA - Blog
          </h2>

          <div className="grid grid-rows-2 md:grid-cols-5 md:grid-rows-none gap-y-24 md:gap-x-24 p-8 md:p-0">
            <div className="md:col-span-3">
              <div className="flex flex-col">
                <div className="w-full h-80 bg-gray-300 mb-8 rounded-xl md:rounded-none"></div>

                <h1 className="text-4xl font-normal mb-5">Lorem Ipsum</h1>

                <p className="mb-8">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus quidem officiis, nihil animi dicta hic accusamus ipsa, tempora et reprehenderit omnis numquam sunt cupiditate mollitia! Autem praesentium tenetur quo soluta? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, placeat aspernatur minus magnam unde nobis cum suscipit modi repudiandae iusto non labore autem enim quod debitis deleniti est eos nulla!</p>
              
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center">
                    <div className="p-5 rounded-full bg-gray-300"></div>
                    <p className="ml-4 text-sm w-fit">Author</p>
                    <p className="ml-5 md:ml-16 text-sm">Date</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 md:gap-x-7 items-center">
                    <div className="p-3 md:p-5 rounded-3xl bg-gray-300 w-16 md:w-32"></div>
                    <div className="p-3 md:p-5 rounded-3xl bg-gray-300 w-16 md:w-32"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <div className="grid grid-rows-3 gap-12">
                {cardData.map((data, index) => (
                  <Card key={index} title={data.title} content={data.content} author={data.author} />
                ))}
              </div>
            </div>
          </div>

          {/* blog box section
          <div className="flex w-full justify-center items-center mb-20">
            <div className="col container max-w-full">
              display info from each blog
              <TrendingBlogs
                inputBlogs={blogs}
                postsPerPage={3}
                selectedCategoryTitle={selectedCategoryTitle}
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
