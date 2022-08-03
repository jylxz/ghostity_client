export const ghostVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

export const questionMarkVariant = {
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
};

export const questionHeadingVariant = {
  initial: {
    opacity: 0,
    translateX: 200,
  },
  animate: {
    opacity: 1,
    translateX: 0,
  },
};

export const containerVariant = {
  animate: {
    transition: { staggerChildren: 0.3, delayChildren: 1 },
  },
};

export const textVariant = {
  initial: {
    translateY: 100,
    opacity: 0,
  },
  animate: {
    translateY: 0,
    opacity: 1,
  },
};

export const buttonVariant = {
  hover: {
    scale: 1.05,
  },
  tap: {
    scale: 0.95,
  },
};
