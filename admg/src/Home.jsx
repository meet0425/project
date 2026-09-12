import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* ---------------- HERO 360 ---------------- */
const Hero360 = () => {
  const [pos, setPos] = useState(50);

  const handleMove = (e) => {
    const percent = (e.clientX / window.innerWidth) * 100;
    setPos(percent);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPos((prev) => (prev >= 100 ? 0 : prev + 0.15));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onMouseMove={handleMove}
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518770660439-4636190af475')",
        backgroundPosition: `${pos}% center`,
        backgroundSize: "250% 100%",
        backgroundPosition: `${pos}% center`,
        backgroundRepeat: "no-repeat",
        transition: "background-position 0.2s",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.65)",
        }}
      ></div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <h1 className="display-3 fw-bold text-warning">
          MG INFOTECH
        </h1>
        <p className="lead mt-3">
          Build Your Future in IT 🚀
        </p>

        <div className="mt-4 d-flex gap-3 justify-content-center">
          <a href="https://www.instagram.com/mg_infotech_/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light p-3 rounded-circle d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
            <i className="bi bi-instagram fs-4"></i>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100089928169847" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light p-3 rounded-circle d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
            <i className="bi bi-facebook fs-4"></i>
          </a>
          <a href="https://www.linkedin.com/company/mg-infotech-ahmedabad/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light p-3 rounded-circle d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
            <i className="bi bi-linkedin fs-4"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

/* ---------------- HOME ---------------- */
const Home = () => {
  const [students, setStudents] = useState(0);
  const [courses, setCourses] = useState(0);
  const [trainers, setTrainers] = useState(0);
  const [projects, setProjects] = useState(0);

  useEffect(() => {
    let s = 0, c = 0, t = 0, p = 0;

    const counter = setInterval(() => {
      if (s < 1000) setStudents((s += 20));
      if (c < 25) setCourses((c += 1));
      if (t < 10) setTrainers((t += 1));
      if (p < 500) setProjects((p += 10));
    }, 50);

    return () => clearInterval(counter);
  }, []);

  return (
    <div>
      {/* HERO */}
      <Hero360 />

      {/* WHATSAPP */}
      <a
        href="https://wa.me/919913866369"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-success position-fixed bottom-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center p-3"
      >
        <i className="bi bi-whatsapp fs-3"></i>
      </a>
    </div>
  );
};

export default Home;
