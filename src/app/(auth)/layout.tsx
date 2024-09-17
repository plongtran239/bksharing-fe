import Image from "next/image";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="container">
      <div className="flex-center">
        <div className="my-10 w-1/2 max-sm:w-fit">
          <div className="flex-center">
            <Image
              src="/images/logo.png"
              alt="BK Sharing Logo"
              width={100}
              height={100}
              priority
              className="rounded-full outline outline-2 outline-primary"
            />
          </div>
          {children}
        </div>
      </div>
    </main>
  );
};
export default AuthLayout;
