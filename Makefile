.PHONY: api web build serve deploy-arvan

api:
	cd server && go run ./cmd/atra

web:
	cd web && npm run dev

build:
	cd web && npm run build
	cd server && go build -o atra ./cmd/atra

serve: build
	cd server && ATRA_STATIC=../web/dist ./atra

deploy-arvan:
	powershell -ExecutionPolicy Bypass -File scripts/deploy-arvan.ps1
