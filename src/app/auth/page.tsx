import Image from "next/image";

import LoginForm from "@/app/auth/components/login-form";
import RegisterForm from "@/app/auth/components/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  return (
    <div className="my-10 w-1/2 max-sm:w-fit">
      <div className="flex-center">
        <Image
          src="/images/logo.png"
          alt="BK Sharing Logo"
          width={100}
          height={100}
          priority
          className="rounded-full outline outline-2 outline-primary"
        />
      </div>

      <Tabs defaultValue="login" className="mt-10 w-full">
        <div className="flex-center">
          <TabsList>
            <TabsTrigger value="login" className="w-fit">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="w-fit">
              Register
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Auth;
