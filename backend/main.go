package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/mei/algorithm_app/backend/handlers"
)

func main() {
	mux := http.NewServeMux()

	// API routes
	mux.HandleFunc("GET /api/algorithms", handlers.GetAlgorithms)
	mux.HandleFunc("GET /api/algorithms/{slug}", handlers.GetAlgorithm)
	mux.HandleFunc("GET /api/codeblocks", handlers.GetCodeBlocks)

	// Wrap with CORS middleware
	handler := handlers.CORSMiddleware(mux)

	port := ":8080"
	fmt.Printf("Server starting on http://localhost%s\n", port)
	log.Fatal(http.ListenAndServe(port, handler))
}
