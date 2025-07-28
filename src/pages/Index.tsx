import { Dashboard } from '@/components/Dashboard';
import AuthNavigation from "@/components/AuthNavigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-medical-100">
      <AuthNavigation />
      <Dashboard />
    </div>
  );
};

export default Index;
