import React, { useState, useEffect } from "react";
import axios from "axios";

const Admission = () => {

  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    address: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ Fetch Courses from API
  useEffect(() => {
    fetch("http://localhost/api/mginfo/get_coursedata.php")
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    try {
      await axios.post("http://localhost/api/mginfo/admissions.php", form);

      setSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        course: "",
        address: ""
      });
    } catch (err) {
      console.error(err);
      alert("Error submitting admission. Please try again.");
    }

    setSubmitting(false);
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container-fluid py-3 px-4">

        {success && (
          <div className="alert alert-success text-center mb-4">
            Admission submitted successfully! We will contact you soon.
          </div>
        )}

        {/* Heading */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-dark">MG INFOTECH Admission</h1>
          <p className="text-secondary">
            Start your journey in the IT industry with professional training
          </p>
        </div>

        <div className="row justify-content-center align-items-center">

          {/* LEFT INFO */}
          <div className="col-lg-5 text-dark mb-4">
            <h3 className="fw-bold mb-3">Why Join MG INFOTECH?</h3>
            <ul className="list-unstyled fs-5">
              <li className="mb-3">✔ Industry Expert Trainers</li>
              <li className="mb-3">✔ Real Project Based Training</li>
              <li className="mb-3">✔ 100% Practical Learning</li>
              <li className="mb-3">✔ Placement Assistance</li>
            </ul>
          </div>

          {/* FORM */}
          <div className="col-lg-6">
            <div className="card shadow-lg border-0 p-4 rounded-4">
              <h4 className="text-center mb-4 fw-bold text-primary">
                Admission Form
              </h4>

              <form onSubmit={handleSubmit}>
                
                {/* Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* ✅ Dynamic Course Dropdown */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Course</label>
                  <select
                    name="course"
                    className="form-select"
                    value={form.course}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Course</option>

                    {courses.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    rows="3"
                    value={form.address}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Button */}
                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Admission"}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Admission;
