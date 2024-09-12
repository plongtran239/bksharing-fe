const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="container">
      <div className="flex-center">{children}</div>
    </main>
  );
};
export default AuthLayout;
