import { getRequestConfig } from "next-intl/server";

import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

export default getRequestConfig(async () => {
  const locale = useGetFromCookie(["lang"]).lang || "vi";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
