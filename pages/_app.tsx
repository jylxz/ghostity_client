import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import "../styles/globals.css";
import defaultTheme from "tailwindcss/defaultTheme";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import Navbar from "../components/general/Navbar";
import SearchBar from "../components/general/SearchBar";
import BrowseSideBar from "../components/Browse/BrowseSideBar";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { auth, db } from "../firebase/clientApp";
import AuthMain from "../components/Auth/AuthMain";

import UserContext from "../context/UserContext";
import UserFollowContext from "../context/UserFollowContext";

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

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const router = useRouter();
  const [showBrowseBar, setShowBrowseBar] = useState({
    user: true,
    show: true,
  });
  const size = useWindowDimensions();
  const [showAuth, setShowAuth] = useState(false);
  const [user] = useAuthState(auth());
  const [follows] = useDocument(user ? doc(db(), "follow", user.uid) : null);

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

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <UserContext.Provider value={user || null}>
            <UserFollowContext.Provider value={follows}>
              <Navbar showAuth={showAuth} setShowAuth={setShowAuth} />
              {showAuth ? (
                <AuthMain showAuth={showAuth} setShowAuth={setShowAuth} />
              ) : null}
              {router.route.includes("browse") ? (
                <main className="flex">
                  <BrowseSideBar
                    show={showBrowseBar}
                    setShow={setShowBrowseBar}
                  />
                  <div className="flex-1">
                    <SearchBar
                      showBrowseBar={showBrowseBar}
                      setShowBrowseBar={setShowBrowseBar}
                    />
                    <Component {...pageProps} />
                  </div>
                </main>
              ) : (
                <Component {...pageProps} />
              )}
            </UserFollowContext.Provider>
          </UserContext.Provider>
        </ThemeProvider>
      </StyledEngineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
