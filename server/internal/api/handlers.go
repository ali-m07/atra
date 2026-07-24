package api

import (
	"encoding/json"
	"net/http"

	"github.com/atra-futures/atra/internal/content"
	"github.com/go-chi/chi/v5"
)

func Register(r chi.Router) {
	r.Get("/health", health)
	r.Get("/meta", meta)
	r.Get("/pages/{slug}", page)
}

func health(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok", "service": "atra"})
}

func langFrom(r *http.Request) content.Lang {
	return content.ParseLang(r.URL.Query().Get("lang"))
}

func meta(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, content.Meta(langFrom(r)))
}

func page(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")
	lang := langFrom(r)
	var page content.Page
	switch slug {
	case "philosophy":
		page = content.Philosophy(lang)
	case "methodology":
		page = content.Methodology(lang)
	case "whitepaper":
		page = content.Whitepaper(lang)
	default:
		http.Error(w, "page not found", http.StatusNotFound)
		return
	}
	writeJSON(w, http.StatusOK, page)
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}
