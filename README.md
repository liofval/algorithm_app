# Algorithm Visualizer

An interactive web application designed to help users learn and understand various computer science algorithms through visualization and AI-generated explanations.

![Algorithm Visualizer Screenshot](https://storage.googleapis.com/gemini-marc-resources/project-screenshots/algorithm-visualizer-screenshot.png)

## ✨ Features

- **Interactive Algorithm Visualization:** Watch algorithms work step-by-step with real-time visual feedback.
- **AI-Powered Explanations:** Leverages Google's Genkit framework to generate clear and concise descriptions for each algorithm, tailored for learners.
- **Modern UI/UX:** Built with Next.js, shadcn/ui, and Tailwind CSS for a responsive and intuitive user experience.
- **Component-Based Architecture:** Easily extendable with new algorithms and visualization components. (Currently features Bubble Sort).
- **Firebase Integration:** Ready for backend features like user authentication and data persistence.

## 🚀 Technologies Used

- **Frontend:** [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI:** [Genkit (Google)](https://firebase.google.com/docs/genkit)
- **Backend:** [Firebase](https://firebase.google.com/) (Firestore, Auth)

## 📦 Getting Started

Follow these steps to get a local copy of the project up and running for development.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/algorithm-visualizer.git
    cd algorithm-visualizer
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up Firebase:**
    - Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - In your project settings, add a new Web App.
    - Copy the Firebase configuration object.
    - Create a new file `src/firebase/config.ts` and paste your configuration, exporting the `firebaseConfig` object. It should look something like this:

    ```typescript
    // src/firebase/config.ts
    export const firebaseConfig = {
      apiKey: "AIza...",
      authDomain: "your-project-id.firebaseapp.com",
      projectId: "your-project-id",
      storageBucket: "your-project-id.appspot.com",
      messagingSenderId: "...",
      appId: "..."
    };
    ```
    *Note: The current implementation uses a placeholder config. For full functionality, you must use your own.*


### Running the Application

Execute the following command to start the development server:

```sh
npm run dev
```

The application will be available at `http://localhost:9002`.

## Project Structure

The codebase is organized into several key directories:

- `src/app/`: Contains the main application pages and routing logic (Next.js App Router).
- `src/components/`: Shared React components, including UI elements (`ui/`) and the core visualizer components (`algorithm-visualizer/`).
- `src/ai/`: Holds the Genkit AI flows, including the logic for generating algorithm descriptions.
- `src/firebase/`: Firebase configuration, providers, and custom hooks for interacting with Firestore.
- `src/hooks/`: Custom React hooks for algorithm logic (e.g., `use-bubble-sort.ts`).
- `src/lib/`: Utility functions, type definitions, and shared data.

## 🤝 Contributing

Contributions are welcome! If you have a suggestion or want to add a new algorithm, please fork the repository and open a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/NewAlgorithm`)
3.  Commit your Changes (`git commit -m 'feat: Add NewAlgorithm'`)
4.  Push to the Branch (`git push origin feature/NewAlgorithm`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License.