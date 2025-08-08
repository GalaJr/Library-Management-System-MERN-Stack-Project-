const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const { body, validationResult } = require("express-validator");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// MongoDB Connection
const uri = "mongodb+srv://gls85:Lenniejr96!@cluster0.ynspw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
let booksCollection;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    const db = client.db("cluster1"); 
    booksCollection = db.collection("capstone");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

// Routes
// 1. List all books
app.get("/books", async (req, res) => {
  try {
    const books = await booksCollection.find().toArray();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// 2. List available books
app.get("/books/available", async (req, res) => {
  try {
    const books = await booksCollection.find({ status: "available" }).toArray();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch available books" });
  }
});

// 3. Check out a book
app.put("/books/:id/checkout", async (req, res) => {
  const { id } = req.params;
  const { checkedOutBy, dueDate } = req.body;

  try {
    const result = await booksCollection.updateOne(
      { _id: new ObjectId(id), status: "available" },
      { $set: { status: "unavailable", checkedOutBy, dueDate } }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ error: "Book not found or already checked out" });
    } else {
      res.json({ message: "Book checked out successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to check out book" });
  }
});

// 4. Check in a book
app.put("/books/:id/checkin", async (req, res) => {
  const { id } = req.params;

  try {
      const result = await booksCollection.updateOne(
          { _id: new ObjectId(id), status: "unavailable" }, // Ensure the `status` matches
          { $set: { status: "available", checkedOutBy: null, dueDate: null } }
      );

      if (result.matchedCount === 0) {
          res.status(404).json({ error: "Book not found or already checked in" });
      } else {
          res.json({ message: "Book checked in successfully" });
      }
  } catch (error) {
      res.status(500).json({ error: "Failed to check in book" });
  }
});



// 5. Add a new book
app.post("/books", async (req, res) => {
  const { title, author, publisher, isbn } = req.body;

  // Ensure the new book has a default status of "available"
  const newBook = {
      title,
      author,
      publisher,
      isbn,
      status: "available", // Default status
      checkedOutBy: null, // Default values
      dueDate: null,
  };

  try {
      const result = await booksCollection.insertOne(newBook);
      res.status(201).json({ message: "Book added successfully", id: result.insertedId });
  } catch (error) {
      console.error("Error adding book:", error);
      res.status(500).json({ error: "Failed to add book" });
  }
});

// 6. Delete a book
app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await booksCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json({ message: "Book deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
});

// Start the server
(async () => {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
})();
