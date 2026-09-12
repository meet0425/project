import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import AdminHome from "./AdminHome";
import AddCourses from "./AddCourses";
import AddProject from "./AddProject";
import Enquiry from "./Enquiry";
import AdmissionPage from "./AdmissionPage";

import AdminLogin from "./Adminlogin";
import PrivateRoute from "./PrivateRoute";
import AdminGallery from "./AdminGallery";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ DEFAULT REDIRECT */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* ✅ LOGIN PAGE */}
        <Route path="/login" element={<AdminLogin />} />

        {/* ✅ PROTECTED ROUTES */}
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="addcourses" element={<AddCourses />} />
          <Route path="addprojects" element={<AddProject />} />
          <Route path="enquiry" element={<Enquiry />} />
          <Route path="admission" element={<AdmissionPage />} />
          <Route path="AdminGallery" element={<AdminGallery/>}/>
        </Route>

        {/* ❌ UNKNOWN ROUTE */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
