import Footer from "@/components/footer";
import Header from "@/components/header/header";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <Header />
      <div className="mt-[76px]">{children}</div>
      <Footer />
    </main>
  );
};
export default RootLayout;
