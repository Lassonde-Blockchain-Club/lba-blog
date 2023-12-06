"use client";
import React, { FC, useEffect, useState } from "react";
import TextEditor from "@/components/TextEditor";


function MyForm() {
  const [file, setFile] = useState<File>();
  const [imageSrc, setImageSrc] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    author: "",
    category: "",
    date: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    // Update the slug when the title changes
    if (name === 'title') {
      const slug = generateSlug(value);
      setFormData({ ...formData, [name]: value, slug });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const categories = [
    'Blockchain',
    'AI/ML',
    'Metaverse',
    'Market',
    'Programming',
  ];

  const generateSlug = (title: any) => {
    return title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-') // Replace non-alphanumeric characters with '-'
      .replace(/-{2,}/g, '-') // Replace consecutive '-' with a single '-'
      .trim(); // Trim leading and trailing spaces
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    console.log("Title:", formData.title);
    console.log("Slug:", formData.slug);
    console.log("Description:", formData.description);
    console.log("Author:", formData.author);
    console.log("Category:", formData.category);
    console.log("Date:", formData.date);
    console.log("Image:", file);
  };
  const handleImageChange = (value: File) => {
    setFile(value);
  };

  const [fileReader, setFileReader] = useState<FileReader>();

  useEffect(() => {
    // Instantiate the FileReader on the client side after DOM is hydrated
    if (!fileReader && typeof window !== "undefined") {
      setFileReader(new FileReader());
    }
  }, [fileReader]);

  if (fileReader) {
    fileReader.onload = (event: any) => {
//   useEffect(() => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
      if (event.target) {
        if (typeof event.target.result === "string") {
          setImageSrc(event.target.result);
        }
      }
    };
    fileReader.abort()
    if (file) fileReader.readAsDataURL(file);
  }

  const wordCount = (text: any) => {
    const words = text.trim().split(/\s+/);
    return words.length;
  };

  const isTitleValid = wordCount(formData.title) <= 25;
  const isDescriptionValid = wordCount(formData.description) <= 100;
//     if (file) reader.readAsDataURL(file);
//  }, [file]); 
  // const reader = new FileReader();
  // reader.onload = (event) => {
  //   if (event.target) {
  //     if (typeof event.target.result === "string") {
  //       setImageSrc(event.target.result);
  //     }
  //   }
  // };
  // if (file) reader.readAsDataURL(file);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-28 flex align-items justify-center mb-28 w-2/3 flex-col mx-auto">
        <div className="mx-auto text-4xl">Post a Blog</div>
        {/* <div className="mt-4">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="border w-full rounded-xl py-2 text-white leading-tight bg-slate-800 focus:outline-none focus:shadow-outline"
          />
        </div> */}
        <div className="flex flex-row justify-between">
            <div className="mt-4 flex-grow">
            {/* <label htmlFor="date" className="mb-2">
              Date:
            </label> */}
            {/* <div className="flex-1"> */}
              <input
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}                
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                placeholder="Date"
                className="border w-full rounded-xl pl-[7px] py-2 text-white-700 leading-tight bg-slate-800 focus:outline-none focus:shadow-outline"
              />
            {/* </div> */}
          </div>
         <div className="mt-4 flex-grow ml-2">
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="border w-full rounded-xl pl-[7px] py-2 text-white-700 leading-tight bg-slate-800 focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled style={{ color: "white" }}>
              Category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category} style={{ color: "black" }}>
                {category}
              </option>
            ))}
          </select>
        </div>
        </div>

        <div>
          
        <div className="mt-4">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            className={`border w-full rounded-xl pl-[7px] py-2 text-white-700 leading-tight ${
              isTitleValid ? "bg-slate-800" : "bg-red-200"
            } focus:outline-none focus:shadow-outline`}
//             className="border w-full rounded-xl py-2 text-white leading-tight bg-transparent focus:outline-none focus:shadow-outline" -->
          />
          <p className="text-sm text-gray-500">
            {wordCount(formData.title)} / 25 words
          </p>
        </div>
        <div className="mt-4 mb-4 ">
          <input
            type="text"
            id="slug"
            name="slug"
            placeholder="Slug"
            value={formData.slug}
            readOnly
            className="border w-full rounded-xl pl-[7px] py-2 text-white-700 leading-tight bg-slate-800 focus:outline-none focus:shadow-outline"
//<!--             onChange={handleInputChange}
    //        className="border w-full rounded-xl py-2 text-white leading-tight bg-transparent focus:outline-none focus:shadow-outline" 
          />
        </div>
        {/* <label className={`block mt-3 text-sm font-medium text-white `}>
            Image
          </label> */}
          <FileDragDrop image={file} setimage={handleImageChange} />
        <div className="mt-4">
          <div>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className={`border w-full rounded-xl pl-[7px] py-2 text-white-700 leading-tight ${
                isDescriptionValid ? 'bg-slate-800' : 'bg-black-700'
              } focus:outline-none focus:shadow-outline`}
//<!--               className="border  w-full rounded-xl py-2 text-white leading-tight bg-transparent focus:outline-none focus:shadow-outline" 
            />
                     
          </div>
          <p className="m-0 text-sm text-gray-500">
          {wordCount(formData.description)} / 100 words
          </p>

        </div>

          <div className="mt-6">
          <TextEditor></TextEditor>
        </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>

      </div>
    </form>
  );
}

// This is seperate code for Adding Images
interface FileDragDrop {
  image?: File;
  setimage: (value: File) => void;
}

const FileDragDrop: React.FC<FileDragDrop> = ({ image, setimage }) => {
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [isDragging, setIsDragging] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [fileReader, setFileReader] = useState<FileReader>();

  useEffect(() => {
    // Instantiate the FileReader on the client side after DOM is hydrated
    if (!fileReader && typeof window !== "undefined") {
      setFileReader(new FileReader());
    }
  }, [fileReader]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      e.relatedTarget === undefined ||
      e.currentTarget.contains(e.relatedTarget as Node)
    ) {
      return;
    }

    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const newFile = e.dataTransfer.files[0];
    const fileExtension = newFile.name.split(".").pop()?.toLowerCase();

    if (/^image\//.test(newFile.type)) {
      setUploadedFile(newFile);
      setimage(newFile);
    } else {
      alert("Invalid file format. Only image files are accepted.");
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: Event) => {
      const newFile = (e.target as HTMLInputElement).files?.[0];
      if (newFile && /^image\//.test(newFile.type)) {
        setUploadedFile(newFile);
        setimage(newFile);
        if (fileReader) {
          fileReader.onload = (event: any) => {
            if (event.target) {
              if (typeof event.target.result === "string") {
                setImageSrc(event.target.result);
              }
            }
          };
          fileReader.readAsDataURL(newFile);
        }
      } else {
        alert("Invalid file format. Only image files are accepted.");
      }
    };
    input.click();
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={` sm:text-lg bg-slate-800 text-base rounded-xl cursor-pointer w-auto min-h-[10rem] flex items-center justify-center flex-col flex-nowrap text-white border-2 border-white border-opacity-[0.35] rounded-xl-lg `}
    >
      {uploadedFile && (
        <div>You can drop another image to replace the older one</div>
      )}
      {imageSrc && (
        <img src={imageSrc} alt="Selected Image" height={400} width={400} />
      )}
      {uploadedFile ? (
        <div> {`${uploadedFile.name}`} </div>
      ) : (
        "Click or drag and drop your image here"
      )}
    </div>
  );
};

export default MyForm;
