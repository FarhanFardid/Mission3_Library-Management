# Library Management System (Express js ; TypeScript ; MongoDB with Mongoose)

A backend REST API for managing books and borrow records in a library. Built with **Express**, **TypeScript**, **MongoDB**, and **Mongoose**, it supports full CRUD operations, business logic enforcement, schema validation, aggregation etc.

---

## Features

- 1. **Book Management**: Create, Read, Update, Delete books.
- 2. **Borrow Books**: Borrow available books with stock tracking.
- 3. **Borrow Summary**: View summary using MongoDB Aggregation.
- 4. **Business Logic**: Auto toggle book availability based on copies.
- 5. **Validation**: Proper Mongoose schema validation with error messages.
- 6. **Mongoose Middleware**: `pre` and `post` hooks for borrow model.
- 7. **Static Methods**: Book model method to manage borrow logic.
- 8. **Filtering & Sorting**: Query books by genre and sort dynamically.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: MongoDB (with Mongoose)
- **Tools**: ts-node-dev, Postman

## Setup Instructions
- git clone https://github.com/FarhanFardid/Mission3_Library-Management
- cd library-management
-npm install

## Run in Dev Mode
- npm run dev