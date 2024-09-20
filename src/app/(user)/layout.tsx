import Footer from "@/components/footer";
import Header from "@/components/header";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};
export default ProfileLayout;
