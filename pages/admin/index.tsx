import LatestPostListCard from "@/components/admin/LatestPostListCard";
import AppHeader from "@/components/common/AppHeader";
import { LatestComment, LatestUserProfile, PostDetail } from "@/utils/type";
import { Card, List } from "@material-tailwind/react";
import {
  BsFillTrashFill,
  BsPencilSquare,
  BsArrow90DegRight,
} from "react-icons/bs";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Admin() {
  const [latestPosts, setLatestPosts] = useState<PostDetail[]>();
  const [latestComments, setLatestComments] = useState<LatestComment[]>();
  const [latestUsers, setLatestUsers] = useState<LatestUserProfile[]>();

  useEffect(() => {
    // fetching latest posts
    axios("/api/posts?limit=8&skip=0")
      .then(({ data }) => {
        setLatestPosts(data.posts);
      })
      .catch((err) => console.log(err));

    // fetching latest comments
    axios("/api/comment/latest")
      .then(({ data }) => {
        setLatestComments(data.comments);
      })
      .catch((err) => console.log(err));

    // fetching latest users
    axios("/api/user")
      .then(({ data }) => {
        setLatestUsers(data.users);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className='dark:text-white text-black flex  justify-between'>
      <Card className=' sm:w-3/2 shadow-xl bg-blue-400 dark:bg-transparent dark:border dark:border-purple-500'>
        <div className='h-14 flex justify-between'>
          <div className='mt-5 h-fit ml-4 bg-white dark:bg-transparent dark:border dark:border-purple-500 w-fit px-3 rounded-xl text-blue-900 dark:text-gray-200'>
            Bài viết mới nhất
          </div>
          <div className='mt-5 h-fit mr-4  w-fit px-3 text-blue-900 dark:text-blue-600 cursor-pointer'>
            <BsArrow90DegRight className='font-bold hover:text-yellow-200' />
          </div>
        </div>
        <List>
          {latestPosts?.map(({ id, title, meta, slug, thumbnail }) => {
            return (
              <LatestPostListCard
                key={id}
                title={title}
                meta={meta}
                slug={slug}
                thumbnail={thumbnail}
              />
            );
          })}
        </List>
      </Card>
      <Card className=' sm:w-2/5 shadow-xl bg-blue-400 dark:bg-transparent dark:border dark:border-purple-500'>
        <div className='h-14 flex justify-between'>
          <div className='mt-5 h-fit ml-4 bg-white dark:bg-transparent dark:border dark:border-purple-500 w-fit px-3 rounded-xl text-blue-900 dark:text-gray-200'>
            Bài viết mới nhất
          </div>
          <div className='mt-5 h-fit mr-4  w-fit px-3 text-blue-900 dark:text-blue-600 cursor-pointer'>
            <BsArrow90DegRight className='font-bold hover:text-yellow-200' />
          </div>
        </div>
        <List>
          {latestPosts?.map(({ id, title, meta, slug, thumbnail }) => {
            return (
              <LatestPostListCard
                key={id}
                title={title}
                meta={meta}
                slug={slug}
                thumbnail={thumbnail}
              />
            );
          })}
        </List>
      </Card>
    </div>
  );
}
