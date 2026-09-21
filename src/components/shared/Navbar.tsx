const Navbar = ({ businessName }: { businessName: string }) => {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <h1 className="text-lg font-semibold">{businessName}</h1>

      <div></div>
    </header>
  );
};

export default Navbar;
