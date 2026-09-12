import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Admission from "./Admission";
import About from "./About";
import Courses from "./cources";
import Contact from "./Contact";
import Project from "./Project";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />

          <Route path="admission" element={<Admission />} />

          <Route path="about" element={<About />} />

          <Route path="courses" element={<Courses />} />

          <Route path="contact" element={<Contact />} />

        <Route path="project" element={<Project />} />


        

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;

