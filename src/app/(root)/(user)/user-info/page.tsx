import UserInfoForm from "@/app/(root)/(user)/user-info/components/user-info-form";

const UserInfo = () => {
  return (
    <main className="bg-secondary">
      <div className="flex-center container py-10 max-sm:py-5 lg:min-h-[calc(100vh-75px-260px)]">
        <UserInfoForm />
      </div>
    </main>
  );
};
export default UserInfo;
