import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const IMAGE_URL = "http://localhost/api/mginfo/uploads/";

const Courses = () => {

  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    course: ""
  });

  useEffect(() => {
    fetch("http://localhost/api/mginfo/get_coursedata.php")
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost/api/mginfo/enquiries.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Enquiry submitted successfully!");
        setForm({ name: "", email: "", mobile: "", course: "" });
      } else {
        alert("❌ Failed to submit enquiry");
      }

    } catch (err) {
      console.error(err);
      alert("⚠ Server error");
    }
  };

  return (
    <div>

      {/* COURSES */}
      <div className="container py-5">
        <div className="row g-4 mb-5">

          {courses.map((course) => (
            <div className="col-md-3" key={course.id}>
              <div className="card h-100 text-center p-3 border-0 shadow">

                {/* IMAGE FIX */}
                <div style={{ height: "200px", background: "#f8f9fa" }}>
                  <img
                    src={IMAGE_URL + course.image}
                    alt="course"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain"
                    }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                </div>

                <div className="card-body">
                  <h5>{course.title}</h5>
                  <p className="text-muted">{course.description}</p>
                  <h6>₹{course.price}</h6>

                  <Link to="/admission" className="btn btn-primary mt-2">
                    Enroll Now
                  </Link>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* FORM */}
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card p-4 shadow">

              <h4 className="text-center mb-4">📩 Course Enquiry</h4>

              <form onSubmit={handleSubmit}>

                <input
                  type="text"
                  name="name"
                  className="form-control mb-3"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  className="form-control mb-3"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="tel"
                  name="mobile"
                  className="form-control mb-3"
                  placeholder="Mobile Number"
                  value={form.mobile}
                  onChange={handleChange}
                  required
                />

                <select
                  name="course"
                  className="form-select mb-3"
                  value={form.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>

                <button className="btn btn-success w-100">
                  Submit Enquiry 🚀
                </button>

              </form>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Courses;
