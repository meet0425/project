import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto">

      <div className="container-fluid px-4">

        <div className="row align-items-start">

          {/* COMPANY INFO */}
          <div className="col-md-6 mb-4">
            <h3 className="fw-bold text-warning mb-3">
              MG INFOTECH
            </h3>

            <p className="text-secondary">
              We provide practical IT training in React, Node.js and MERN Stack.
              Build real-world projects and grow your career with us.
            </p>

            <p className="small text-secondary">
              📍 navsari, Gujarat <br />
              📞 +91 9913866369 <br />
              📧 www.mgiter.edu.in
            </p>
          </div>

          {/* SOCIAL LINKS */}
          <div className="col-md-6 mb-4 text-md-end text-start">

            <h5 className="fw-bold text-info mb-3">
              Follow Us
            </h5>

            <div>

              <a
                href="https://www.instagram.com/mg_infotech_/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon linkedin"
              >
                <i className="bi bi-linkedin"></i>
              </a>

            </div>

          </div>

        </div>

        <hr className="border-secondary" />

        {/* COPYRIGHT */}
        <div className="text-center">
          <p className="mb-1 text-warning fw-semibold">
            © 2026 MG INFOTECH
          </p>

          <small className="text-secondary">
            Learn • Build • Grow 🚀
          </small>
        </div>

      </div>

      {/* 🔥 STYLE */}
      <style>{`
        .social-icon {
          font-size: 22px;
          margin-right: 15px;
          color: white;
          transition: 0.3s;
        }

        .social-icon:hover {
          transform: scale(1.2);
        }

        .instagram:hover {
          color: #e1306c;
        }

        .facebook:hover {
          color: #1877f2;
        }

        .linkedin:hover {
          color: #0a66c2;
        }
      `}</style>

    </footer>
  );
};

export default Footer;
