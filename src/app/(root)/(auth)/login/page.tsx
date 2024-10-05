import * as motion from "framer-motion/client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import LoginForm from "@/app/(root)/(auth)/components/login-form";
import AnimationWrapper from "@/components/animation-wrapper";

export const metadata: Metadata = {
  title: "Login | BK Sharing",
  description: "Login to your account",
};

const Login = () => {
  return (
    <motion.section
      className="w-1/2 min-w-[360px] rounded-xl bg-white p-10 shadow-2xl max-xl:w-full max-sm:mx-5 max-sm:px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0 }}
    >
      <AnimationWrapper
        animationProps={{
          transition: {
            delay: 0,
          },
        }}
      >
        <div className="flex-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="BK Sharing Logo"
              width={100}
              height={100}
              priority
              className="rounded-full outline outline-2 outline-primary"
            />
          </Link>
        </div>

        <div className="mt-10 w-full">
          <LoginForm />
        </div>
      </AnimationWrapper>
    </motion.section>
  );
};
export default Login;
