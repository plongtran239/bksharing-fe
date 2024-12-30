import Image from "next/image";
import Link from "next/link";

import userApi from "@/apis/user.api";
import { Input } from "@/components/ui/input";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const Welcome = async () => {
  const { sessionToken } = useGetFromCookie(["sessionToken", "role"]);

  let user = null;

  if (sessionToken) {
    const {
      payload: { data },
    } = await userApi.getMe(sessionToken);
    user = data;
  }

  if (!user) {
    return null;
  }

  return (
    <section className="flex-between container gap-36 py-10">
      <div className="flex items-center gap-5">
        <div className="relative h-16 w-16">
          <Image
            src={user.thumbnail?.originalUrl || "/images/default-user.png"}
            alt=""
            fill
            priority
            className="rounded-full"
          />
        </div>

        <div className="space-y-1">
          <p className="text-xl font-semibold text-secondary-foreground">
            Chào mừng trở lại, {user?.name}!
          </p>
          <div>
            <Link href="/categories" className="underline hover:text-primary">
              Lựa chọn danh mục yêu thích
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <Input className="bg-white" placeholder="tìm kiếm khóa học" />
      </div>
    </section>
  );
};
export default Welcome;
