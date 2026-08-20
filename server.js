const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;


app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Smart Event Ticket Booking API is running" });
});


app.get("/event-status", async (req, res) => {
  try {
    const data = await fs.promises.readFile("event.json", "utf-8");
    const event = JSON.parse(data);

    res.status(200).json({
      availableSeats: event.availableSeats,
      bookings: event.bookings,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to read event data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
