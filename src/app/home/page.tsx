import PostForm from "../ui/post/create-form";
import PostWidget from "../ui/post/edit-form";
import { PostData } from "@/common/interface";

export default function Page() {
    let dummy_data: PostData = {
        name: "dummy name",
        description: "dummy description",
        tags: ['Realistic'],
        price: "10000",
        samples: []
    };

    return (
        <>
            <div>Hello World!</div>
            <PostForm />
            <PostWidget post={dummy_data} />
        </>
    );
}
