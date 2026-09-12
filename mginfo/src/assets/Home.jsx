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
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518770660439-4636190af475')",
        backgroundPosition: `${pos}% center`,
        backgroundSize: "250% 100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        position: "relative",
        textAlign: "center",
      }}
    >
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.65)"
      }}></div>

      <div style={{ position: "relative", zIndex: 2 }}>
        <h1 className="display-3 fw-bold text-warning">MG INFOTECH</h1>
        <p className="lead mt-3">Build Your Future in IT 🚀</p>

        <div className="mt-4">
          <Link to="/project" className="btn btn-warning me-2">
            View Projects
          </Link>
          <Link to="/contact" className="btn btn-outline-light">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ---------------- HOME ---------------- */
const Home = () => {

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost/api/mginfo/get_images.php")
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>

      {/* HERO */}
      <Hero360 />

{/* GALLERY */}
<div className="container-fluid px-4 py-5">

  <h2
    className="text-center fw-bold mb-5"
    style={{
      fontSize: "42px",
      color: "#0d6efd",
      letterSpacing: "1px",
      textTransform: "uppercase"
    }}
  >
    Our Classroom , Students & Our Services
  </h2>

  <div className="row g-4">

    {images.map((img) => (
      <div className="col-md-4 col-sm-6" key={img.id}>

        <div
          className="card border-0 shadow-lg"
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            transition: "0.4s",
            background: "#fff"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-10px)";
            e.currentTarget.style.boxShadow =
              "0 15px 35px rgba(0,0,0,0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow =
              "0 5px 15px rgba(0,0,0,0.1)";
          }}
        >

          {/* IMAGE */}
          <div
            style={{
              background: "#f8f9fa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "15px"
            }}
          >
            <img
              src={`http://localhost/api/mginfo/uploads/${img.image}`}
              alt=""
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: "15px",
                transition: "0.4s"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "scale(1.03)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            />
          </div>

          {/* CONTENT */}
          <div className="p-4 text-center">

            <h4
              style={{
                fontWeight: "700",
                color: "#222",
                fontSize: "24px",
                marginBottom: "12px"
              }}
            >
              {img.title}
            </h4>

            <p
              style={{
                color: "#666",
                fontSize: "15px",
                lineHeight: "28px",
                marginBottom: "0"
              }}
            >
              {img.description}
            </p>

          </div>

        </div>

      </div>
    ))}

  </div>

</div>


      {/* WHY CHOOSE US */}
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4 text-primary">
          Why Choose MG Infotech?
        </h2>

        <div className="row text-center">
          <div className="col-md-3">
            <h4>💼 Practical Training</h4>
            <p className="text-muted">Real project based learning</p>
          </div>
          <div className="col-md-3">
            <h4>👨‍🏫 Expert Trainers</h4>
            <p className="text-muted">Industry experience</p>
          </div>
          <div className="col-md-3">
            <h4>📄 Certification</h4>
            <p className="text-muted">Recognized certificates</p>
          </div>
          <div className="col-md-3">
            <h4>🎯 Placement</h4>
            <p className="text-muted">Job support</p>
          </div>
        </div>
      </div>

      {/* COURSES */}
      <div className="container py-5 bg-light">
        <h2 className="text-center fw-bold mb-5 text-primary">
          Popular Courses
        </h2>

        <div className="row text-center">
          {["React JS", "Node JS", "PHP", "MERN Stack"].map((c, i) => (
            <div className="col-md-3" key={i}>
              <div className="card shadow p-3">
                <h5>{c}</h5>
                <Link to="/courses" className="btn btn-warning btn-sm mt-2">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4 text-primary">
          Student Reviews
        </h2>

        <div className="row">
          <div className="col-md-4">
            <div className="card p-3 shadow">
              <p>"Best training institute!"</p>
              <h6>- Rahul</h6>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow">
              <p>"Got job after course."</p>
              <h6>- Priya</h6>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow">
              <p>"Real project experience."</p>
              <h6>- Amit</h6>
            </div>
          </div>
        </div>
      </div>

      {/* COUNTER */}
      <div className="bg-dark text-white text-center py-5">
        <div className="row">
          <div className="col-md-3">
            <h1 className="text-warning">1000+</h1>
            <p>Students</p>
          </div>
          <div className="col-md-3">
            <h1 className="text-warning">50+</h1>
            <p>Projects</p>
          </div>
          <div className="col-md-3">
            <h1 className="text-warning">20+</h1>
            <p>Courses</p>
          </div>
          <div className="col-md-3">
            <h1 className="text-warning">10+</h1>
            <p>Trainers</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-5 bg-warning">
        <h2 className="fw-bold">Start Your IT Career Today 🚀</h2>
        <Link to="/admission" className="btn btn-dark mt-3">
          Enroll Now
        </Link>
      </div>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/919913866369"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-success position-fixed bottom-0 end-0 m-3 rounded-circle p-3"
      >
        <i className="bi bi-whatsapp fs-3"></i>
      </a>

    </div>
  );
};

export default Home;