import "../styles/globals.css";
import Header from "../components/Header";
import Head from "next/head";
import React from "react";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
          integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="node_modules/react-quill/dist/quill.bubble.css"
        ></link>
        <meta property="og:title" content="Arsh Blogs" key="title" />
        <meta charset="utf-8" />
      </Head>
      <Header />
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
