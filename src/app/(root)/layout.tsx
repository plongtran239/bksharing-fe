import { PropsWithChildren } from "react";

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <Header />
      <div className="mt-[76px]">{children}</div>
      <Footer />
    </main>
  );
};
export default RootLayout;
