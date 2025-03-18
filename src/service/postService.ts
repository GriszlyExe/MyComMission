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

        const { images, ...others } = data;

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

        // console.log(images);

        images.map((img: any, idx: number) => {
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

        const { data: { posts, artist } } = await axios.request(options);

        return {
            posts: posts ? posts : [],
            artist,
        };

    } catch (err) {
        throw err;
    }
}

export const updatePostInfoById = async (postId: string, payload: any) => {

    try {

        // console.log(`Update post service called...`);
        // console.log(payload);

        /* json */
        let { images, ...others } = payload;

        /* images */
        const sentImages = new FormData();
        let ids = [1, 2, 3, 4];

        let oldImages: any = {};

        images.map(({ file, preview }: { file: File, preview: string }) => {
            // console.log(preview);
            if (!file) {
                const i = preview.indexOf(`post-image`)
                const id = Number(preview[i + 11]);
                ids = ids.filter(idx => idx !== id);
                if (preview.includes(`post-image-1`)) {
                    oldImages.picUrl1 = preview;
                }
                if (preview.includes(`post-image-2`)) {
                    oldImages.picUrl2 = preview;
                }
                if (preview.includes(`post-image-3`)) {
                    oldImages.picUrl3 = preview;
                }
                if (preview.includes(`post-image-4`)) {
                    oldImages.picUrl4 = preview;
                }

            }
        })

        ids = ids.sort();

        images.map(({ file, preview }: { file: File, preview: string }) => {
            if (file) {
                const key = `picUrl${ids.shift()}`;
                sentImages.append(key, file);
                others[key] = null;
                console.log(ids);
            }
        })
        // console.log(others);
        ids.map((num) => { others[`picUrl${num}`] = null; })
        // console.log(others);

        // console.log(oldImages);

        const options = {
            method: "PATCH",
            url: `${serverAddr}/post/${postId}`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: others,
        }

        // console.log(options.data);

        const { data: { post } } = await axios.request(options);
        let preSignedUrls: any = {};

        if (Array.from(sentImages.keys()).length > 0) {
            preSignedUrls = await updatePostImages(postId, sentImages);
        }

        return {
            ...post,
            ...oldImages,
            ...preSignedUrls,
        }

    } catch (err) {
        console.error(err);
    }

}

export const hidePost = async (postId: string, state: boolean) => {

    try {

        const options = {
            method: "PATCH",
            url: `${serverAddr}/post/${postId}`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            data: {
                isHide: state,
            },
        }

        // console.log(options.data);

        const { data: { post } } = await axios.request(options);

        return post;

    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getRandomPosts = async () => {

    try {

        const options = {
            method: "GET",
            url: `${serverAddr}/post/random/feed`,
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }

        const { data: { posts }} = await axios.request(options);

        return posts;

    } catch (err) {
        throw err;
    }

}