# 🛒 Mini E-Commerce Task (Full-Stack)

## 🎯 Project Title:
**Simple Product Catalog + Cart (Full-Stack)**

---

## 📋 Requirements (Candidate Ke Liye Instructions)

### 1. Product Catalog (Frontend – React + Bootstrap)
- React me ek page banao jo products ko card format me show kare:
  - Product Image
  - Name
  - Price
  - "Add to Cart" button
- Bootstrap grid use karke responsive design banao (mobile/tablet/desktop).

---

### 2. Backend API (Node.js OR PHP + MySQL)
- Backend me ek simple REST API banao:

| Method | Endpoint        | Description |
|--------|----------------|-------------|
| GET    | `/products`    | All products return kare (MySQL se). |
| POST   | `/cart`        | Product ko cart me add kare (MySQL table me insert/update). |
| GET    | `/cart`        | Current cart ka data return kare. |
| DELETE | `/cart/:id`    | Product ko cart se remove kare. |

---

### 3. Database (MySQL)
Candidate ko MySQL me ye **2 table** banani hogi:

#### `products` table
| id | name   | price | image_url  |
|----|--------|-------|------------|
| 1  | Shoes  | 1200  | /img1.jpg  |
| 2  | T-Shirt| 800   | /img2.jpg  |

#### `cart` table
| id | product_id | quantity |
|----|------------|----------|

---

### 4. Cart Page (React)
- Cart items **table** me dikhaye:
  - Product Name
  - Price
  - Quantity
  - Total Price (`price * quantity`)
- **Grand Total** calculate kare.
- Quantity update hone pe cart me reflect ho (API call se update ho).

---

## 🚀 How to Run Project Locally

### 1. Clone Repository
```bash
git clone https://github.com/abhiGithub302/ecomm.git

```
### 2.Setup Database (MySQL)
```
CREATE DATABASE ecomm;

USE ecommerce;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2),
  image_url VARCHAR(255)
);

INSERT INTO products (name, price, image_url) VALUES
('Shoes', 1200, '/img1.jpg'),
('T-Shirt', 800, '/img2.jpg');

CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  quantity INT,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```
### 3. Setup Backend (Node.js )
```
cd backend
npm install
node server.js
```
### 4. Setup Frontend (React)
```
cd frontend
npm install
npm start
```

