export const config = {
    app: {
      name: import.meta.env.VITE_APP_NAME,
      version: import.meta.env.VITE_APP_VERSION,
    },
    api: {
      baseUrl: import.meta.env.VITE_API_BASE_URL,
      timeout: Number(import.meta.env.VITE_API_TIMEOUT),
    },
    layout: {
      breakpoints: {
        mobile: Number(import.meta.env.VITE_MOBILE_BREAKPOINT),
        tablet: Number(import.meta.env.VITE_TABLET_BREAKPOINT),
        desktop: Number(import.meta.env.VITE_DESKTOP_BREAKPOINT),
      },
    },
    housingList: {
      initialLoadedCount: Number(import.meta.env.VITE_INITIAL_LOADED_COUNT),
      nextCardsToLoad: Number(import.meta.env.VITE_NEXT_CARDS_TO_LOAD),
      cardsPerPage: {
        desktop: Number(import.meta.env.VITE_CARDS_PER_PAGE_DESKTOP),
        tablet: Number(import.meta.env.VITE_CARDS_PER_PAGE_TABLET),
      },
    },
    animation: {
      pageTransitionDuration: Number(import.meta.env.VITE_PAGE_TRANSITION_DURATION),
      autoScrollInterval: Number(import.meta.env.VITE_AUTO_SCROLL_INTERVAL),
    },
  }