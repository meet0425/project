import React, { useState, useEffect } from "react";

const IMAGE_URL = "http://localhost/api/mginfo/uploads/";

const Project = () => {

  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 6;

  // FETCH DATA
  useEffect(() => {
    fetch("http://localhost/api/mginfo/get_projectdata.php")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  // FILTER
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter(p =>
          p.tech.toLowerCase().includes(filter.toLowerCase())
        );

  // PAGINATION
  const totalPages = Math.ceil(filteredProjects.length / perPage);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  // LOADING
  if (projects.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div>

      {/* HERO */}
      <div className="bg-dark text-white text-center py-5">
        <h1 className="text-warning fw-bold">Our Projects</h1>
        <p>Explore our professional work</p>
      </div>

      {/* PROJECTS */}
      <div className="container">
        <div className="row g-4">

          {currentProjects.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="card shadow h-100">

                {/* IMAGE FIX */}
                <div style={{ height: "200px", background: "#f8f9fa" }}>
                  <img
                    src={IMAGE_URL + item.image}
                    alt="project"
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

                <div className="card-body text-center">
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>

                  <span className="badge bg-warning text-dark mb-2">
                    {item.tech}
                  </span>

                  <br />

                  <button
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#projectModal"
                    onClick={() => setSelectedProject(item)}
                  >
                    View Details
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* PAGINATION */}
      <div className="text-center py-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn mx-1 ${
              currentPage === i + 1 ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* MODAL */}
      <div className="modal fade" id="projectModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5>{selectedProject?.title}</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body text-center">
              <img
                src={IMAGE_URL + selectedProject?.image}
                className="img-fluid mb-3"
                alt=""
              />
              <p>{selectedProject?.description}</p>
            </div>

            <div className="modal-footer">
              <a
                href={selectedProject?.live}
                target="_blank"
                rel="noreferrer"
                className="btn btn-success"
              >
                Live
              </a>
              <a
                href={selectedProject?.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-dark"
              >
                GitHub
              </a>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Project;
