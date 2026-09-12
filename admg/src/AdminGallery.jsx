import React, { useState, useEffect } from "react";

const AdminGallery = () => {

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState([]);
  const [editId, setEditId] = useState(null);

  // ✅ FETCH DATA
  const fetchImages = () => {
    fetch("http://localhost/api/mginfo/get_images.php")
      .then(res => res.json())
      .then(data => setImages(data));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ✅ PREVIEW
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ UPLOAD / UPDATE
  const handleUpload = async () => {

    const formData = new FormData();
    if (image) formData.append("image", image); // optional in edit
    formData.append("title", title);
    formData.append("description", description);

    if (editId) {
      formData.append("id", editId);
    }

    const res = await fetch("http://localhost/api/mginfo/upload_image.php", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (data.success) {
      alert(editId ? "✅ Updated" : "✅ Uploaded");

      setImage(null);
      setPreview(null);
      setTitle("");
      setDescription("");
      setEditId(null);

      fetchImages();
    } else {
      alert("❌ Failed");
    }
  };

  // ✅ EDIT
  const handleEdit = (item) => {
    setEditId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setPreview(`http://localhost/api/mginfo/uploads/${item.image}`);
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;

    const res = await fetch(
      `http://localhost/api/mginfo/delete_image.php?id=${id}`
    );

    const data = await res.json();

    if (data.success) {
      alert("🗑 Deleted");
      fetchImages();
    } else {
      alert("❌ Failed");
    }
  };

  return (
    <div className="container py-5">

      <h3>{editId ? "Edit Image" : "Upload Gallery Image"}</h3>

      {/* IMAGE INPUT */}
      <input
        type="file"
        className="form-control mb-3"
        onChange={handleImageChange}
      />

      {/* PREVIEW */}
      {preview && (
        <img
          src={preview}
          alt=""
          style={{ height: "150px", marginBottom: "10px" }}
        />
      )}

      {/* TITLE */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Image Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* DESCRIPTION */}
      <textarea
        className="form-control mb-3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button className="btn btn-primary mb-4" onClick={handleUpload}>
        {editId ? "Update" : "Upload"}
      </button>

      {/* IMAGE LIST */}
      <div className="row">
        {images.map((item) => (
          <div className="col-md-3 mb-4" key={item.id}>
            <div className="card">

              <img
                src={`http://localhost/api/mginfo/uploads/${item.image}`}
                alt=""
                style={{ height: "150px", objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h6>{item.title}</h6>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminGallery;