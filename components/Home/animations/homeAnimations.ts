const homeAnimations = {
  welcome: {
    containerVariant: {
      animate: {
        transition: { staggerChildren: 0.3, delayChildren: 1.5 },
      },
    },
    textVariant: {
      initial: { translateY: 200, opacity: 0 },
      animate: {
        translateY: 0,
        opacity: 1,
      },
    },
    ghostVariant: {
      initial: { translateX: 200, opacity: 0 },
      animate: {
        translateX: 0,
        opacity: 1,
        transition: {
          duration: 1,
        },
      },
    },
    ghostityVariant: {
      initial: {
        opacity: 1,
      },
      animate: {
        opacity: 0,
        transition: {
          duration: 4,
          repeat: Infinity,
          "repeatType": "mirror",
        },
      },
    },
    buttonVariant: {
      hover: { scale: 1.05 },
      tap: { scale: 0.95 },
    },
  },

  browse: {
    ghostVariant: {
      initial: { translateX: -400, opacity: 0 },
      animate: { translateX: 0, opacity: 1 },
    },
    ghostVariant2: {
      initial: { translateX: 200, opacity: 0 },
      animate: { translateX: 0, opacity: 1 },
    },
    gamesVariant: {
      initial: { translateY: -200, rotate: 0, opacity: 0 },
      animate: { translateY: 0, rotate: 360, opacity: 1 },
    },
    organizationVariant: {
      initial: { scale: 2.5, opacity: 0 },
      animate: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", bounce: 0.5 },
      },
    },
  },

  help: {
    
  },
};

export default homeAnimations;

export const homeStatsAnimations = {
  buttonContainer: {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  },
  buttons: {
    initial: {
      translateY: 70,
      opacity: 0
    },
    animate: {
      translateY: 0,
      opacity: 1
    },

  }
}

export const homeBrowseAnimations = {
  ghostVariant: {
    initial: { translateX: -400, opacity: 0 },
    animate: { translateX: 0, opacity: 1 },
  },
  ghostVariant2: {
    initial: { translateX: 200, opacity: 0 },
    animate: { translateX: 0, opacity: 1 },
  },
  gamesVariant: {
    initial: { translateY: -200, rotate: 0, opacity: 0 },
    animate: { translateY: 0, rotate: 360, opacity: 1 },
  },
  organizationVariant: {
    initial: { scale: 2.5, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", bounce: 0.5 },
    },
  },

  card: {
    cardVariant: {
      initial: {
        opacity: 0,
      },
      animate: (i: number) => ({
        opacity: 1,
        transition: i
          ? { delay: i * 0.2, delayChildren: 1 }
          : { delayChildren: 1 },
      }),
    },
    hoverVariant: {
      hover: {
        scale: 1.15,
      },
    },
    titleVariant: {
      initial: {
        y: 100,
        opacity: 0,
      },
      animate: {
        y: 0,
        opacity: 1,
      },
    },
  },
};

export const homeHelpAnimations = {
  ghostVariant: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  },
  questionMarkVariant: {
    initial: {
      opacity: 0,
      translateY: -100,
    },
    animate: {
      opacity: 1,
      translateY: 0,
      transition: {
        duration: 1,
      },
    },
  },
  questionHeadingVariant: {
    initial: {
      opacity: 0,
      translateX: 200,
    },
    animate: {
      opacity: 1,
      translateX: 0,
    },
  },
  containerVariant: {
    animate: {
      transition: { staggerChildren: 0.3, delayChildren: 1 },
    },
  },
  textVariant: {
    initial: {
      translateY: 100,
      opacity: 0,
    },
    animate: {
      translateY: 0,
      opacity: 1,
    },
  },
  buttonVariant: {
    hover: {
      scale: 1.05,
    },
    tap: {
      scale: 0.95,
    },
  },
};