/* eslint-disable react/jsx-props-no-spreading */

// Libraries
import Head from "next/head";
import { useState, useEffect, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { ReactQueryDevtools } from "react-query/devtools";
import { AnimatePresence } from "framer-motion";
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
import useAdminCheck from "../hooks/useAdminCheck"

// Components
import Navbar from "../components/general/Navbar";
import SideBarMain from "../components/Browse/SideBar/SideBarMain";
import AuthMain from "../components/Auth/AuthMain";
import PageProgress from "../components/general/PageProgress";

// Contexts
import UserContext from "../context/UserContext";
import UserFollowContext from "../context/UserFollowContext";
import AdminContext from "../context/AdminContext";
import BlacklistModal from "../components/general/BlacklistModal";
import BlacklistContext from "../context/BlacklistContext";

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

  // Admin check
  const [admin] = useAdminCheck(user?.uid)

  // Blacklisting channels
  const [showBlacklistModal, setShowBlacklistModal] = useState(false)
  const [blacklistChannel, setBlacklistChannel] = useState<Stream | null>(null);
  const blacklistContextValue = useMemo(() => ({setShowBlacklistModal, setBlacklistChannel}), [])

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
                <AdminContext.Provider value={admin}>
                  <PageProgress />
                  <Navbar showAuth={showAuth} setShowAuth={setShowAuth} />
                  <AnimatePresence exitBeforeEnter>
                    {showAuth ? (
                      <AuthMain showAuth={showAuth} setShowAuth={setShowAuth} />
                    ) : null}
                  {showBlacklistModal ? (
                    <BlacklistModal
                    channel={blacklistChannel}
                    setBlacklistChannel={setBlacklistChannel}
                    setShowBlacklistModal={setShowBlacklistModal}
                    />
                    ) : null}
                    </AnimatePresence>
                  <BlacklistContext.Provider value={blacklistContextValue}>
                    <main>
                      {router.route.includes("browse") ||
                      router.route.includes("search") ? (
                        <div className="flex">
                          <AnimatePresence exitBeforeEnter>
                            <SideBarMain />
                          </AnimatePresence>
                          <div className="flex-1">
                            <Component {...pageProps} />
                          </div>
                        </div>
                      ) : (
                        <Component {...pageProps} />
                      )}
                    </main>
                  </BlacklistContext.Provider>
                </AdminContext.Provider>
              </UserFollowContext.Provider>
            </UserContext.Provider>
          </ThemeProvider>
        </StyledEngineProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
