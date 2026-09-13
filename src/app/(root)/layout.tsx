const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="min-h-screen bg-zinc-100">{children}</div>;
};

export default RootLayout;
