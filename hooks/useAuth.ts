import { UserProfile } from "@/utils/type";
import { useSession } from "next-auth/react";

const useAuth = () => {
  const { data } = useSession();
  const user = data?.user;
  if (user) return user as UserProfile;
};

export default useAuth;
