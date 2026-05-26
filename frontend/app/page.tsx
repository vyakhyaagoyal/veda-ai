import DashboardDesktop from "@/app/dashboard/page";
import ProtectedRoute from "@/components/global/protected-route";

export default function Home() {
  return (
    <main>
      <ProtectedRoute>
        <DashboardDesktop />
      </ProtectedRoute>
    </main>
  );
}
