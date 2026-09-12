import { useEffect, useState } from "react";

const AdmissionPage = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ================= FETCH =================
  const fetchAdmissions = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost/api/mginfo/get_admissions.php"
      );
      const data = await res.json();

      setAdmissions(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this admission?")) return;

    try {
      await fetch(
        `http://localhost/api/mginfo/delete_admission.php?id=${id}`
      );
      fetchAdmissions();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FILTER =================
  const filteredData = admissions.filter((item) =>
    `${item.id} ${item.name} ${item.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div>
          <h2 className="fw-bold text-warning mb-0">Admission Dashboard</h2>
          <small className="text-muted">
            Total: {admissions.length}
          </small>
        </div>

        <input
          type="text"
          className="form-control w-auto mt-2 mt-md-0"
          placeholder="Search..."
          style={{ minWidth: "250px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-warning"></div>
        </div>
      ) : (
        <div className="table-responsive">

          <table className="table table-hover table-bordered align-middle text-center shadow">

            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, i) => (
                  <tr key={i}>

                    <td className="fw-bold text-primary">
                      {item.id}
                    </td>

                    <td>{item.name}</td>

                    <td>{item.email}</td>

                    <td>{item.phone}</td>

                    <td>
                      <span className="badge bg-warning text-dark">
                        {item.course}
                      </span>
                    </td>

                    <td>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-muted py-4">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      )}

      {/* STYLE */}
      <style>{`
        table {
          border-radius: 10px;
          overflow: hidden;
        }

        thead th {
          font-size: 15px;
          letter-spacing: 0.5px;
        }

        tbody tr {
          transition: 0.2s;
        }

        tbody tr:hover {
          background-color: rgba(255, 193, 7, 0.1);
          transform: scale(1.01);
        }

        .btn-danger {
          transition: 0.3s;
        }

        .btn-danger:hover {
          transform: scale(1.1);
        }
      `}</style>

    </div>
  );
};

export default AdmissionPage;
