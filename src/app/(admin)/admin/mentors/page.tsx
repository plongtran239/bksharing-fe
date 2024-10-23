import adminApi from "@/apis/admin.api";
import MentorTable from "@/app/(admin)/admin/mentors/components/mentor-table";
import { Separator } from "@/components/ui/separator";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const AdminMentor = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const { payload } = await adminApi.getAdminMentors(sessionToken);

  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">Mentor List</h1>
      </div>

      <Separator className="my-5" />

      <MentorTable data={payload.data} />
    </main>
  );
};
export default AdminMentor;
