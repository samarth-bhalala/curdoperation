const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON requests

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'curd'
});

// Create
app.post('/product', (req, res) => {
  const { name, category, price } = req.body;
  const sql = 'INSERT INTO product (name, category, price) VALUES (?, ?, ?)';
  db.query(sql, [name, category, price], (err, data) => {
    if (err) return res.json(err);
    return res.json("Product added successfully!");
  });
});

// Read
app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM product';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Update
app.put('/product/:id', (req, res) => {
  const { id } = req.params;
  const { name, category, price } = req.body;
  const sql = 'UPDATE product SET name = ?, category = ?, price = ? WHERE id = ?';
  db.query(sql, [name, category, price, id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Product updated successfully!");
  });
});

// Delete
app.delete('/product/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM product WHERE id = ?';
  db.query(sql, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Product deleted successfully!");
  });
});

app.listen(8081, () => {
  console.log("Server running on port 8081");
});
