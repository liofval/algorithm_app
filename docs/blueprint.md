# **App Name**: Algo Assembler

## Core Features:

- Algorithm Selection: Display a list of available algorithms (e.g., Bubble Sort, Linear Search) from the `algorithms` collection in Firestore, allowing users to select one to learn.
- Code Block Palette: Display available code blocks (up to 10) for the selected algorithm from the `blocks` collection. These blocks are used to assemble the algorithm's logic.
- Block Arrangement: Enable users to add, remove, and reorder code blocks in the assembly area via drag-and-drop or tap interactions to construct the algorithm.
- Logic Execution Engine: Interpret the arrangement of `logic_id` from code blocks, running the algorithm accordingly.
- Data Visualization: Animate the data's behavior when the logic is stepped through in execution. For sorting, elements of the array are highlighted, and the exchanges that occur are displayed as animations.
- Speed adjustment: Offer 'slow', 'normal', and 'fast' adjustments for playback speed.
- Save and Load Progress: Save the current state of the assembled algorithm and user's progress in Firestore, allowing them to resume later.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) to convey stability and intelligence, reflecting the logical nature of algorithms.
- Background color: Light blue-gray (#ECEFF1), providing a subtle backdrop that doesn't distract from the code and visualizations.
- Accent color: Soft amber (#FFB300) is used to highlight actionable items, or elements under consideration by an algorithm. This generates warmth and visibility.
- Headline font: 'Space Grotesk' sans-serif font for the headlines; body font: 'Inter' sans-serif, for clarity of descriptions and instructions.
- Code font: 'Source Code Pro' monospaced font for displaying code snippets in the blocks.
- Use clear, minimalist icons for actions like 'run,' 'pause,' and 'reset,' with a focus on providing immediate understanding.
- A split-screen layout, clearly separating the assembly area (left) from the visualization area (right), providing clear functionality for the users.
- Smooth transitions and highlights for data movements during algorithm execution. Subtle animations make data changes understandable.