import { useEffect } from "react";
import Router, { NextRouter } from "next/router";

interface ScrollPositions {
  [key: string]: {
    x: number;
    y: number;
  };
}

export default function useScrollRestoration(
  router: NextRouter,
  elementSelectors: string[],
  restoreOnNew = false
) {
  // Save each scroll position to sessionStorage
  function saveScrollPos(url: string) {
    const scrollPositions: ScrollPositions = {};

    elementSelectors.forEach((element) => {
      if (element === "window") {
        scrollPositions[element] = {
          x: window.scrollX,
          y: window.scrollY,
        };
      } else {
        const selectedElement = document.querySelector(element);

        if (selectedElement) {
          scrollPositions[element] = {
            x: selectedElement.scrollLeft,
            y: selectedElement.scrollTop,
          };
        }
      }
    });

    sessionStorage.setItem(url, JSON.stringify(scrollPositions));
  }

  // Restore each scroll position from sessionStorage
  async function restoreScrollPos(url: string) {
    const getFromSession = sessionStorage.getItem(url);

    const scrollPositions = JSON.parse(getFromSession || "") as ScrollPositions;

    if (scrollPositions) {
      // Route is completed, but DOM hasn't finished loading????
      // ~~~ Current workaround ~~~
      await new Promise((resolve) => setTimeout(resolve, 500));

      elementSelectors.forEach((element) => {
        if (element === "window") {
          window.scrollTo({
            left: scrollPositions[element].x,
            top: scrollPositions[element].y,
            behavior: "smooth",
          });
        } else {
          const selectedElement = document.querySelector(element);

          selectedElement?.scrollTo({
            left: scrollPositions[element].x,
            top: scrollPositions[element].y,
            behavior: "smooth",
          });
        }
      });
    }
  }

  // Run when route changes
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      let shouldRestoreScroll = false;
      window.history.scrollRestoration = "manual";

      if (restoreOnNew) {
        restoreScrollPos(router.asPath).catch(() => {});
      }

      const onBeforeUnload = (event: BeforeUnloadEvent) => {
        saveScrollPos(router.asPath);
        delete event.returnValue;
      };

      const onRouteChangeStart = () => {
        saveScrollPos(router.asPath);
      };

      const onRouteChangeComplete = (url: string) => {
        if (shouldRestoreScroll) {
          shouldRestoreScroll = false;
          restoreScrollPos(url).catch(() => {});
        }
      };

      // Apply to router
      window.addEventListener("beforeunload", onBeforeUnload);
      Router.events.on("routeChangeStart", onRouteChangeStart);
      Router.events.on("routeChangeComplete", onRouteChangeComplete);
      Router.beforePopState(() => {
        shouldRestoreScroll = true;
        return true;
      });

      // Clean up
      return () => {
        window.removeEventListener("beforeunload", onBeforeUnload);
        Router.events.off("routeChangeStart", onRouteChangeStart);
        Router.events.off("routeChangeComplete", onRouteChangeComplete);
        Router.beforePopState(() => true);
      };
    }
  }, [router]);
}
