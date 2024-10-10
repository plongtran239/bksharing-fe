import CallList from "@/components/call-list";
import StreamClientProvider from "@/providers/stream-client.provider";

const AdminUpcoming = () => {
  return (
    <StreamClientProvider>
      <h1 className="text-2xl font-semibold">Upcoming Calls</h1>

      <div className="mt-5">
        <CallList type="upcoming" />
      </div>
    </StreamClientProvider>
  );
};
export default AdminUpcoming;
