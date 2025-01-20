import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-wrap sm:flex-nowrap bg-gradient-to-b from-lightBlue to-deepBlue">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-deepBlue rounded-2xl mt-4">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-4 overflow-auto flex-grow flex">{children}</main>
      </div>
    </div>
  );
}