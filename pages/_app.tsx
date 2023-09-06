import { NavBar } from "@/components/NavBar";
import "@/styles/globals.css";
import { MySpeedDial } from "@/components/SpeedDial";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <NavBar />
      <div className='sm:px-32 lg:px-64 pt-10 '>
        <Component {...pageProps} />
      </div>
      <MySpeedDial />
    </main>
  );
}
