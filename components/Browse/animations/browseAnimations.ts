const browseAnimations = {
  sidebar: {
    streamsContainer: {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
      exit: {
        opacity: 0,
      },
    },
    streams: {
      initial: {
        // translateX: 100,
        opacity: 0,
      },
      animate: {
        opacity: 1,
        // translateX: 0,
      },
      exit: {
        opacity: 0,
      },
    },
    browseContainer: {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    browseItems: {
      initial: {
        translateX: 100,
        opacity: 0,
      },
      animate: {
        translateX: 0,
        opacity: 1,
      },
    },
    gradientBar: {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
      },
    },
  },
};

const browseStreamsAnimations = {
  stateChanges: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delayChildren: 2
      }
    },
    exit: {
      opacity: 0,
    },
  },
  streams: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1
      }
    },
  },
};

export default browseAnimations;
export {browseStreamsAnimations}
