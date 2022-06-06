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
        opacity: 0
      }
    },
    streams: {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        
      },
      exit: {
        opacity: 0
      }
    },
    browseContainer: {
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.1
        }
      }
    },
    browseItems: {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      }
    }
  },
};

export default browseAnimations;
