import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import SignupPage from "../auth/pages/SignupPage";

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
      </Routes>
    </BrowserRouter>
  );
}

export default Layout;
