import { Metadata } from "next";
import Link from "next/link";

import LoginForm from "@/app/(auth)/components/login-form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Login | BK Sharing",
  description: "Login to your account",
};

const Login = () => {
  return (
    <section className="mt-10 w-full">
      <Tabs defaultValue="login">
        <div className="flex-center">
          <TabsList>
            <Link href="/login">
              <TabsTrigger value="login" className="w-fit">
                Login
              </TabsTrigger>
            </Link>
            <Link href="/register">
              <TabsTrigger value="register" className="w-fit">
                Register
              </TabsTrigger>
            </Link>
          </TabsList>
        </div>
      </Tabs>
      <LoginForm />
    </section>
  );
};
export default Login;
