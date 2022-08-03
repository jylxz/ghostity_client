export const containerVariant = {
  animate: {
    transition: { staggerChildren: 0.3, delayChildren: 1.5 },
  },
};

export const textVariant = {
  initial: { translateY: 200, opacity: 0 },
  animate: {
    translateY: 0,
    opacity: 1,
  },
};

export const ghostVariant = {
  initial: { translateX: 200, opacity: 0 },
  animate: {
    translateX: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

export const ghostityVariant = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

export const buttonVariant = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};
