import Link from "next/link";

import userApi from "@/apis/user.api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GENDERS } from "@/constants/enum";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const MentorInfo = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  const {
    payload: {
      data: { email, name, phoneNumber, gender, dob },
    },
  } = await userApi.getMe(sessionToken);

  return (
    <div className="h-fit space-y-5 rounded-xl bg-white p-5">
      <h1 className="text-xl text-primary">Thông tin cá nhân</h1>

      <Separator />

      <div>
        <Label className="text-secondary-foreground">Email</Label>
        <p className="font-semibold text-black">{email}</p>
      </div>

      <div>
        <Label className="text-secondary-foreground">Họ tên</Label>
        <p className="font-semibold text-black">{name}</p>
      </div>

      <div>
        <Label className="text-secondary-foreground">Số điện thoại</Label>
        <p className="font-semibold text-black">{phoneNumber}</p>
      </div>

      <div>
        <Label className="text-secondary-foreground">Giới tính</Label>
        <p className="font-semibold capitalize text-black">
          {gender === GENDERS.MALE ? "Nam" : "Nữ"}
        </p>
      </div>

      <div>
        <Label className="text-secondary-foreground">Ngày sinh</Label>
        <p className="font-semibold text-black">
          {new Date(Number(dob)).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>

      <Separator />

      <Link href="/user-info" className="block">
        <Button className="w-full">Chỉnh sửa thông tin</Button>
      </Link>
    </div>
  );
};
export default MentorInfo;
