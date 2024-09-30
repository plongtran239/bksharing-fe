"use client";

import { AnimatePresence, AnimationProps, motion } from "framer-motion";

interface IProps {
  children: React.ReactNode;
  animationProps?: AnimationProps;
  visible?: boolean;
}

export const defaultAnimationProps: AnimationProps = {
  initial: { opacity: 0, y: -15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
  transition: { delay: 0.2 },
};

const AnimationWrapper = ({
  children,
  animationProps = defaultAnimationProps,
}: IProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={animationProps?.initial || defaultAnimationProps.initial}
        animate={animationProps?.animate || defaultAnimationProps.animate}
        exit={animationProps?.exit || defaultAnimationProps.exit}
        transition={
          animationProps?.transition || defaultAnimationProps.transition
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationWrapper;
