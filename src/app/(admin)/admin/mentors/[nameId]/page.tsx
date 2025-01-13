import adminApi from "@/apis/admin.api";
import MentorDetail from "@/app/(admin)/admin/mentors/components/mentor-detail";
import BackButton from "@/components/back-button";
import { Separator } from "@/components/ui/separator";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";
import { getIdFromNameId } from "@/lib/utils";

const AdminMentorDetail = async ({
  params: { nameId },
}: {
  params: {
    nameId: string;
  };
}) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data },
  } = await adminApi.getDetailMentor(sessionToken, getIdFromNameId(nameId));

  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">Mentor Detail</h1>

        <BackButton />
      </div>

      <Separator className="my-5" />

      <MentorDetail mentor={data} />
    </main>
  );
};
export default AdminMentorDetail;
