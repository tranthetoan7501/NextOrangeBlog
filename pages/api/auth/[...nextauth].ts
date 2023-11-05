import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubAuthProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { handleUserOAuth } from "@/lib/utils";
import { use } from "react";
const authOptions: NextAuthOptions = {
  providers: [
    GitHubAuthProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRETS as string,
      async profile(profile) {
        return handleUserOAuth(profile);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRETS as string,
      async profile(profile) {
        await dbConnect();
        const oldUser = await User.findOne({ email: profile.email });
        const userProfile = {
          email: profile.email,
          name: profile.name || profile.login,
          avatar: profile.picture,
          role: "user",
        };

        if (!oldUser) {
          const newUser = new User({
            ...userProfile,
            provider: "google",
          });

          await newUser.save();
        } else {
          userProfile.role = oldUser.role;
        }
        return { id: profile.sub, ...userProfile };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRETS as string,
      profile(profile) {
        return handleUserOAuth(profile);
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
