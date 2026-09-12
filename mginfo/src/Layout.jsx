import { Link, NavLink, Outlet } from "react-router-dom";
import Footer from "./Footer";
import logo from "./assets/pic/logo1.jpeg";
import { useState } from "react";

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="container-fluid p-0 min-vh-100 d-flex flex-column">

      <div className="row g-0 flex-grow-1 m-0">

        {/* MOBILE TOP BAR */}
        <div className="d-md-none bg-dark text-white p-2 d-flex justify-content-between align-items-center">
          <span className="fw-bold text-warning">MG INFOTECH</span>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* SIDEBAR */}
        <aside
          className={`col-md-3 col-lg-2 bg-dark text-white p-3 sidebar ${open ? "show" : ""}`}
        >
          {/* LOGO */}
          <Link
            to="/"
            className="d-flex flex-column align-items-center mb-4 text-decoration-none"
          >
            <img
              src={logo}
              alt="logo"
              style={{
                width: "100%",
                maxWidth: "160px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            <span
              className="fw-bold text-warning mt-3 text-center"
              style={{
                fontSize: "18px",
                letterSpacing: "2px"
              }}
            >
              MG INFOTECH
            </span>
          </Link>

          {/* MENU */}
          <ul className="nav flex-column gap-2">
            {[
              { to: "/", name: "Home", icon: "bi-house" },
              { to: "/courses", name: "Courses", icon: "bi-book" },
              { to: "/project", name: "Project", icon: "bi-kanban" },
              { to: "/admission", name: "Admission", icon: "bi-pencil-square" },
              { to: "/about", name: "About", icon: "bi-info-circle" },
              { to: "/contact", name: "Contact", icon: "bi-envelope" },
              
            ].map((item, i) => (
              <li key={i}>
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    "nav-link d-flex align-items-center gap-2 " +
                    (isActive ? "active-link" : "")
                  }
                >
                  <i className={`bi ${item.icon}`}></i>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

        </aside> {/* ✅ FIXED */}

        {/* MAIN */}
        <div className="col-md-9 col-lg-10 d-flex flex-column">

          <main className="flex-grow-1 p-0">
            <Outlet />
          </main>

          <Footer />

        </div>

      </div>

      {/* STYLE */}
      <style>{`
        .nav-link {
          color: white;
          transition: 0.3s;
          border-radius: 8px;
          padding: 10px;
        }

        .nav-link:hover {
          background: rgba(255,255,255,0.1);
          transform: translateX(5px);
        }

        .active-link {
          background: #ffc107;
          color: black !important;
          font-weight: bold;
        }

        .sidebar {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: -100%;
            width: 250px;
            height: 100%;
            z-index: 999;
            transition: 0.3s;
          }

          .sidebar.show {
            left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
