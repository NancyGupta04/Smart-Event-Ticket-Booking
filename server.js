const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

// GET / — health check route
app.get("/", (req, res) => {
  res.json({ message: "Smart Event Ticket Booking API is running" });
});

// GET /event-status — returns available seats and bookings
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

// POST /book-ticket — books tickets for a customer
app.post("/book-ticket", async (req, res) => {
  try {
    // Make sure request body was parsed
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    const { customerName, seatsRequested } = req.body;

    // Read current event data
    const data = await fs.promises.readFile("event.json", "utf-8");
    const event = JSON.parse(data);

    // Validate customerName
    if (!customerName) {
      return res.status(400).json({ error: "customerName is required" });
    }

    if (typeof customerName !== "string") {
      return res.status(400).json({ error: "customerName must be a string" });
    }

    if (customerName.trim().length === 0) {
      return res.status(400).json({ error: "customerName cannot be empty" });
    }

    // Validate seatsRequested
    if (seatsRequested === undefined || seatsRequested === null) {
      return res.status(400).json({ error: "seatsRequested is required" });
    }

    if (typeof seatsRequested !== "number") {
      return res.status(400).json({ error: "seatsRequested must be a number" });
    }

    if (!Number.isInteger(seatsRequested)) {
      return res.status(400).json({ error: "seatsRequested must be a whole number" });
    }

    if (seatsRequested <= 0) {
      return res.status(400).json({ error: "seatsRequested must be at least 1" });
    }

    if (seatsRequested > event.availableSeats) {
      return res.status(400).json({ error: "Not enough seats available" });
    }

    // Generate a unique booking ID using timestamp
    const bookingId = "BOOK-" + Date.now();

    // Create the booking object
    const booking = {
      bookingId,
      customerName: customerName.trim(),
      seatsRequested,
      timestamp: new Date().toISOString(),
    };

    // Update available seats and add booking
    event.availableSeats -= seatsRequested;
    event.bookings.push(booking);

    // Save updated data back to event.json
    await fs.promises.writeFile("event.json", JSON.stringify(event, null, 2));

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to book ticket" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
