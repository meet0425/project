import { useState, useEffect } from "react";

const IMAGE_URL = "http://localhost/api/mginfo/uploads/";

const AddCourses = () => {
  const [course, setCourse] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [courses, setCourses] = useState([]);
  const [editData, setEditData] = useState(null);
  const [editImage, setEditImage] = useState(null);

  // FETCH
  const fetchCourses = () => {
    fetch("http://localhost/api/mginfo/get_coursedata.php")
      .then((res) => res.json())
      .then((res) => setCourses(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // INPUT
  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // ADD IMAGE
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ADD
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", course.title);
    formData.append("category", course.category);
    formData.append("price", course.price);
    formData.append("description", course.description);
    formData.append("image", image);

    const res = await fetch("http://localhost/api/mginfo/add_course.php", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Added ✅");
      fetchCourses();

      setCourse({
        title: "",
        category: "",
        price: "",
        description: "",
      });
      setImage(null);
      setPreview(null);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    await fetch("http://localhost/api/mginfo/delete_course.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchCourses();
  };

  // EDIT
  const handleEdit = (item) => {
    setEditData(item);
  };

  // EDIT IMAGE
  const handleEditImage = (e) => {
    const file = e.target.files[0];
    setEditImage(file);
  };

  // UPDATE
  const handleUpdate = async () => {
    const formData = new FormData();

    formData.append("id", editData.id);
    formData.append("title", editData.title);
    formData.append("category", editData.category);
    formData.append("price", editData.price);
    formData.append("description", editData.description);

    if (editImage) {
      formData.append("image", editImage);
    }

    const res = await fetch("http://localhost/api/mginfo/update_course.php", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Updated ✅");
      setEditData(null);
      setEditImage(null);
      fetchCourses();
    }
  };

  return (
    <div className="container py-4">

      {/* ADD */}
      <div className="card p-4 shadow mb-4">
        <h4>Add Course</h4>

        <form onSubmit={handleSubmit}>
          <input name="title" className="form-control mb-2" value={course.title} onChange={handleChange} placeholder="Title" />
          <input name="category" className="form-control mb-2" value={course.category} onChange={handleChange} placeholder="Category" />
          <input name="price" className="form-control mb-2" value={course.price} onChange={handleChange} placeholder="Price" />
          <input type="file" className="form-control mb-2" onChange={handleImage} />

          {/* PREVIEW */}
          {preview && (
            <img
              src={preview}
              style={{ width: "100%", height: "200px", objectFit: "contain" }}
              className="mb-2 rounded"
            />
          )}

          <textarea name="description" className="form-control mb-2" value={course.description} onChange={handleChange} placeholder="Description" />
          <button className="btn btn-success w-100">Add Course</button>
        </form>
      </div>

      {/* LIST */}
      <div className="row">
        {courses.map((item) => (
          <div className="col-md-4 mb-3" key={item.id}>
            <div className="card shadow h-100">

              {/* IMAGE FIXED */}
              <div style={{ height: "200px", background: "#f8f9fa" }}>
                <img
                  src={IMAGE_URL + item.image}
                  alt="course"
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

              <div className="card-body">
                <h5>{item.title}</h5>
                <p>{item.category}</p>
                <p>₹ {item.price}</p>

                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT */}
      {editData && (
        <div className="card p-4 mt-4 shadow">
          <h4>Edit Course</h4>

          <input className="form-control mb-2" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
          <input className="form-control mb-2" value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} />
          <input className="form-control mb-2" value={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} />

          {/* CURRENT IMAGE */}
          <img
            src={IMAGE_URL + editData.image}
            style={{ width: "150px", height: "150px", objectFit: "contain" }}
            className="mb-2 rounded"
          />

          {/* NEW IMAGE PREVIEW */}
          {editImage && (
            <img
              src={URL.createObjectURL(editImage)}
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
              className="mb-2 rounded"
            />
          )}

          <input type="file" className="form-control mb-2" onChange={handleEditImage} />

          <textarea className="form-control mb-2" value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />

          <button className="btn btn-primary me-2" onClick={handleUpdate}>Update</button>
          <button className="btn btn-secondary" onClick={() => setEditData(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AddCourses;
