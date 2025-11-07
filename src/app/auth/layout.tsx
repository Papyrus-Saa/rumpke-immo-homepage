
export default function PropertiesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center">

      <div className="w-full md:w-[500px]">

        {children}
      </div>
    </main>
  );
}
