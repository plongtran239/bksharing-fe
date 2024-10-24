import userApi from "@/apis/user.api";
import UserInfoForm from "@/app/(root)/(user)/user-info/components/user-info-form";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const UserInfo = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: { data },
  } = await userApi.getMe(sessionToken);

  return (
    <main className="bg-secondary">
      <div className="flex-center container py-10 max-sm:py-5 lg:min-h-[calc(100vh-75px-260px)]">
        <UserInfoForm data={data} />
      </div>
    </main>
  );
};
export default UserInfo;
