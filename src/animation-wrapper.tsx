"use client";

import { AnimatePresence, AnimationProps, motion } from "framer-motion";

import { defaultAnimationProps } from "@/constants/motion";

interface IProps {
  children: React.ReactNode;
  animationProps?: AnimationProps;
}

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
