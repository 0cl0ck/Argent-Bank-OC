# Argent Bank Frontend

This repository contains the code needed to run the frontend for Argent Bank, a new banking application designed to help users manage their accounts and profiles.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js v12](https://nodejs.org/en/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

Make sure to verify the installation of these prerequisites by running the following commands:

```bash
# Check Node.js version
node --version

# Check MongoDB version
mongo --version
```

### Backend Setup

To set up the backend server, follow these steps:

1. Fork the backend repository ( https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API ).
2. Clone the repository to your local machine.
3. Open a terminal in the cloned project directory.
4. Run the following commands:

```bash
# Install dependencies
npm install

# Start the MongoDB server
mongod --port 3001

# Start the local development server
npm run dev:server

# Populate the database with initial data
npm run populate-db
```

Your backend server should now be running at http://localhost:3001, with two users populated in your MongoDB database.

## Populated Database Data

Once you run the `populate-db` script, you should have two users in your database:

### Tony Stark

- First Name: `Tony`
- Last Name: `Stark`
- Email: `tony@stark.com`
- Password: `password123`

### Steve Rogers

- First Name: `Steve`,
- Last Name: `Rogers`,
- Email: `steve@rogers.com`,
- Password: `password456`

### Frontend Setup

To set up the frontend application, follow these steps:

1. Fork this frontend repository.
2. Clone the repository to your local machine.
3. Open a terminal in the cloned project directory.
4. Run the following command to install the necessary dependencies:

```bash
npm install
```

5. Start the frontend development server:

```bash
npm run dev
```

Your frontend application should now be running at http://localhost:5173.

### Development Workflow

Ensure that the MongoDB server is running on port 3001. If not, you can start it manually by running:

```bash
mongod --port 3001
```

## Project Overview

This project is divided into two main phases:

### Phase 1: User Authentication

- Users can visit the homepage.
- Users can log into the system.
- Users can log out of the system.
- Users can view their own profile information after successfully logging in.
- Users can edit their profile and save the data to the database.

### Phase 2: Transactions (Planned)

- Users will be able to view all their transactions for the current month, grouped by account.
- Users will be able to view the details of a transaction.
- Users will be able to add, modify, or delete transaction information.

## API Documentation

For detailed information on the API endpoints, you can visit the Swagger documentation provided by the backend server at:

http://localhost:3001/api-docs
