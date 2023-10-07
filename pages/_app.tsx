import { NavBar } from "@/components/common/NavBar";
import "@/styles/globals.css";
import { MySpeedDial } from "@/components/common/SpeedDial";
import type { AppProps } from "next/app";
import { Yrsa } from "next/font/google";

const roboto = Yrsa({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <NavBar />

      <div className='sm:px-32 lg:px-24 py-10 '>
        <Component {...pageProps} />
      </div>
      <MySpeedDial />
    </main>
  );
}
