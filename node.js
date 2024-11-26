const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../")));

// Mock database file path
const databasePath = path.join(__dirname, "../data/database.json");

// Fetch all produce data
app.get("/api/produce", (req, res) => {
    const data = JSON.parse(fs.readFileSync(databasePath, "utf8"));
    res.json(data);
});

// Add new produce
app.post("/api/produce", (req, res) => {
    const data = JSON.parse(fs.readFileSync(databasePath, "utf8"));
    data.push(req.body);
    fs.writeFileSync(databasePath, JSON.stringify(data, null, 2), "utf8");
    res.status(201).send("Produce added successfully.");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
