// pages/sitemap.xml.js

import dbConnect from "@/lib/dbConnect";
import { formatPosts } from "@/lib/utils";
import Post from "@/models/Post";
import { PostDetail } from "@/utils/type";
import moment from "moment";

const EXTERNAL_DATA_URL = "https://www.heytellme.com";

function generateSiteMap(posts: PostDetail[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://www.heytellme.com</loc>
       <lastmod>2023-09-16</lastmod>
       <changefreq>daily</changefreq>
       <proirity>0.9</proirity>
     </url>
     <url>
       <loc>https://www.heytellme.com/countdown</loc>
       <lastmod>2023-09-16</lastmod>
       <changefreq>daily</changefreq>
       <proirity>0.9</proirity>
     </url>
     ${posts
       .map(({ slug, createdAt }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${slug}`}</loc>
           <lastmod>${moment(createdAt).format("YYYY-MM-DD")}</lastmod>
           <changefreq>daily</changefreq>
           <proirity>0.8</proirity>
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
