import PostForm from "../ui/post/create-form";
import EditPostForm from "../ui/post/edit-form";
import { PostData } from "@/common/interface";

export default function Page() {
    const dummy_data: PostData = {
        name: "dummy name",
        description: "dummy description",
        tags: ['Fan Art', 'Chibi'],
        price: 2500,
        samples: [

        ]
    };

    return (
        <>
            <div>Hello World!</div>
            <PostForm />
        </>
    );
}
