import { Metadata } from "next";
import Link from "next/link";

import RegisterForm from "@/app/(auth)/components/register-form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Register | BK Sharing",
  description: "Register a new account",
};

const Register = () => {
  return (
    <section className="mt-10 w-full">
      <Tabs defaultValue="register">
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
      <RegisterForm />
    </section>
  );
};
export default Register;
