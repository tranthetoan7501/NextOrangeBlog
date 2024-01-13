import AppHeader from "@/components/common/AppHeader";
import Editor, { FinalPost } from "@/components/editor";
import { generateFormData } from "@/utils/helper";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreatePost() {
  const [creating, setCreating] = useState(false);
  const router = useRouter();
  const handleSubmit = async (post: FinalPost) => {
    setCreating(true);
    try {
      // we have to generate FormData
      const formData = generateFormData(post);

      // submit our post
      const { data } = await axios.post("/api/posts", formData);
      if (data.isSuccess) {
        toast("Create successfully!", {
          className: "dark:bg-gray-800 dark:text-white",
        });
      } else {
        toast("Update fail!");
      }
      //router.push("/admin/posts/update/" + data.post.slug);
    } catch (error: any) {
      console.log(error.response.data);
    }
    setCreating(false);
  };
  return (
    <div className='sm:px-36'>
      <AppHeader title='New Post' />
      <Editor onSubmit={handleSubmit} busy={creating} />
    </div>
  );
}
