import { AppSidebar } from "@/components/global/app-sidebar";
import { Navbar } from "@/components/global/navbar";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider suppressHydrationWarning>
      <AppSidebar />
      <ModalProvider />
      <main className="w-full px-[1rem]">
        <Navbar />
        <div className="mt-4 h-[calc(100vh-6rem)] ">{children}</div>
      </main>
    </SidebarProvider>
  );
}

export default DashboardLayout;
