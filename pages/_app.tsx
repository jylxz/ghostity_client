/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "@fontsource/quicksand/300.css";
import "@fontsource/quicksand/400.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/600.css";
import "@fontsource/quicksand/700.css";

// Libraries
import { AppProps } from "next/app";
import { useState, useEffect, useMemo, ReactElement, ReactNode } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import type { NextPage } from "next";

// Tailwind & CSS
import "styles/globals.css";

// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { auth, db } from "services/Firebase";

// Hooks
import {
  useAdminCheck,
  useScrollRestoration,
  useThemeColor,
  useResponsiveBrowseBar,
} from "hooks";

// Components
import Navbar from "components/Navbar/Navbar";
import PageProgress from "@general/PageProgress";
import BlacklistModal from "@general/BlacklistModal";
import HamburgerNavMenu from "components/Navbar/HamburgerNavMenu";
import AuthModalMain from "components/Auth/AuthModalMain";
import AuthVerifyEmail from "components/Auth/AuthVerifyEmail";
import AuthUpdateEmail from "components/Auth/AuthUpdateEmail";
import AuthPasswordResetMessage from "components/Auth/AuthPasswordResetMessage";
import LiveFollowingBar from "components/Navbar/LiveFollowingBar";
import Favicons from "components/Head/Favicons";
import NoticeBar from "@general/NoticeBar";

// Contexts
import {
  UserContext,
  UserFollowContext,
  AdminContext,
  BlacklistContext,
  ThemeContext,
  SidebarContext,
  ChannelPreviewContext,
} from "contexts";
import { PreviewChannel } from "components/Preview";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Layout
  const getLayout = Component.getLayout ?? ((page) => page);

  // MUI Theme
  const [theme, overrideSystem] = useThemeColor();

  const MUITheme = useMemo(
    () =>
      createTheme({
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
          fontWeightRegular: 500,
        },
        palette: {
          mode: theme === "dark" ? "dark" : "light",
          primary: {
            main: "#c3d1e0",
          },
        },
      }),
    [theme]
  );

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

  // For Sidebar
  const [
    showBrowseBar,
    setShowBrowseBar,
    userPreference,
    browseBarOverride,
    minimized,
  ] = useResponsiveBrowseBar();

  const sideBarContextValue = useMemo(
    () => ({
      showBrowseBar,
      setShowBrowseBar,
      userPreference,
      browseBarOverride,
      minimized,
    }),
    [
      browseBarOverride,
      minimized,
      setShowBrowseBar,
      showBrowseBar,
      userPreference,
    ]
  );

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

  // Channel details modal
  const [showPreview, setShowPreview] = useState(false);
  const [previewChannelId, setPreviewChannelId] = useState("");

  const channelPreviewContextValue = useMemo(
    () => ({
      showPreview,
      setShowPreview,
      previewChannelId,
      setPreviewChannelId,
    }),
    [showPreview, setShowPreview, previewChannelId, setPreviewChannelId]
  );

  return (
    <>
      <Favicons />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={MUITheme}>
              <UserContext.Provider value={user || null}>
                <ThemeContext.Provider value={theme}>
                  <UserFollowContext.Provider value={followsData || null}>
                    <AdminContext.Provider value={admin}>
                      <AuthVerifyEmail />
                      <AuthUpdateEmail />
                      <AuthPasswordResetMessage />
                      <div className="sticky sm:relative top-0 z-50 w-full">
                        <NoticeBar />
                        <PageProgress />
                        <Navbar
                          showAuth={showAuth}
                          setShowAuth={setShowAuth}
                          setShowHamburgerMenu={setShowHamburgerMenu}
                          theme={theme}
                          overrideSystem={overrideSystem}
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
                      <PreviewChannel
                        channelId={previewChannelId}
                        showPreview={showPreview}
                        setShowPreview={setShowPreview}
                      />
                      <BlacklistContext.Provider value={blacklistContextValue}>
                        <SidebarContext.Provider value={sideBarContextValue}>
                          <ChannelPreviewContext.Provider
                            value={channelPreviewContextValue}
                          >
                            <main className={showAuth ? "overflow-hidden" : ""}>
                              {getLayout(<Component {...pageProps} />)}
                            </main>
                          </ChannelPreviewContext.Provider>
                        </SidebarContext.Provider>
                      </BlacklistContext.Provider>
                    </AdminContext.Provider>
                  </UserFollowContext.Provider>
                </ThemeContext.Provider>
              </UserContext.Provider>
            </ThemeProvider>
          </StyledEngineProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
