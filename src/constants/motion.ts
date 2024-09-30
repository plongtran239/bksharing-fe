import { AnimationProps } from "framer-motion";

const parentVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const defaultAnimationProps: AnimationProps = {
  initial: { opacity: 0, y: -15 },
  animate: { opacity: 1, y: 0, x: 0 },
  exit: { opacity: 0, y: -15 },
  transition: { delay: 0.2 },
};

export { parentVariants, childVariants, defaultAnimationProps };
