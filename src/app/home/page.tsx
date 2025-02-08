"use client"

import { useAppDispatch, useAppSelector } from "@/states/hook";
import PostForm from "../ui/post/create-form";
import EditPostForm from "../ui/post/edit-form";
import { PostData } from "@/common/interface";
import { getUserInfo } from "@/service/userService";
import { setUser } from "@/states/features/userSlice";
import { useEffect } from "react";

export default function Page() {

    const userId = useAppSelector(state => state.user.user!.userId);
    const dispatch = useAppDispatch();

    const fetchUserInfo = async () => {
        const user = await getUserInfo(userId);
        dispatch(setUser({ user }));
    }

    useEffect(() => {

        fetchUserInfo();

    }, []);

	const dummy_data: PostData = {
		name: "dummy name",
		description: "dummy description",
		tags: ["Fan Art", "Chibi"],
		price: 2500,
		samples: [],
	};

	return (
		<>
			<div>Hello World!</div>
			<PostForm />
			<EditPostForm post={dummy_data} />
		</>
	);
}
