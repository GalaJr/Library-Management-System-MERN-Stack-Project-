
# 📚 Library Management System (MERN Capstone Project)

A full-stack web application that allows users to manage a library of books — track availability, check books in and out, and add or remove titles. Built using the **MERN stack** as part of the **CS 3320 Capstone Project** at Texas State University.

---

## 🚀 Features

- 🔍 List all books with detailed metadata
- 📗 Filter books by availability (available vs. checked out)
- 📥 Check out books (with user name and due date)
- 📤 Check in books (reset status and return to available list)
- ➕ Add new books to the library
- ❌ Delete books from the collection
- ⚛️ React-based frontend with real-time UI updates
- 🌐 RESTful API powered by Express and MongoDB
- 🔒 CORS support and secure MongoDB access

---

## 🧱 Tech Stack

| Layer        | Technology                        |
| ------------ | ---------------------------------- |
| Frontend     | React (with Hooks and Components) |
| Backend      | Node.js, Express.js               |
| Database     | MongoDB Atlas (Cloud NoSQL)       |
| Testing      | Postman, Manual UI Testing        |
| UI           | HTML5, CSS3                       |

---

## 📂 Project Structure

```
📁 backend/
    └── bookRESTServer_mongo.js     # Express + MongoDB backend server
    └── seedBooks.js                # Initialization script (10 books)

📁 frontend/
    └── reactAssignment.html        # React frontend interface
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB Atlas account (or local MongoDB)
- Web browser

---

### ⚙️ Backend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/library-management-system.git
   cd library-management-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up MongoDB**
   - Create a new cluster and database (`LibraryDBCapstone`) in [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Whitelist your IP or use `0.0.0.0/0` for development
   - Replace `<username>` and `<password>` in `bookRESTServer_mongo.js` with your actual credentials

4. **Initialize with 10 Books**
   ```bash
   node seedBooks.js
   ```

5. **Start the Server**
   ```bash
   node bookRESTServer_mongo.js
   ```

---

### ⚛️ Frontend Setup

1. Open `reactAssignment.html` in your web browser

2. Ensure the backend server is running at:
   ```
   http://localhost:3000
   ```

3. The UI should now load and interact with the backend API

---

## 📌 API Endpoints

| Method | Endpoint                 | Description                  |
|--------|--------------------------|------------------------------|
| GET    | `/books`                 | Get all books                |
| GET    | `/books/available`       | Get available books only     |
| POST   | `/books`                 | Add a new book               |
| PUT    | `/books/:id/checkout`    | Check out a book             |
| PUT    | `/books/:id/checkin`     | Check in a book              |
| DELETE | `/books/:id`             | Delete a book                |

---

## 🧠 Learning Highlights

This project integrated concepts from previous course assignments:
- **MongoDB**: Data modeling, seeding, querying, and security (IP whitelisting, credentials)
- **Node.js & Express**: API creation, routing, and JSON handling
- **React**: UI component structure, state management with Hooks, and event handling
- **CORS & Integration**: Cross-origin requests between frontend and backend
- **API Testing**: Using Postman to validate routes and handle edge cases

---

## 👨‍💻 Author

**Galavardino Sousa**  
B.S. in Computer Science | Texas State University  
Capstone Project – CS 3320, Spring 2025

---

## 📃 License

This project is for educational purposes only.
