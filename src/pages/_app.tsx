import Layout from "@/components/common/Layout";
import "@/styles/globals.css";
import { deleteCookie } from "cookies-next";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  deleteCookie("uaerRole");
  deleteCookie("accessToken");
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}
