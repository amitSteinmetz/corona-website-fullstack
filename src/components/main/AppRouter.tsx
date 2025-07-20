import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./Header";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Home from "../Home";
import AdminLogin from "../admin/AdminLogin";
import AdminControlCenter from "../admin/AdminControlCenter";
import ProtectedRoute from "../../routers/ProtectedRoute";
import { languageContext } from "../../contexts/LanguageContext";

function AppRouter() {
  const { themeColor } = useContext(ThemeContext);
  const { language } = useContext(languageContext);

  return (
    <BrowserRouter>
      <div className={`all-page__container ${themeColor}-theme ${language}`}>
        <Header></Header>

        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/control-center"
            element={<ProtectedRoute children={<AdminControlCenter />} />}
          />
          {/* <Route path="*" element={<Navigate to="/page-not-found" />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
