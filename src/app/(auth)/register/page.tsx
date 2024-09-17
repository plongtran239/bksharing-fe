import Link from "next/link";

import RegisterForm from "@/app/(auth)/components/register-form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Register = () => {
  return (
    <div className="mt-10 w-full">
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
    </div>
  );
};
export default Register;
