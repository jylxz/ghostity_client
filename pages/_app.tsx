/* eslint-disable react/jsx-props-no-spreading */

// Libraries
import Head from "next/head";
import { useState, useEffect, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { ReactQueryDevtools } from "react-query/devtools";
import { AnimatePresence, MotionConfig } from "framer-motion";
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
import { auth, db } from "../firebase/ghostityFirebase";
// import { auth, db } from "../firebase/ghostityDevFirebase";

// Hooks
import useSystemColor from "../hooks/useSystemColor";
import useAdminCheck from "../hooks/useAdminCheck";

// Components
import Navbar from "../components/Navbar/Navbar";
import SideBarMain from "../components/SideBar/SideBarMain";
import AuthMain from "../components/Auth/AuthMain";
import PageProgress from "../components/general/PageProgress";
import BlacklistModal from "../components/general/BlacklistModal";
import HamburgerNavMenu from "../components/general/HamburgerNavMenu";
import AuthVerifyEmail from "../components/Auth/AuthVerifyEmail";
import AuthUpdateEmail from "../components/Auth/AuthUpdateEmail";
import AuthPasswordResetMessage from "../components/Auth/AuthPasswordResetMessage";

// Contexts
import UserContext from "../context/UserContext";
import UserFollowContext from "../context/UserFollowContext";
import AdminContext from "../context/AdminContext";
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
      fontFamily: ['"Quicksand"', ...defaultTheme!.fontFamily!.sans].join(","),
    },
    palette: {
      primary: {
        main: "#c3d1e0",
      },
    },
  });

  // React-Query
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 180000,
        refetchInterval: 300000,
      },
    },
  });

  // Firebase User Authentication
  const [user] = useAuthState(auth);

  // Firestore
  const [follows] = useDocument(user ? doc(db, "follow", user.uid) : null);
  const followsData = useMemo(
    () => ({
      follows,
      channels: follows?.data()?.channel_ids,
    }),
    [follows]
  );

  // Admin check
  const [admin] = useAdminCheck(user?.uid);

  // Blacklisting channels
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const [blacklistChannel, setBlacklistChannel] = useState<Stream | null>(null);
  const blacklistContextValue = useMemo(
    () => ({ setShowBlacklistModal, setBlacklistChannel }),
    []
  );

  // Etc.
  const router = useRouter();
  const { query } = router;
  const [systemColor] = useSystemColor();

  // For Navbar and Login
  const [showAuth, setShowAuth] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  useEffect(() => {
    if (showAuth || showHamburgerMenu) {
      document.body.style.overflowY = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
    } else {
      document.body.style.overflowY = "scroll"
      document.body.style.position = "unset";
    }
  }, [showAuth, showHamburgerMenu])

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
            {/* <MotionConfig reducedMotion="always"> */}
            <UserContext.Provider value={user || null}>
              <UserFollowContext.Provider value={followsData || null}>
                <AdminContext.Provider value={admin}>
                  <PageProgress />
                  {router.route === "/" && query.mode === "verifyEmail" ? (
                    <AuthVerifyEmail />
                  ) : null}
                  {router.route === "/" &&
                  query.mode === "verifyAndChangeEmail" ? (
                    <AuthUpdateEmail />
                  ) : null}
                  {query.resetPassword === "true" ? <AuthPasswordResetMessage /> : null}
                  <Navbar
                    showAuth={showAuth}
                    setShowAuth={setShowAuth}
                    setShowHamburgerMenu={setShowHamburgerMenu}
                  />
                  <AnimatePresence exitBeforeEnter>
                    {showAuth ? (
                      <AuthMain showAuth={showAuth} setShowAuth={setShowAuth} />
                    ) : null}
                    {showHamburgerMenu ? (
                      <HamburgerNavMenu
                        setShowHamburgerMenu={setShowHamburgerMenu}
                        setShowAuth={setShowAuth}
                      />
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
                    <main className={showAuth ? "overflow-hidden": ""}>
                      {router.route.includes("browse") ||
                      router.route.includes("search") ? (
                        <div className="flex">
                          <SideBarMain />
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
            {/* </MotionConfig> */}
          </ThemeProvider>
        </StyledEngineProvider>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </>
  );
}
