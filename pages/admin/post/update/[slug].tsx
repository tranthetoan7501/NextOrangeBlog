import AppHeader from "@/components/common/AppHeader";
import Editor, { FinalPost } from "@/components/editor";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { generateFormData } from "@/utils/helper";
import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import { toast } from "react-toastify";

interface PostResponse extends FinalPost {
  id: string;
}
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export default function Update({ post }: Props) {
  const [updating, setUpdating] = useState(false);
  const handleSubmit = async (post: FinalPost) => {
    setUpdating(true);
    try {
      // we have to generate FormData
      const formData = generateFormData(post);
      // submit our post
      await connection?.disconnect();
      const { data } = await axios.patch("/api/posts/" + post.id, formData);

      if (data.isSuccess) {
        toast("Update successfully!");
      } else {
        toast("Update fail!");
      }
    } catch (error: any) {}
    setUpdating(false);
  };
  return (
    <div className='sm:px-36 h-full'>
      <AppHeader title='Update Post' />
      <Editor
        onSubmit={handleSubmit}
        initialValue={post}
        busy={updating}
        btnTitle='Update'
      />
    </div>
  );
}
let connection = null as any;
interface ServerSideResponse {
  post: PostResponse;
}
export const getServerSideProps: GetServerSideProps<
  ServerSideResponse
> = async (context) => {
  try {
    const slug = context.query.slug as string;
    console.log(slug);
    connection = await dbConnect();
    const post = await Post.findOne({ slug });
    if (!post) return { notFound: true };

    const { _id, meta, title, content, thumbnail, tags } = post;

    return {
      props: {
        post: {
          id: _id.toString(),
          title,
          content,
          tags: tags.join(", "),
          thumbnail: thumbnail?.url || "",
          slug,
          meta,
        },
      },
    };
  } catch (error) {
    return { notFound: true };
  } finally {
    //
  }
};
