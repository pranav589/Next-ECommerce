import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../config/theme.js";
import createEmotionCache from "../config/createEmotionCache.js";
import Layout from "../../components/Layout.js";
import { DataProvider } from "../../store/GlobalState.js";

const clientSideEmotionCache = createEmotionCache();

import "@/styles/globals.css";

export default function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DataProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DataProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
