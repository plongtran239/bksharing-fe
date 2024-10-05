const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="bg-secondary">
      <div className="flex-center container py-10 max-sm:py-5 lg:min-h-[calc(100vh-75px-260px)]">
        {children}
      </div>
    </main>
  );
};
export default AuthLayout;
