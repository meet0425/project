import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";
import logoImg from "./assets/pic/logo2.png";

const Layout = () => {
  const [open, setOpen] = useState(false);

  // 🔥 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/login";
  };

  const menuItems = [
    { to: "/app", name: "Home", icon: "bi-house" },
    { to: "/app/home", name: "Dashboard", icon: "bi-speedometer2" },
    { to: "/app/addcourses", name: "Add Courses", icon: "bi-book" },
    { to: "/app/addprojects", name: "Add Projects", icon: "bi-kanban" },
    { to: "/app/enquiry", name: "Enquiry", icon: "bi-envelope" },
    { to: "/app/admission", name: "Admission", icon: "bi-person-plus" },
    { to: "/app/admingallery", name: "Gallery Admin", icon: "bi-image" }
  ];

  return (
    <div className="container-fluid p-0 min-vh-100 d-flex flex-column">
      <div className="row g-0 flex-grow-1 m-0">

        {/* BACKDROP */}
        {open && (
          <div
            className="sidebar-backdrop d-md-none"
            onClick={() => setOpen(false)}
          />
        )}

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
            to="/app"
            className="d-flex flex-column align-items-center mb-4 text-decoration-none"
          >
            <img
              src={logoImg}
              alt="logo"
              style={{ width: "160px", objectFit: "contain" }}
            />
            <span className="fw-bold text-warning mt-3">
              MG INFOTECH
            </span>
          </Link>

          {/* MENU */}
          <ul className="nav flex-column gap-2">
            {menuItems.map((item, i) => (
              <li key={i}>
                <NavLink
                  to={item.to}
                  end={item.to === "/app"}   // 🔥 Home fix
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

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="btn btn-danger mt-auto w-100"
          >
            Logout
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <div className="col-md-9 col-lg-10 d-flex flex-column">
          <main className="flex-grow-1 p-0">
            <Outlet />
          </main>
          <Footer />
        </div>

      </div>

      {/* STYLES */}
      <style>{`
        .nav-link {
          color: white;
          transition: all 0.3s ease;
          border-radius: 8px;
          padding: 10px;
        }

        .nav-link:hover {
          background: rgba(255,255,255,0.1);
          transform: translateX(5px);
        }

        .active-link {
          background: #ffc107 !important;
          color: black !important;
          font-weight: bold;
          box-shadow: 0 0 10px rgba(255,193,7,0.6);
          transform: translateX(5px);
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
            height: 100vh;
            z-index: 1050;
            transition: 0.3s;
          }

          .sidebar.show {
            left: 0;
          }

          .sidebar-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1040;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
