.PHONY: api web build serve

api:
	cd server && go run ./cmd/atra

web:
	cd web && npm run dev

build:
	cd web && npm run build
	cd server && go build -o atra ./cmd/atra

serve: build
	cd server && ATRA_STATIC=../web/dist ./atra
