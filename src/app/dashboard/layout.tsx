import { Header } from '../../components/layout/header';
import { SidebarNav } from '../../components/layout/sidebar-nav';
import { AIMentorChatbot } from '../../components/chatbot/ai-mentor-chatbot';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full">
      <SidebarNav />
      <div className="flex flex-col flex-1 sm:pl-14">
        <Header />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
      <AIMentorChatbot />
    </div>
  );
}
