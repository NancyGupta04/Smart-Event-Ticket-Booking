const express = require("express");

const app = express();
const PORT = 3000;

// Parse incoming JSON requests
app.use(express.json());

// Basic health check route to confirm the server is running
app.get("/", (req, res) => {
  res.json({ message: "Smart Event Ticket Booking API is running" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
