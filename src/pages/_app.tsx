"use client";
import { AppProps } from "next/app";
import "../app/globals.css";
import Layout from "@/components/Layout";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
