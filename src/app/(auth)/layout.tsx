const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className="flex-center container">{children}</main>;
};
export default AuthLayout;
