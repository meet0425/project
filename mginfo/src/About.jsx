import React, { useState, useEffect } from "react";
import axios from 'axios';

const About = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost/api/courses.php')
      .then(res => setCourses(res.data))
      .catch(err => console.error('Error fetching courses:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" />
      </div>
    );
  }

  return (
    <div>

      {/* HERO SECTION */}
      <div className="bg-primary bg-gradient text-white text-center py-5">
        <h1 className="fw-bold">About MG INFOTECH</h1>
        <p className="lead">Building Future Developers</p>
      </div>

      {/* ABOUT SECTION */}
      <div className="container-fluid py-5 px-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="fw-bold mb-3 text-primary">Who We Are</h2>
            <p>
              <strong>Mginfotech</strong> is an IT training and development
              company focused on modern technologies like React, Node.js,
              MongoDB and full stack development.
            </p>
            <p>
              Our goal is to provide students with practical knowledge and
              real-world experience so they can become professional developers.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2721/2721297.png"
              alt="about"
              width="250"
            />
          </div>
        </div>
      </div>

      {/* COURSES SECTION */}
      <div className="py-5 bg-light">
        <div className="container-fluid px-4">
          <h2 className="text-center fw-bold mb-5 text-success">
            Our Courses
          </h2>
          <div className="row g-4">
            {courses.map(course => (
              <div className="col-md-3" key={course.id}>
                <div className="card text-center shadow border-0 h-100">
                  <div className="card-body p-4">
                    <h4>{course.name}</h4>
                    <p className="text-muted">{course.description}</p>
                    <span className="badge bg-primary mb-2">
                      {course.duration} • ₹{course.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MISSION SECTION */}
      <div className="text-center py-5 text-white bg-success bg-gradient">
        <h2 className="fw-bold mb-3">Our Mission</h2>
        <p className="lead container">
          At Mginfotech we believe in learning by building real projects
          and preparing students for real IT industry challenges.
        </p>
      </div>

    </div>
  );
};

export default About;

