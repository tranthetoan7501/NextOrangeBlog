// pages/sitemap.xml.js

import dbConnect from "@/lib/dbConnect";
import { formatPosts } from "@/lib/utils";
import Post from "@/models/Post";
import { PostDetail } from "@/utils/type";

const EXTERNAL_DATA_URL = "https://www.heytellme.com";

function generateSiteMap(posts: PostDetail[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://www.heytellme.com</loc>
     </url>
     <url>
       <loc>https://www.heytellme.com/countdown</loc>
     </url>
     ${posts
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${slug}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

export async function getServerSideProps({ res }: { res: any }) {
  await dbConnect();
  const posts = await Post.find()
    .sort({ createdAt: "desc" })
    .select("-content");
  // format posts
  const formattedPosts = formatPosts(posts);
  const sitemap = generateSiteMap(formattedPosts);

  res.setHeader("Content-Type", "text/xml");
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
