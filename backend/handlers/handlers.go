package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/mei/algorithm_app/backend/data"
	"github.com/mei/algorithm_app/backend/models"
)

func GetAlgorithms(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(data.Algorithms)
}

func GetAlgorithm(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	slug := r.PathValue("slug")
	if slug == "" {
		http.Error(w, "slug is required", http.StatusBadRequest)
		return
	}

	algorithm := data.GetAlgorithmByID(slug)
	if algorithm == nil {
		http.Error(w, "algorithm not found", http.StatusNotFound)
		return
	}

	codeBlocks := data.GetCodeBlocksByAlgorithmID(slug)

	response := models.AlgorithmWithBlocks{
		Algorithm:  *algorithm,
		CodeBlocks: codeBlocks,
	}

	json.NewEncoder(w).Encode(response)
}

func GetCodeBlocks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	algorithmID := r.URL.Query().Get("algorithmId")
	if algorithmID != "" {
		blocks := data.GetCodeBlocksByAlgorithmID(algorithmID)
		json.NewEncoder(w).Encode(blocks)
		return
	}

	json.NewEncoder(w).Encode(data.CodeBlocks)
}

func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
