import { create } from "domain";
import { FinalPost } from "../components/editor";
import { PostDetail } from "./type";

export const generateFormData = (post: FinalPost) => {
  const formData = new FormData();
  for (let key in post) {
    const value = (post as any)[key];
    if (key === "tags" && value.trim()) {
      const tags = value.split(",").map((tag: string) => tag.trim());
      console.log("tags", JSON.stringify(tags));
      formData.append("tags", JSON.stringify(tags));
    } else formData.append(key, value);
  }
  return formData;
};

export const filterPosts = (posts: PostDetail[], postToFilter: PostDetail) => {
  return posts.filter((post) => {
    return post.id !== postToFilter.id;
  });
};
const oneMinute = 60 * 1000;
const oneHour = 60 * oneMinute;
const oneDay = 24 * 60 * 60 * 1000;
const oneWeek = 7 * oneDay;
const oneMonth = 30 * oneDay;
const oneYear = 365 * oneDay;
export const commentTime = (createAt: string) => {
  const firstDate: any = new Date();
  const secondDate: any = new Date(createAt);
  const cal = firstDate - secondDate;
  if (cal < oneMinute) {
    return "Vừa xong";
  } else if (cal < oneHour) {
    return `${Math.floor(cal / oneMinute)} phút`;
  } else if (cal < oneDay) {
    return `${Math.floor(cal / oneHour)} giờ`;
  } else if (cal < oneWeek) {
    return `${Math.floor(cal / oneDay)} ngày`;
  } else if (cal < oneMonth) {
    return `${Math.floor(cal / oneWeek)} tuần`;
  } else if (cal < oneYear) {
    return `${Math.floor(cal / oneMonth)} tháng`;
  } else {
    return `${Math.floor(cal / oneYear)} năm`;
  }
};
