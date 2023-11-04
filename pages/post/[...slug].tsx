import { NextPage } from "next";
import { useRouter } from "next/router";

interface Props {}

const OurCoolPage: NextPage<Props> = () => {
  const router = useRouter();
  console.log(router.query);
  return <div>OurCoolPage</div>;
};

export default OurCoolPage;
