# 📚 Bookstore Management System

A full-stack **Bookstore Management System** that allows users to create, manage, and interact with blog-style book content. Users can register, log in, post blogs, comment, and manage wishlists.

---

## 🚀 Features

* 🔐 User Authentication (Register & Login)
* 📝 Create, Edit, Delete Blogs
* 💬 Comment System
* ❤️ Wishlist Feature
* 📂 Category-based Organization
* 🖼️ Image Support for Blogs
* ⏱️ Timestamp Tracking

---

## 🛠️ Tech Stack

**Frontend:**

* React.js
* Vite

**Backend:**

* Node.js
* Express.js

**Database:**

* MySQL

**Tools:**

* VS Code
* Git & GitHub
* Postman

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

bash
git clone https://github.com/Fahim183/bookstore-management.git

cd bookstore-management


---

### 2️⃣ Setup Database (MySQL)

Run the following SQL commands:

**sql**

CREATE DATABASE blog_app;

USE blog_app;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE blogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  title VARCHAR(255),
  image TEXT,
  email VARCHAR(255),
  short_description TEXT,
  detailed_description TEXT,
  category VARCHAR(100),
  userEmail VARCHAR(255),
  userImg TEXT,
  time BIGINT
);


CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  blogId INT,
  userEmail VARCHAR(255),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (blogId) REFERENCES blogs(id) ON DELETE CASCADE
);


CREATE TABLE wishlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  blogId INT,
  wishReq VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (blogId) REFERENCES blogs(id) ON DELETE CASCADE
);

---

### 3️⃣ Environment Variables

Create a `.env` file in your server folder:


--.env--

PORT=5000

DB_HOST=localhost

DB_USER=root

DB_PASS=@sqlfahim_12345

DB_NAME=blog_app

⚠️ Never share your real password publicly.

---

## ▶️ Run the Project

### Run Client

--bash--

cd Client
npm install
npm run dev


### Run Server

--bash--

cd Server
npm install
node index.js

---

## 📁 Project Structure

bookstore-management/
├── Client/        # Frontend (React)
├── Server/        # Backend (Node.js)
├── database/      # SQL setup
└── README.md

---

## 📊 Database Queries (Testing)

**sql**

SELECT * FROM blogs;

SELECT * FROM users;

SELECT * FROM comments;

SELECT * FROM wishlist;


---

## 🔒 Security Note
**sql**

ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;


---
## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Your Name**
GitHub: https://github.com/Fahim183

---

## 💡 Future Enhancements

* 📦 Book inventory system
* 🔍 Advanced search & filtering
* 🛒 Shopping cart feature
* 📱 Mobile responsiveness improvements

---

## 📌 Conclusion
This project demonstrates a complete **full-stack CRUD application** with authentication, relational database design, and user interaction features—ideal for learning and portfolio use.

---
