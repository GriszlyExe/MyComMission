import axios, { AxiosRequestConfig } from "axios"
import { serverAddr } from ".";

export const updatePostImages = async (postId: string, images: FormData) => {
    try {
        const options: AxiosRequestConfig = {
            method: "PATCH",
            url: `${serverAddr}/post/upload/${postId}`,
            withCredentials: true,
            data: images,
        }

        const { data: { urls } } = await axios.request(options);

        const preSignedUrls: any = {};

        urls.map((url: string, idx: number) => {
            if (url.includes(`post-image-1`)) {
                preSignedUrls.picUrl1 = url;
            }
            if (url.includes(`post-image-2`)) {
                preSignedUrls.picUrl2 = url;
            }
            if (url.includes(`post-image-3`)) {
                preSignedUrls.picUrl3 = url;
            }
            if (url.includes(`post-image-4`)) {
                preSignedUrls.picUrl4 = url;
            }
        })

        return preSignedUrls;

    } catch (err) {
        throw err;
    }
}

export const createPost = async ({ data }: { data: any }) => {
    try {

        const { samples, images, ...others } = data;

        /* JSON part */
        const options = {
            method: "POST",
            url: `${serverAddr}/post/create`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: others,
        }

        console.log(others);
        const { data: { post } } = await axios.request(options);

        /* image part */
        const sentImages = new FormData();

        samples.map((img: any, idx: number) => {
            sentImages.append(`picUrl${idx + 1}`, img.file);
        })

        const urls = await updatePostImages(post.postId, sentImages);

        return {
            ...post,
            ...urls,
        }

    } catch (err) {
        throw err;

    }
}

export const getPostByUserId = async (userId: string) => {

    try {
        
        const options = {
            method: "GET",
            url: `${serverAddr}/post/from/${userId}`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }

        const { data: { posts } } = await axios.request(options);

        return posts;

    } catch (err) {
        throw err;
    }
}