// Jun 3 - By Samson
import React from "react";
import {
  getCategories,
  getFilterAIBlogs,
  getFilterBlockchainBlogs,
} from "@/sanity/sanity-utils";
import Link from "next/link";

type Props = {
  updateSelectedCategory: (newValue: string) => void;
};

const handleButtonClick = (
  updateSelectedCategory: (newValue: string) => void,
  newValue: string
) => {
  updateSelectedCategory(newValue);
};

async function CategoryTab({ updateSelectedCategory }: Props) {
  const categories = await getCategories();
  const categoryList = await getFilterAIBlogs();

  return (
    <div className=" mt-5">
      <div className="flex flex-row ">
        <>
          {/* display info from each blog */}
          {categories.map((category) => (
            /*<Link
              href={`/categories/${category.title}`}
              key={category._id}
              //   className="border-2 border-gray-500 rounded-lg p-1 "
            >
              <div className="mr-3 rounded-lg bg-gray-100 text-md font-medium text-center text-gray-500 dark:text-gray-400">
                <div className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">
                  {category.title}
                </div>
              </div>*/
            //</Link>
            <div className="mr-3 rounded-lg bg-gray-100 text-md font-medium text-center text-gray-500 dark:text-gray-400">
              <button
                className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                key={category.title}
                onClick={() => {
                  handleButtonClick(updateSelectedCategory, category.title);
                }}
              >
                {category.title}
              </button>
            </div>
          ))}
        </>
      </div>
    </div>
  );
}

export default CategoryTab;
