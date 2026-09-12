import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const [admissions, setAdmissions] = useState(0);
  const [courses, setCourses] = useState(0);
  const [projects, setProjects] = useState(0);
  const [enquiry, setEnquiry] = useState(0);
  const [recentAdmissions, setRecentAdmissions] = useState([]);

  // ================= FETCH ADMISSIONS =================
  const fetchAdmissions = async () => {
    try {
      const res = await fetch(
        "http://localhost/api/mginfo/get_admissions.php"
      );
      const data = await res.json();

      setAdmissions(data.length);

      // recent 5 records
      setRecentAdmissions(data.slice(-5).reverse());
    } catch (error) {
      console.log(error);
    }
  };

  // ================= COURSES =================
  const fetchCourses = async () => {
    try {
      const res = await fetch(
        "http://localhost/api/mginfo/get_coursedata.php"
      );
      const data = await res.json();
      setCourses(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= PROJECTS =================
  const fetchProjects = async () => {
    try {
      const res = await fetch(
        "http://localhost/api/mginfo/get_projectdata.php"
      );
      const data = await res.json();
      setProjects(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= ENQUIRY =================
  const fetchEnquiry = async () => {
    try {
      const res = await fetch(
        "http://localhost/api/mginfo/get_enquiries.php"
      );
      const data = await res.json();
      setEnquiry(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= LOAD ALL =================
  const loadData = () => {
    fetchAdmissions();
    fetchCourses();
    fetchProjects();
    fetchEnquiry();
  };

  useEffect(() => {
    loadData();

    // 🔥 AUTO REFRESH EVERY 10 SEC
    const interval = setInterval(() => {
      loadData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid py-4">

      {/* HEADER */}
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">Admin Dashboard</h1>
        <p className="text-muted">Live system overview</p>
      </div>

      {/* STATS */}
      <div className="row g-4 mb-4">

        <div className="col-md-3">
          <div className="card bg-primary text-white shadow text-center p-3">
            <h5>Admissions</h5>
            <h2>{admissions}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white shadow text-center p-3">
            <h5>Courses</h5>
            <h2>{courses}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning text-dark shadow text-center p-3">
            <h5>Projects</h5>
            <h2>{projects}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-info text-white shadow text-center p-3">
            <h5>Enquiries</h5>
            <h2>{enquiry}</h2>
          </div>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <Link to="/addcourses" className="btn btn-primary w-100 py-3">
            Add Courses
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/addprojects" className="btn btn-success w-100 py-3">
            Add Projects
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/enquiry" className="btn btn-warning w-100 py-3">
            Enquiries
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/admission" className="btn btn-info w-100 py-3">
            Admissions
          </Link>
        </div>

      </div>

      {/* RECENT ADMISSIONS TABLE */}
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          Recent Admissions
        </div>

        <div className="card-body table-responsive">
          <table className="table table-bordered text-center align-middle">

            <thead className="table-warning">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
              </tr>
            </thead>

            <tbody>
              {recentAdmissions.length > 0 ? (
                recentAdmissions.map((item, i) => (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <span className="badge bg-primary">
                        {item.course}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No data found</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminHome;
