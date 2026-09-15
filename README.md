# Movie Review

A full-stack movie review application built as a learning project to study and practice **TypeScript, Next.js, React, and full-stack web development**.

The application provides user authentication and allows users to create, view, update, and delete movie reviews.

## Features

* User registration and authentication
* Secure password hashing and JWT-based authentication
* Create, read, update, and delete movie reviews
* Persistent data storage using SQLite
* Full-stack architecture with a Next.js frontend and Express backend
* TypeScript across both frontend and backend

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express
* TypeScript
* SQLite
* JWT
* bcrypt

## Architecture

The project is organized into two independent applications:

```text
Movie-Review/
├── movie-review-frontend/      # Next.js frontend
└── movie-review-backend-express/ # Express REST API
```

The frontend communicates with the backend through HTTP APIs. The backend is responsible for authentication, business logic, and persistence.

## Running Locally

### Prerequisites

* Node.js
* npm

### Backend

```bash
cd movie-review-backend-express
npm install
npm run dev
```

### Frontend

In another terminal:

```bash
cd movie-review-frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Project Goals

This project was created primarily as a hands-on learning experience, with a focus on:

* Modern React and Next.js development
* TypeScript
* Full-stack application architecture
* REST API development
* Authentication and authorization
* Database integration
* Separation between frontend and backend responsibilities

## Status

This is an experimental learning project and is still evolving as I explore modern full-stack development practices.
