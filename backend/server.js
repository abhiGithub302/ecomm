const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Change to your MySQL user
  password: '', // Change to your MySQL password
  database: 'ecom'
});

db.connect(err => {
  if (err) console.log('DB connection error:', err);
  else console.log('DB connected');
});

// GET /products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST /cart (add or update if exists)
app.post('/cart', (req, res) => {
  const { product_id, quantity } = req.body;
  if (quantity < 1) return res.status(400).json({ error: 'Quantity must be at least 1' });

  db.query('SELECT * FROM cart WHERE product_id = ?', [product_id], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length > 0) {
      db.query('UPDATE cart SET quantity = quantity + ? WHERE product_id = ?', [quantity, product_id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Cart updated' });
      });
    } else {
      db.query('INSERT INTO cart (product_id, quantity) VALUES (?, ?)', [product_id, quantity], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Product added to cart' });
      });
    }
  });
});

// GET /cart (with joined product details)
app.get('/cart', (req, res) => {
  db.query(`
    SELECT c.id, p.name, p.price, c.quantity, (p.price * c.quantity) AS total 
    FROM cart c JOIN products p ON c.product_id = p.id
  `, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// DELETE /cart/:id
app.delete('/cart/:id', (req, res) => {
  db.query('DELETE FROM cart WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Product removed from cart' });
  });
});

// PUT /cart/:id (for updating quantity)
app.put('/cart/:id', (req, res) => {
  const { quantity } = req.body;
  if (quantity < 1) return res.status(400).json({ error: 'Quantity must be at least 1' });

  db.query('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Quantity updated' });
  });
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));