# Algorithm Visualizer

An interactive web application designed to help users learn and understand various computer science algorithms by assembling and visualizing them.

![Algorithm Visualizer Screenshot](https://storage.googleapis.com/gemini-marc-resources/project-screenshots/algorithm-visualizer-screenshot.png)

## ✨ Features

- **Interactive Algorithm Assembly:** Build algorithms by dragging, dropping, and indenting code blocks.
- **Step-by-Step Visualization:** Watch your assembled algorithm work in real-time with visual feedback.
- **Multiple Algorithms:** Supports multiple sorting algorithms, served from a backend API.
  - Bubble Sort
  - Selection Sort
- **Modern UI/UX:** Built with Next.js, shadcn/ui, and Tailwind CSS for a responsive and intuitive user experience.
- **Component-Based Architecture:** Easily extendable with new algorithms and visualization components.
- **Firebase Integration:** Ready for backend features like user authentication and data persistence (Note: Core algorithm data is served by the Go backend).

## 🚀 Technologies Used

- **Frontend:** [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Backend:** [Go](https://go.dev/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Additional Services:** [Firebase](https://firebase.google.com/) (for potential future use like Auth)

## 📦 Getting Started

Follow these steps to get a local copy of the project up and running for development. This project consists of a Next.js frontend and a Go backend, which must be run concurrently.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Go](https://go.dev/doc/install) (v1.22 or later recommended)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/algorithm-visualizer.git
    cd algorithm-visualizer
    ```

2.  **Install Frontend Dependencies:**
    ```sh
    npm install
    ```

3.  **(Optional) Set up Firebase:**
    - The core application functionality does not require Firebase, as algorithm data is served by the local Go backend.
    - To enable potential future features like user login, create a Firebase project and place your configuration in `src/firebase/config.ts`.

### Running the Application

You need to run two processes in separate terminal windows.

1.  **Run the Backend Server (Go):**
    ```sh
    # From the project root directory
    go run backend/main.go
    ```
    The backend API will be available at `http://localhost:8080`.

2.  **Run the Frontend Server (Next.js):**
    ```sh
    # From the project root directory
    npm run dev
    ```
    The frontend application will be available at `http://localhost:9002`.

## Backend Architecture

The backend is a lightweight, standard Go web server built using only the `net/http` package. It serves as a simple REST API to provide the frontend with algorithm and code block data.

- **Data Source:** All data is hardcoded into slices within the `backend/data/data.go` file, acting as an in-memory database. There is no external database dependency.
- **Routing:** The server uses an `http.NewServeMux()` to define routes in `backend/main.go`. It exposes the following endpoints:
    - `GET /api/algorithms`: Returns a list of all available algorithms.
    - `GET /api/algorithms/{slug}`: Returns a specific algorithm and its associated code blocks.
- **Handlers:** Request logic is contained in the `backend/handlers/` directory. Handlers are responsible for finding the requested data in the in-memory slices and encoding it as JSON.
- **CORS:** A simple middleware is included to handle Cross-Origin Resource Sharing (CORS) to allow requests from the frontend.

## Project Structure

The codebase is organized into several key directories:

- `src/`: Contains the frontend Next.js application.
  - `app/`: Main application pages and routing (App Router).
  - `components/`: Shared React components.
  - `firebase/`: Firebase configuration and providers.
  - `hooks/`: Custom React hooks for algorithm logic.
  - `lib/`: Utility functions, types, and the API client (`api.ts`).
- `backend/`: Contains the backend Go application.
  - `data/`: In-memory data source.
  - `handlers/`: API request handlers.
  - `models/`: Go struct definitions.
  - `main.go`: The main entry point for the backend server.

## 🤝 Contributing

Contributions are welcome! If you have a suggestion or want to add a new algorithm, please fork the repository and open a pull request.

## 📄 License

Distributed under the MIT License.