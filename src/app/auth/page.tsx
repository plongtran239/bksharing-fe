import Image from "next/image";

import LoginForm from "@/app/auth/components/login-form";
import RegisterForm from "@/app/auth/components/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  return (
    <div className="w-1/2">
      <div className="flex-center">
        <Image
          src="/images/logo.png"
          alt="BK Sharing Logo"
          width={200}
          height={200}
        />
      </div>

      <Tabs defaultValue="login" className="w-full">
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
