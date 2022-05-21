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
import Navbar from "../components/general/Navbar";
import SearchBar from "../components/general/SearchBar";
import BrowseSideBar from "../components/Browse/BrowseSideBar";
import useWindowDimensions from "../hooks/useWindowDimensions";

const theme = createTheme({
  typography: {
    fontFamily: ['"Quicksand"', ...defaultTheme.fontFamily.sans].join(","),
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

  useEffect(() => {
    if (size.width < 640) {
      setShowBrowseBar({ ...showBrowseBar, show: false });
    }

    if (size.width > 640 && showBrowseBar.user) {
      setShowBrowseBar({ ...showBrowseBar, show: true });
    }
  }, [size]);

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Navbar />
          {router.route.includes("browse") ? (
            <main className="flex">
              <BrowseSideBar show={showBrowseBar} setShow={setShowBrowseBar} />
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
        </ThemeProvider>
      </StyledEngineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
