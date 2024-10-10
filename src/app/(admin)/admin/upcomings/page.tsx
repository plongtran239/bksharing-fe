import CallList from "@/components/call-list";

const AdminUpcoming = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Upcoming Calls</h1>

      <div className="mt-5">
        <CallList type="upcoming" />
      </div>
    </div>
  );
};
export default AdminUpcoming;
