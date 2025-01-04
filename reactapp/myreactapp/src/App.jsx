// import React, { useState, useEffect } from "react";

// import Footer from "./Footer.jsx";
// import Header from "./Header.jsx";

// function App() {
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);

//   // Fetch data from the backend
//   useEffect(() => {
//     fetch("http://localhost:8081/user") // Replace with your backend endpoint
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setUserData(data);
//       })
//       .catch((error) => {
//         setError(error.message);
//       });
//   }, []); 

//   return (
//     <>
//       <Header />
//       <div style={{ padding: "20px" }}>
//         <h1>User Data</h1>
//         {error && <p style={{ color: "red" }}>Error: {error}</p>}
//         {userData ? (
//           <pre>{JSON.stringify(userData, null, 2)}</pre> 
//         ) : (
//           <p>Loading...</p> 
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", category: "", price: "" });
  const [editId, setEditId] = useState(null);

  // Fetch all products
  useEffect(() => {
    fetch("http://localhost:8081/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update product
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editId
      ? `http://localhost:8081/product/${editId}`
      : "http://localhost:8081/product";
    const method = editId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((message) => {
        alert(message);
        setFormData({ name: "", category: "", price: "" });
        setEditId(null);
        fetch("http://localhost:8081/products")
          .then((res) => res.json())
          .then((data) => setProducts(data));
      })
      .catch((err) => console.error(err));
  };

  // Delete product
  const handleDelete = (id) => {
    fetch(`http://localhost:8081/product/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((message) => {
        alert(message);
        setProducts((prev) => prev.filter((product) => product.id !== id));
      })
      .catch((err) => console.error(err));
  };

  // Edit product
  const handleEdit = (product) => {
    setFormData({ name: product.name, category: product.category, price: product.price });
    setEditId(product.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>CRUD App for Products</h1>

      {}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      {}
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}              {product.category}     ₹{product.price}
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
