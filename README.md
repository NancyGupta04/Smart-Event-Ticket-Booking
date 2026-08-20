# Smart Event Ticket Booking API

A lightweight backend API for a stadium concert ticket booking system. Data is stored in a local JSON file.

## Requirements

- Node.js (v16 or higher)
- npm

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Smart-Event-Ticket-Booking
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Start the Server

```bash
npm start
```

The server runs at `http://localhost:3000`.

## API Endpoints

### GET /event-status

Returns the current available seats and all bookings.

**Request:**
```bash
curl http://localhost:3000/event-status
```

**Response (200 OK):**
```json
{
  "availableSeats": 50,
  "bookings": []
}
```

### POST /book-ticket

Books tickets for a customer.

**Request:**
```bash
curl -X POST http://localhost:3000/book-ticket \
  -H "Content-Type: application/json" \
  -d '{"customerName": "Rahul", "seatsRequested": 3}'
```

**Response (201 Created):**
```json
{
  "message": "Booking successful",
  "booking": {
    "bookingId": "BOOK-1787229394229",
    "customerName": "Rahul",
    "seatsRequested": 3,
    "timestamp": "2026-08-20T12:36:34.229Z"
  }
}
```

**Error Responses:**

| Status | Cause |
|--------|-------|
| 400 | Missing or invalid `customerName` |
| 400 | Missing or invalid `seatsRequested` |
| 400 | More seats requested than available |
| 500 | Server or file read/write error |

## How to Test

1. Start the server with `npm start`
2. Open a new terminal window
3. Run the curl commands above, or use Postman
4. Check `event.json` to see saved bookings
