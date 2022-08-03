export const cardVariant = {
  initial: {
    opacity: 0,
  },
  animate: (i: number) => ({
    opacity: 1,
    transition: i ? { delay: i * 0.2, delayChildren: 1 } : { delayChildren: 1 },
  }),
};

export const hoverVariant = {
  hover: {
    scale: 1.15,
  },
};

export const titleVariant = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

export const ghostVariant = {
  initial: { translateX: -400, opacity: 0 },
  animate: { translateX: 0, opacity: 1 },
};

export const ghostVariant2 = {
  initial: { translateX: 200, opacity: 0 },
  animate: { translateX: 0, opacity: 1 },
};

export const gamesVariant = {
  initial: { translateY: -200, rotate: 0, opacity: 0 },
  animate: { translateY: 0, rotate: 360, opacity: 1 },
};

export const organizationVariant = {
  initial: { scale: 2.5, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", bounce: 0.5 },
  },
};
