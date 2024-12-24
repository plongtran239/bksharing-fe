import { PropsWithChildren } from "react";

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { useGetFromCookie } from "@/hooks/use-get-from-cookie";

const RootLayout = ({ children }: PropsWithChildren) => {
  const { lang } = useGetFromCookie(["lang"]);

  return (
    <main>
      <Header lang={lang} />
      <div className="mt-[76px]">{children}</div>
      <Footer />
    </main>
  );
};
export default RootLayout;
