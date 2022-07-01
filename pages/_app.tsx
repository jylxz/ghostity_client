/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "@fontsource/quicksand/300.css"
import "@fontsource/quicksand/400.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/600.css";
import "@fontsource/quicksand/700.css"

// Libraries
import { AppProps } from "next/app";
import { useState, useEffect, useMemo } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";

// Tailwind & CSS
import "../styles/globals.css";

// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { auth, db } from "../firebase/ghostityFirebase";
// import { auth, db } from "../firebase/ghostityDevFirebase";

// Hooks
import useAdminCheck from "../hooks/useAdminCheck";
import useScrollRestoration from "../hooks/useScrollRestoration";

// Components
import Navbar from "../components/Navbar/Navbar";
import SideBarMain from "../components/SideBar/SideBarMain";
import PageProgress from "../components/general/PageProgress";
import BlacklistModal from "../components/general/BlacklistModal";
import HamburgerNavMenu from "../components/Navbar/HamburgerNavMenu";
import AuthModalMain from "../components/Auth/AuthModalMain";
import AuthVerifyEmail from "../components/Auth/AuthVerifyEmail";
import AuthUpdateEmail from "../components/Auth/AuthUpdateEmail";
import AuthPasswordResetMessage from "../components/Auth/AuthPasswordResetMessage";

// Contexts
import UserContext from "../context/UserContext";
import UserFollowContext from "../context/UserFollowContext";
import AdminContext from "../context/AdminContext";
import BlacklistContext from "../context/BlacklistContext";
import LiveFollowingBar from "../components/Navbar/LiveFollowingBar";
import Favicons from "../components/Head/Favicons";

export default function MyApp({ Component, pageProps }: AppProps) {
  // MUI Theme
  const theme = createTheme({
    typography: {
      fontFamily: [
        '"Quicksand"',
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      fontWeightRegular: 500
    },
    palette: {
      primary: {
        main: "#c3d1e0",
      },
    },
  });

  // React-Query
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 180000,
          refetchInterval: 300000,
        },
      },
    })
  );

  // Firebase User Authentication
  const [user] = useAuthState(auth);

  // Firestore
  const [follows] = useDocument(user ? doc(db, "follow", user.uid) : null);
  const followsData = useMemo(
    () => ({
      follows,
      channels: follows?.data()?.channel_ids as string[],
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
  useScrollRestoration(router, ["#browse-games-wrapper", "window"]);

  // For Navbar and Login
  const [showAuth, setShowAuth] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  useEffect(() => {
    if (showAuth || showHamburgerMenu) {
      document.getElementsByTagName("main")[0].style.touchAction = "none";
      document.body.style.touchAction = "none";
      document.body.style.overflow = "hidden";
    } else {
      document.getElementsByTagName("main")[0].style.touchAction = "auto";
      document.body.style.touchAction = "auto";
      document.body.style.overflow = "hidden auto";
    }
  }, [showAuth, showHamburgerMenu]);

  return (
    <>
      <Favicons />

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <UserContext.Provider value={user || null}>
                <UserFollowContext.Provider value={followsData || null}>
                  <AdminContext.Provider value={admin}>
                    <AuthVerifyEmail />
                    <AuthUpdateEmail />
                    <AuthPasswordResetMessage />
                    <div className="sticky sm:relative top-0 z-50 w-full">
                      <PageProgress />
                      <Navbar
                        showAuth={showAuth}
                        setShowAuth={setShowAuth}
                        setShowHamburgerMenu={setShowHamburgerMenu}
                      />
                      <LiveFollowingBar />
                    </div>
                    <AuthModalMain
                      showAuth={showAuth}
                      setShowAuth={setShowAuth}
                    />
                    <HamburgerNavMenu
                      showHamburgerMenu={showHamburgerMenu}
                      setShowHamburgerMenu={setShowHamburgerMenu}
                      setShowAuth={setShowAuth}
                    />
                    <BlacklistModal
                      channel={blacklistChannel}
                      setBlacklistChannel={setBlacklistChannel}
                      showBlacklistModal={showBlacklistModal}
                      setShowBlacklistModal={setShowBlacklistModal}
                    />
                    <BlacklistContext.Provider value={blacklistContextValue}>
                      <main className={showAuth ? "overflow-hidden" : ""}>
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
            </ThemeProvider>
          </StyledEngineProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
