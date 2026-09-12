import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post("http://localhost/api/mginfo/contacts.php", form);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      alert("Error sending message. Please try again.");
    }

    setSubmitting(false);
  };

  return (
    <div>
      {success && (
        <div className="alert alert-success text-center mb-4 mx-4 mt-3">
          Message sent successfully! We will get back to you soon.
        </div>
      )}

      {/* HERO SECTION */}
      <div className="bg-dark text-white text-center py-5">
        <h1 className="fw-bold text-warning">Contact MG INFOTECH</h1>
        <p className="lead">We would love to hear from you</p>
      </div>

      <div className="container-fluid py-5 px-4">
        <div className="row g-4">

          {/* Contact Info */}
          <div className="col-md-5">
            <div className="card shadow-lg border-0 h-100">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Get In Touch</h4>
              </div>
              <div className="card-body">
                <p className="text-muted">
                  If you have any questions about our courses,
                  feel free to contact us anytime.
                </p>
                <hr />
                <p className="fs-5">
                  <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                  Navsari, Gujarat, India
                </p>
                <p className="fs-5">
                  <i className="bi bi-telephone-fill text-success me-2"></i>
                  +91 9876543210
                </p>
                <p className="fs-5">
                  <i className="bi bi-envelope-fill text-primary me-2"></i>
                  info@mginfotech.com
                </p>
                <hr />
                {/* Social Icons */}
                <div>
                  <a href="https://www.instagram.com/mg_infotech_/?hl=en" target="_blank" rel="noopener noreferrer" className="me-3">
                    <i className="bi bi-instagram fs-3 text-danger"></i>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">
                    <i className="bi bi-facebook fs-3 text-primary"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-linkedin fs-3 text-info"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-md-7">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-success text-white">
                <h4 className="mb-0">Send Message</h4>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      placeholder="Subject"
                      value={form.subject}
                      onChange={handleChange}
                      disabled={submitting}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      name="message"
                      rows="4"
                      placeholder="Your Message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                    ></textarea>
                  </div>
                  <button className="btn btn-success w-100 fw-bold" type="submit" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;

