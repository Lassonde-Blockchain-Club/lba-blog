'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getBlog } from "@/sanity/sanity-utils";

type Props = {
    params: { project: string };
};

// define getColor function for avergae background color
function getColor(imageElem: any, ratio: number) {
    const canvas = document.createElement('canvas');

    let width = canvas.width = imageElem.naturalWidth;
    let height = canvas.height = imageElem.naturalHeight;

    const context = canvas.getContext('2d');
    context!.drawImage(imageElem, 0, 0);

    let data, length;
    let i = -4;
    let count = 0;

    try {
        data = context!.getImageData(0, 0, width, height);
        length = data.data.length;
    } catch (err) {
        console.log(err);
        return {
            R: 0,
            G: 0,
            B: 0
        }
    }

    let R, G, B;
    R = G = B = 0;

    while ((i += ratio * 4) < length) {
        ++count;
        R += data.data[i];
        G += data.data[i + 1];
        B += data.data[i + 2];
    }

    R = ~~(R / count);
    G = ~~(G / count);
    B = ~~(B / count);

    return {
        R,
        G,
        B
    }
}

export default async function ImageBackground({ params }: Props) {

    // const [imageUrl, setImageUrl] = useState('');
    // const [color, setColor] = useState({ R: 0, G: 0, B: 0 });

    // useEffect(() => {
    //     async function fetchImage() {
    //         const blog = await getBlog(params.project);
    //         setImageUrl(blog.image);
    //     }
    //     fetchImage();
    // }, [params.project]);

    const slug = params.project;
    const blog = await getBlog(slug);

    

    // useEffect(() => {
    //     if (imageUrl) {
    //         const image = document.querySelector('.blogImage') as HTMLImageElement;
    //         image.onload = function () {
    //             const color = getColor(image, 10);
    //             setColor(color);
    //             document.body.style.backgroundColor = `rgb(${color.R}, ${color.G}, ${color.G})`;
    //         }
    //     }
    // }, [imageUrl]);

    return (
        <>
            {/* image section */}
            <div className="flex items-center justify-center h-screen/2 ">
                {/* {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt=""
                        width={800}
                        height={600}
                        className="blogImage"
                    />
                )} */}
                <Image
                    src={blog.image}
                    alt={blog.title}
                    width={800}
                    height={600}
                    className="blogImage"
                />
            </div>
        </>
    )
}