import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import "../styles/globals.css"
import defaultTheme from "tailwindcss/defaultTheme";
import Navbar from "../components/general/Navbar";

const theme = createTheme({
  typography: {
    fontFamily: ['"Quicksand"', ...defaultTheme.fontFamily.sans].join(","),
  },
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Component {...pageProps} />
        </ThemeProvider>
      </StyledEngineProvider>
      <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default MyApp;
