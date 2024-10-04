import * as motion from "framer-motion/client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import MentorRegisterForm from "@/app/(auth)/components/mentor-register-form";
import StudentRegisterForm from "@/app/(auth)/components/student-register-form";
import AnimationWrapper from "@/components/animation-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parentVariants } from "@/constants/motion";

export const metadata: Metadata = {
  title: "Register | BK Sharing",
  description: "Register a new account",
};

const Register = () => {
  return (
    <motion.section
      className="w-1/2 min-w-[360px] rounded-xl bg-white p-10 shadow-2xl max-xl:w-full max-sm:mx-5 max-sm:px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0 }}
      variants={parentVariants}
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

        <AnimationWrapper
          animationProps={{
            transition: {
              delay: 0.1,
            },
          }}
        >
          <div className="mt-10 w-full">
            <Tabs defaultValue="student">
              <div className="flex-center">
                <TabsList>
                  <TabsTrigger value="student" className="w-fit">
                    Student
                  </TabsTrigger>
                  <TabsTrigger value="mentor" className="w-fit">
                    Mentor
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="mt-5">
                <TabsContent value="student">
                  <StudentRegisterForm />
                </TabsContent>

                <TabsContent value="mentor">
                  <MentorRegisterForm />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </AnimationWrapper>
      </AnimationWrapper>
    </motion.section>
  );
};
export default Register;
