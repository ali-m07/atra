package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/atra-futures/atra/internal/content"
)

func main() {
	outDir := filepath.Join("..", "web", "public", "content")
	if len(os.Args) > 1 {
		outDir = os.Args[1]
	}

	langs := []content.Lang{content.LangEN, content.LangFA}
	for _, lang := range langs {
		langDir := filepath.Join(outDir, string(lang))
		pagesDir := filepath.Join(langDir, "pages")
		if err := os.MkdirAll(pagesDir, 0o755); err != nil {
			fatal(err)
		}

		if err := writeJSON(filepath.Join(langDir, "meta.json"), content.Meta(lang)); err != nil {
			fatal(err)
		}

		pages := map[string]content.Page{
			"philosophy":  content.Philosophy(lang),
			"methodology": content.Methodology(lang),
			"whitepaper":  content.Whitepaper(lang),
		}
		for slug, page := range pages {
			if err := writeJSON(filepath.Join(pagesDir, slug+".json"), page); err != nil {
				fatal(err)
			}
		}
	}

	fmt.Printf("exported static content to %s\n", outDir)
}

func writeJSON(path string, v any) error {
	f, err := os.Create(path)
	if err != nil {
		return err
	}
	defer f.Close()

	enc := json.NewEncoder(f)
	enc.SetEscapeHTML(false)
	enc.SetIndent("", "  ")
	return enc.Encode(v)
}

func fatal(err error) {
	fmt.Fprintf(os.Stderr, "exportcontent: %v\n", err)
	os.Exit(1)
}
