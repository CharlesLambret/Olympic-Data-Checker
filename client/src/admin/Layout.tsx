import AuthWrapper from "@/auth/AuthWrapper";
import { Routes, Route } from "react-router-dom";
import MedalsAdminPage from "./pages/MedalsAdminPage";

const AdminLayout = () => {
  return (
    <AuthWrapper needAdmin needAuth>
      <Routes>
        <Route path="/admin" element={<MedalsAdminPage />} />
      </Routes>
    </AuthWrapper>
  );
};

export default AdminLayout;
