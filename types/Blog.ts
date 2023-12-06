import { PortableTextBlock } from "sanity";

// declare variables from blog type
export type Blog = {
  _id: string;
  _createAt: Date;
  title: string;
  author: { name: string; image: string; slug: string; bio: string };
  categories: { title: string; description: string };
  publichedAt: string;
  description: string;
  slug: string;
  image: string;
  content: PortableTextBlock[];
};
