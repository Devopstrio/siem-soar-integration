.PHONY: help build up down test lint migrate ingest-events detect-threats

help:
	@echo "SIEM + SOAR Integration - Management Commands"
	@echo "------------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Integration)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "ingest-events      : Simulate log/event ingestion"
	@echo "detect-threats     : Run correlation & detection engine"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/unit tests/integration
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker core
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

ingest-events:
	docker-compose exec api python scripts/ingest/sample_logs.py

detect-threats:
	docker-compose exec api python scripts/detect/analyze.py
