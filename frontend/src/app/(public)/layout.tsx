import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0f1e" }}>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: "256px", paddingTop: "64px", minHeight: "100vh" }}>
        <div style={{ padding: "24px" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
