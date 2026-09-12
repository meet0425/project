import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pos, setPos] = useState(0);

  const navigate = useNavigate();

  // 🔥 AUTO MOVING (SLOW = PREMIUM)
  useEffect(() => {
    const interval = setInterval(() => {
      setPos((prev) => (prev >= 100 ? 0 : prev + 0.1)); // 👈 slow smooth
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // 🔐 LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email.trim() === "admin@mginfo.com" &&
      password.trim() === "admin@123"
    ) {
      localStorage.setItem("admin", "true");
      navigate("/app");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518770660439-4636190af475')",
        backgroundSize: "250% 100%", // 🔥 zoom feel
        backgroundPosition: `${pos}% center`, // 🔥 moving
        backgroundRepeat: "no-repeat",
        transition: "background-position 0.3s",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🔥 DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.65)",
        }}
      ></div>

      {/* 🧊 LOGIN CARD */}
      <div
        className="p-4 shadow-lg"
        style={{
          width: "350px",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
          zIndex: 2,
          color: "white",
          boxShadow: "0 0 30px rgba(0,0,0,0.5)",
        }}
      >
        <h3 className="text-center mb-4 text-warning fw-bold">
          Admin Login
        </h3>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "none",
            }}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "none",
            }}
          />

          <button className="btn btn-warning w-100 fw-bold login-btn">
            Login
          </button>
        </form>
      </div>

      {/* 🔥 STYLE */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); opacity: 0.5; }
          50% { transform: translateY(-40px); opacity: 1; }
          100% { transform: translateY(0px); opacity: 0.5; }
        }

        .login-btn {
          transition: 0.3s;
        }

        .login-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(255,193,7,0.8);
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
