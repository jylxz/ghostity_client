/* eslint-disable react/jsx-props-no-spreading */

// Libraries
import Head from "next/head";
import { useState, useEffect, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { ReactQueryDevtools } from "react-query/devtools";
import { AnimatePresence, motion } from "framer-motion";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";

// Tailwind & CSS
import "../styles/globals.css";
import defaultTheme from "tailwindcss/defaultTheme";

// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { auth, db } from "../firebase/clientApp";

// Hooks
import useSystemColor from "../hooks/useSystemColor";
import useWindowDimensions from "../hooks/useWindowDimensions";

// Components
import Navbar from "../components/general/Navbar";
import SearchBar from "../components/general/SearchBar";
import BrowseSideBar from "../components/Browse/BrowseSideBar";
import AuthMain from "../components/Auth/AuthMain";
import PageProgress from "../components/general/PageProgress"

// Contexts
import UserContext from "../context/UserContext";
import UserFollowContext from "../context/UserFollowContext";

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  // MUI Theme
  const theme = createTheme({
    typography: {
      fontFamily: ['"Quicksand"', ...defaultTheme.fontFamily.sans].join(","),
    },
    palette: {
      primary: {
        main: "#c3d1e0",
      },
    },
  });

  // React-Query
  const queryClient = new QueryClient();

  // Firebase User Authentication
  const [user] = useAuthState(auth());

  // Firestore
  const [follows] = useDocument(user ? doc(db(), "follow", user.uid) : null);
  const followsData = useMemo(
    () => ({
      follows,
      channels: follows?.data()?.channel_ids,
    }),
    [follows]
  );

  // Responsive BrowseBar
  const [showBrowseBar, setShowBrowseBar] = useState({
    user: true,
    show: true,
  });
  const size = useWindowDimensions();

  useEffect(() => {
    if (size.width) {
      if (size.width < 640) {
        setShowBrowseBar({ ...showBrowseBar, show: false });
      }

      if (size.width > 640 && showBrowseBar.user) {
        setShowBrowseBar({ ...showBrowseBar, show: true });
      }
    }
  }, [size]);

  // Etc.
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);
  const [systemColor] = useSystemColor();

  return (
    <>
      <Head>
        {systemColor === "light" ? (
          <>
            <link
              rel="icon"
              href="/images/Ghostity-svg.svg"
              sizes="any"
              type="image/svg+xml"
              color="#000000"
            />
            <link
              rel="apple-touch-icon"
              href="/images/Ghostity-svg.svg"
              sizes="any"
              type="image/svg+xml"
            />
            <link
              rel="mask-icon"
              href="/images/Ghostity-svg.svg"
              sizes="any"
              type="image/svg+xml"
              color="#000000"
            />
          </>
        ) : (
          <>
            <link
              rel="icon"
              href="/images/Ghostity-svg-white.svg"
              sizes="any"
              type="image/svg+xml"
              color="#ffffff"
            />
            <link
              rel="apple-touch-icon"
              href="/images/Ghostity-svg-white.svg"
              sizes="any"
              type="image/svg+xml"
            />
            <link
              rel="mask-icon"
              href="/images/Ghostity-svg-white.svg"
              sizes="any"
              type="image/svg+xml"
              color="#ffffff"
            />
          </>
        )}
      </Head>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <UserContext.Provider value={user || null}>
              <UserFollowContext.Provider value={followsData || null}>
                <PageProgress/>
                <Navbar showAuth={showAuth} setShowAuth={setShowAuth} />
                <AnimatePresence exitBeforeEnter>
                  {showAuth ? (
                    <AuthMain showAuth={showAuth} setShowAuth={setShowAuth} />
                  ) : null}
                </AnimatePresence>
                <main>
                  <AnimatePresence exitBeforeEnter>
                    <Component {...pageProps} />
                  </AnimatePresence>
                </main>
              </UserFollowContext.Provider>
            </UserContext.Provider>
          </ThemeProvider>
        </StyledEngineProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
