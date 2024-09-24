import { Metadata } from "next";

import MentorRegisterForm from "@/app/(auth)/components/mentor-register-form";
import StudentRegisterForm from "@/app/(auth)/components/student-register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Register | BK Sharing",
  description: "Register a new account",
};

const Register = () => {
  return (
    <section className="mt-10 w-full">
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
    </section>
  );
};
export default Register;
