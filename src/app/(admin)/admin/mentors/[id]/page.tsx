import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

import adminApi from "@/apis/admin.api";
import MentorDetail from "@/app/(admin)/admin/mentors/components/mentor-detail";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const AdminMentorDetail = async ({
  params: { id },
}: {
  params: {
    id: number;
  };
}) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data },
  } = await adminApi.getDetailMentor(sessionToken, id);

  return (
    <main>
      <div className="flex-between">
        <h1 className="text-3xl font-semibold text-primary">Mentor Detail</h1>

        <Link href="/admin/mentors">
          <Button className="flex-center gap-2">
            <ChevronLeftIcon size={16} />
            Back to Mentor List
          </Button>
        </Link>
      </div>

      <Separator className="my-5" />

      <MentorDetail mentor={data} />
    </main>
  );
};
export default AdminMentorDetail;
