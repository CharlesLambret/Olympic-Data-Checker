import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import SignupPage from "../auth/pages/SignupPage";
import AdminLayout from "@/admin/Layout";
import AuthWrapper from "@/auth/AuthWrapper";

function Layout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
          }
        />
        <Route
          path="/medals"
          element={
            <AuthWrapper needAuth>
              <h1>medals</h1>
            </AuthWrapper>
          }
        />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Layout;
