# Job Positions

This repository contains two projects:

- **Backend**: Built with .NET 8, SQLite, Entity Framework Core, and SignalR.
- **Frontend**: Built with React 19, TailwindCSS, Axios, and ShadCN/UI.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Environment Variables

- **Frontend**: Uses a `.env` file located in the `frontend` directory to manage environment-specific variables.
- **Backend**: Uses default environment variables already configured in the `docker-compose.yml` and the application settings.

## 🐳 Running the Application

To start both frontend and backend containers:

```bash
docker-compose up --build
```

## 🌐 Services

Once the containers are running:

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend**: [http://localhost:8080](http://localhost:8080)

> ⚙️ Backend migrations and seed data are applied automatically at startup.

## ✅ Running Tests

### Front-end Tests

1. Open a terminal and navigate to the `frontend` directory:

   ```bash
   cd job-positions-frontend
   ```

2. Run the tests using:

   ```bash
   npm test
   ```

### Back-end Tests

1. Open a terminal and navigate to the `backend` directory:

   ```bash
   cd JobPositions-backend
   ```

2. Run the tests using:

   ```bash
   dotnet test
   ```
