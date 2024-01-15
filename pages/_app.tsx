import { NavBar } from "@/components/common/NavBar";
import "@/styles/globals.css";
import { MySpeedDial } from "@/components/common/SpeedDial";
import type { AppProps } from "next/app";
import { Yrsa } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "@/components/common/Banner";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import("@/components/common/StarsCanvas"),
  {
    ssr: false,
  }
);

const roboto = Yrsa({
  weight: "400",
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <DynamicComponent />
      <main className={roboto.className + " dark:bg-black z-40 min-h-screen"}>
        <NavBar />
        {/* <Banner /> */}
        <div className='lg:px-20 py-3 lg:py-6 z-50'>
          <Component {...pageProps} />
        </div>
        <ToastContainer />
        <MySpeedDial />
      </main>
    </SessionProvider>
  );
}
