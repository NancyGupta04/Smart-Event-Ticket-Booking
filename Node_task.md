

Project Overview: Smart Event Ticket Booking API
The Scenario: You need to build a lightweight backend API for a stadium concert
ticketing platform. The system will read from and write to a local JSON file to keep track
of available seats and reservations.
## Initial Data Setup
Create a file named event.json in your root folder. Initialize it with this exact JSON
structure:
json
## {
"totalSeats": 50,
"availableSeats": 50,
## "bookings": []
## }

API Endpoints to Implement
You need to build an Express server running on port 3000 with the following two routes:
- GET /event-status
- Description: Fetches current stadium metrics.
- Response: Returns the current count of availableSeats and the entire list of
bookings from event.json.
- Status Code: 200 OK
- POST /book-ticket
- Description: Books tickets for a customer if seats are available.
- Expected JSON Payload:
json
## {
"customerName": "Rahul",
"seatsRequested": 3
## }


## • Required Logic Flows:
o Read the current data from event.json.
o Verify if the stadium has enough availableSeats left to fulfill the request.
o If successful: Reduce the availableSeats count by the requested
amount, generate a unique booking ID (e.g., using
Date.now().toString()), capture the booking timestamp, add the new
booking to the array, and save the updated data back to event.json.
o Response: Return a 201 Created status along with the details of the newly
created booking.

## Technical Constraints
- Asynchronous Flow: You must use asynchronous file operations
(fs.promises.readFile and fs.promises.writeFile) to handle file data. Do not
use synchronous methods (readFileSync).
- Input Validation & Logic Checks: Ensure your endpoint handles invalid inputs,
bad data types, or requests that exceed stadium capacity gracefully.
- Error Handling: Protect your application routes using try/catch blocks so that
unexpected errors do not crash your server process.

## Submission Guidelines
- Please upload your code to a public GitHub repository or send it as a ZIP file
(excluding the node_modules folder).
- Include a brief README.md file explaining how to run your server locally and how to
test the endpoints.
- Deadline: Please submit your solution within 24-48 hours of receiving this email.
We are looking for clean, organized code that demonstrates solid logical thinking
regarding edge cases. If you have any questions, feel free to reach out.



