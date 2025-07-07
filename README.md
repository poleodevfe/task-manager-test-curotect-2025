# Full-Stack Task Manager

This is a simple full-stack application project, a "Task Manager", built as part of a technical assessment. The application allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks.

The project is fully containerized with Docker, allowing the entire environment (database, backend, frontend) to be launched with a single command.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, TypeScript, React Query, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript, Prisma
- **Database:** PostgreSQL
- **Orchestration:** Docker & Docker Compose

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://www.docker.com/products/docker-desktop/)
- Docker Compose (usually included with Docker Desktop)

**You do not need to install Node.js, pnpm, PostgreSQL, or any other dependencies on your local machine.**

### Installation & Running

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/poleodevfe/task-manager-test-curotect-2025
    cd task-manager-test-curotect-2025
    ```

2.  **Launch the containers:**
    Run the following command from the project root.
    ```bash
    docker compose up --build
    ```
    This single command will take care of:
    - Building the Docker images for the backend and frontend.
    - Starting the three containers (`db`, `backend`, `frontend`) in the correct order.
    - Installing all dependencies inside the containers.

---

## 🌐 Accessing the Application

Once the containers are up and running, you can access the services:

- **Frontend (Web Application):** [http://localhost:5173](http://localhost:5173)
- **Backend (API):** The backend is listening on port `3001` and is accessible to the frontend within Docker's network.

---

## 📝 API Endpoints

The backend API exposes the following endpoints for the `Task` resource:

| Method   | Path             | Description                   |
| :------- | :--------------- | :---------------------------- |
| `GET`    | `/api/tasks`     | Gets all tasks.               |
| `POST`   | `/api/tasks`     | Creates a new task.           |
| `GET`    | `/api/tasks/:id` | Gets a single task by its ID. |
| `PUT`    | `/api/tasks/:id` | Updates an existing task.     |
| `DELETE` | `/api/tasks/:id` | Deletes a task by its ID.     |
