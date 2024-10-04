// import dynamic from "next/dynamic";
import MeetingCard from "@/components/meeting-card";

// const Meeting = dynamic(() => import("@/components/meeting"), { ssr: false });

const MeetingRoom = () => {
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
    <section className="container py-10 max-sm:px-5">
      <section className="size-full text-white">
        <div className="h-[303px] w-full rounded-[20px] bg-meeting-hero bg-cover">
          <div className="flex h-full flex-col justify-between p-10">
            {/* <h2 className="rounded py-2 text-base font-normal">
                Upcoming Meeting at: 12:30 PM
              </h2> */}
            <h2></h2>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
              <p className="text-sky-1 text-lg font-medium lg:text-2xl">
                {date}
              </p>
            </div>
          </div>
        </div>

        {/* <MeetingTypeList /> */}
        <div className="mt-5 grid w-full grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <MeetingCard
            icon="plus"
            title="New Meeting"
            description="Set up a new meeting"
            className="bg-icon-4"
            // handleClick={() => setMeetingState("isJoiningMeeting")}
          />

          <MeetingCard
            icon="user-plus"
            title="Join Meeting"
            description="Via invitation link"
            className="bg-icon-3"
            // handleClick={() => setMeetingState("isJoiningMeeting")}
          />

          <MeetingCard
            icon="calendar-plus"
            title="Schedule Meeting"
            description="Plan a meeting"
            className="bg-icon-5"
            // handleClick={() => setMeetingState("isJoiningMeeting")}
          />

          <MeetingCard
            icon="video"
            title="View Recordings"
            description="Meeting recordings"
            className="bg-icon-1"
            // handleClick={() => setMeetingState("isJoiningMeeting")}
          />
        </div>
      </section>
    </section>
  );
};
export default MeetingRoom;
