import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import SignupPage from "../auth/pages/SignupPage";
import Stats from "@/stats/pages/Stats";
import AdminLayout from "@/admin/Layout";
import AuthWrapper from "@/auth/AuthWrapper";
import SingleAthlete from "@/athletes/pages/SingleAthlete";
import OlympicEvents from "../api/testcallapi";
import AllAthletes from "@/athletes/pages/AllAthletes";
import NavBar from "./components/NavBar";
import Comparison from "@/stats/pages/Comparison";

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
                <Stats />
              </AuthWrapper>
            }
          />
          <Route
            path="/comparison"
            element={
              <AuthWrapper needAuth>
                <Comparison />
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
