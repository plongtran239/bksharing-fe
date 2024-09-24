import { Metadata } from "next";

import LoginForm from "@/app/(auth)/components/login-form";

export const metadata: Metadata = {
  title: "Login | BK Sharing",
  description: "Login to your account",
};

const Login = () => {
  return (
    <section className="mt-10 w-full">
      <LoginForm />
    </section>
  );
};
export default Login;
