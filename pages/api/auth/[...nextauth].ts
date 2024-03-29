import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubAuthProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { handleUserOAuth } from "@/lib/utils";

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRETS } = process.env;
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
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session }) {
      await dbConnect();
      const user = await User.findOne({ email: session.user?.email });
      if (user)
        session.user = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        } as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    error: "/404",
  },
};

export default NextAuth(authOptions);
