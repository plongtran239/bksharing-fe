import StreamClientProvider from "@/providers/stream-client.provider";

const MeetingLayout = ({ children }: { children: React.ReactNode }) => {
  return <StreamClientProvider>{children}</StreamClientProvider>;
};
export default MeetingLayout;
