import userApi from "@/apis/user.api";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

export const useGetProfile = async (slug: string) => {
  const { sessionToken } = useGetFromCookie(["sessionToken"]);

  try {
    const {
      payload: { data },
    } =
      slug === "profile"
        ? await userApi.getMentorProfile(sessionToken)
        : await userApi.getMentorDetail(slug);

    return { data };
  } catch (error) {
    console.error({ error });
  }
};
