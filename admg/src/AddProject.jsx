import { useState, useEffect } from "react";

const AddProject = () => {

  const [project, setProject] = useState({
    title: "",
    tech: "",
    github: "",
    live: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [projects, setProjects] = useState([]);
  const [editData, setEditData] = useState(null);
  const [editImage, setEditImage] = useState(null);

  // FETCH
  const fetchProjects = () => {
    fetch("http://localhost/api/mginfo/get_projectdata.php")
      .then(res => res.json())
      .then(data => setProjects(data));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // INPUT
  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  // IMAGE
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ ADD PROJECT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(project).forEach(key => {
      formData.append(key, project[key]);
    });

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch("http://localhost/api/mginfo/add_project.php", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Added ✅");
      fetchProjects();

      setProject({
        title: "",
        tech: "",
        github: "",
        live: "",
        description: "",
      });
      setImage(null);
      setPreview(null);
    }
  };

  // EDIT CLICK
  const handleEdit = (item) => {
    setEditData(item);
  };

  // EDIT IMAGE
  const handleEditImage = (e) => {
    setEditImage(e.target.files[0]);
  };

  // ✅ UPDATE PROJECT
  const handleUpdate = async () => {

    if (!editData?.id) {
      alert("ID missing ❌");
      return;
    }

    const formData = new FormData();

    formData.append("id", editData.id);
    formData.append("title", editData.title);
    formData.append("tech", editData.tech);
    formData.append("github", editData.github);
    formData.append("live", editData.live);
    formData.append("description", editData.description);

    if (editImage) {
      formData.append("image", editImage);
    }

    const res = await fetch("http://localhost/api/mginfo/update_project.php", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Updated ✅");
      setEditData(null);
      setEditImage(null);
      fetchProjects();
    }
  };

  // DELETE
// DELETE
const handleDelete = async (id) => {

  console.log("DELETE ID:", id); // debug

  if (!id) {
    alert("ID missing ❌");
    return;
  }

  if (!window.confirm("Delete this project?")) return;

  const res = await fetch("http://localhost/api/mginfo/delete_project.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  console.log(data);

  if (data.success) {
    alert("Deleted ✅");
    fetchProjects();
  } else {
    alert(data.error);
  }
};

  return (
    <div className="container py-4">

      {/* ADD */}
      <div className="card p-4 mb-4">
        <h4>Add Project</h4>

        <form onSubmit={handleSubmit}>
          <input name="title" value={project.title} onChange={handleChange} className="form-control mb-2" placeholder="Title" />
          <input name="tech" value={project.tech} onChange={handleChange} className="form-control mb-2" placeholder="Tech" />
          <input name="github" value={project.github} onChange={handleChange} className="form-control mb-2" placeholder="GitHub" />
          <input name="live" value={project.live} onChange={handleChange} className="form-control mb-2" placeholder="Live" />

          <input type="file" onChange={handleImage} className="form-control mb-2" />

          {preview && <img src={preview} height="100" className="mb-2" />}

          <textarea name="description" value={project.description} onChange={handleChange} className="form-control mb-2" />

          <button className="btn btn-success w-100">Add</button>
        </form>
      </div>

      {/* LIST */}
      <div className="row">
        {projects.map((item) => (
          <div className="col-md-4 mb-3" key={item.id}>
            <div className="card p-3">

              <img
                src={`http://localhost/api/mginfo/uploads/${item.image}`}
                height="150"
                style={{ objectFit: "cover" }}
              />

              <h5>{item.title}</h5>
              <p>{item.tech}</p>

              <button onClick={() => handleEdit(item)} className="btn btn-warning btn-sm me-2">
                Edit
              </button>

              <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT */}
      {editData && (
        <div className="card p-4 mt-4">
          <h4>Edit Project</h4>

          <input value={editData.title} onChange={(e)=>setEditData({...editData,title:e.target.value})} className="form-control mb-2" />
          <input value={editData.tech} onChange={(e)=>setEditData({...editData,tech:e.target.value})} className="form-control mb-2" />
          <input value={editData.github} onChange={(e)=>setEditData({...editData,github:e.target.value})} className="form-control mb-2" />
          <input value={editData.live} onChange={(e)=>setEditData({...editData,live:e.target.value})} className="form-control mb-2" />

          <input type="file" onChange={handleEditImage} className="form-control mb-2" />

          <textarea value={editData.description} onChange={(e)=>setEditData({...editData,description:e.target.value})} className="form-control mb-2" />

          <button className="btn btn-primary me-2" onClick={handleUpdate}>Update</button>
          <button className="btn btn-secondary" onClick={()=>setEditData(null)}>Cancel</button>
        </div>
      )}

    </div>
  );
};

export default AddProject;
