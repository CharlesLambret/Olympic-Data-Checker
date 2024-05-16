import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import SignupPage from "../auth/pages/SignupPage";
import Stats from "@/stats/pages/Stats";
import AdminLayout from "@/admin/Layout";
import AuthWrapper from "@/auth/AuthWrapper";
import SingleAthlete from "@/athletes/pages/SingleAthlete";
import OlympicEvents from "../api/testcallapi";
import AllAthletes from "@/athletes/pages/AllAthletes";
import NavBar from "./components/NavBar";

function Layout() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
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
            path="/stats"
            element={
              <AuthWrapper needAuth={false}>
                <Stats />
              </AuthWrapper>
            }
          />
          <Route
            path="/athletes"
            element={
              <AuthWrapper needAuth>
                <AllAthletes />
              </AuthWrapper>
            }
          />
          <Route
            path="/athletes/:id"
            element={
              <AuthWrapper needAuth>
                <SingleAthlete />
              </AuthWrapper>
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
          <Route path="/testapi" element={<OlympicEvents />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Layout;
