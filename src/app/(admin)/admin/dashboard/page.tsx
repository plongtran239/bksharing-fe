import { BookCopyIcon, GraduationCapIcon, UserIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | BK Sharing",
  description: "Dashboard page for BK Sharing admin",
};

const Dashboard = () => {
  return (
    <main>
      <div className="flex-between gap-5">
        <div className="flex w-full items-center gap-5 rounded-xl bg-secondary p-5">
          {/* Mentors */}
          <div className="rounded-full bg-secondary-foreground p-5">
            <GraduationCapIcon size={32} className="text-white" />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold text-secondary-foreground">15</p>
            <p className="text-lg">Mentors</p>
          </div>
        </div>

        {/* Students */}
        <div className="flex w-full items-center gap-5 rounded-xl bg-secondary p-5">
          <div className="rounded-full bg-secondary-foreground p-5">
            <UserIcon size={32} className="text-white" />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold text-secondary-foreground">30</p>
            <p className="text-lg">Students</p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex w-full items-center gap-5 rounded-xl bg-secondary p-5">
          <div className="rounded-full bg-secondary-foreground p-5">
            <BookCopyIcon size={32} className="text-white" />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold text-secondary-foreground">15</p>
            <p className="text-lg">Categories</p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Dashboard;
