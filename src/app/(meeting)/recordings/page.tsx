import CallList from "@/components/call-list";
import Footer from "@/components/footer";
import Header from "@/components/header/header";

const Recording = () => {
  return (
    <main>
      <Header />

      <div className="container mt-[76px] min-h-[calc(100vh-75px-260px)] py-10">
        <CallList type="recordings" />
      </div>

      <Footer />
    </main>
  );
};
export default Recording;
