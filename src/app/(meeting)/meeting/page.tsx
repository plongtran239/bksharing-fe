import { Metadata } from "next";

import Footer from "@/components/footer";
import Header from "@/components/header";
import MeetingTypeList from "@/components/meeting-type-list";

export const metadata: Metadata = {
  title: "Meeting | BK Sharing",
  description: "Meeting",
};

const MeetingHome = () => {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
  });
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(now);

  return (
    <main>
      <Header />

      <section className="container mt-[75px] py-10 max-sm:px-5">
        <div className="size-full text-white">
          <div className="h-[303px] w-full rounded-[20px] bg-meeting-hero bg-cover">
            <div className="flex h-full flex-col justify-between p-10">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
                <p className="text-sky-1 text-lg font-medium lg:text-2xl">
                  {date}
                </p>
              </div>
            </div>
          </div>
        </div>

        <MeetingTypeList />
      </section>

      <Footer />
    </main>
  );
};
export default MeetingHome;
