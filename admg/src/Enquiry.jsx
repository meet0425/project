import { useEffect, useState } from "react";

const Enquiry = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/api/mginfo/get_enquiries.php")
      .then(res => res.json())
      .then(res => {
        setData(res || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <h2 className="text-center mb-5 fw-bold">📩 Enquiries</h2>

      <div className="row g-4">

        {data.length === 0 ? (
          <h5 className="text-center text-muted">No enquiries found</h5>
        ) : (
          data.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="card enquiry-card h-100 border-0">

                <div className="card-body text-center">

                  {/* ✅ Avatar Safe */}
                  <div className="avatar mb-3">
                    {item.name ? item.name.charAt(0).toUpperCase() : "U"}
                  </div>

                  <h5 className="fw-bold">{item.name || "No Name"}</h5>

                  <p className="text-muted mb-1">
                    📧 {item.email || "No Email"}
                  </p>

                  {/* ✅ MOBILE SHOW */}
                  <p className="text-muted mb-1">
                    📱 {item.mobile || "No Mobile"}
                  </p>

                  <span className="badge bg-primary px-3 py-2 mt-2">
                    {item.course || "No Course"}
                  </span>

                </div>

              </div>
            </div>
          ))
        )}

      </div>

      {/* STYLE */}
      <style>{`
        .enquiry-card {
          border-radius: 20px;
          padding: 20px;
          background: linear-gradient(135deg, #ffffff, #f1f5ff);
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          transition: 0.3s;
        }

        .enquiry-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .avatar {
          width: 60px;
          height: 60px;
          margin: auto;
          border-radius: 50%;
          background: linear-gradient(135deg, #00c6ff, #0072ff);
          color: white;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
      `}</style>

    </div>
  );
};

export default Enquiry;
