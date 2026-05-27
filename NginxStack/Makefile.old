# PROJECT CONFIGURATION

# App names
APP_BACKEND := backend
APP_FRONTEND := frontend

# DockerHub repository (change username here)
DOCKER_USER := mykks32

# Image names
IMAGE_BACKEND := $(DOCKER_USER)/backend
IMAGE_FRONTEND := $(DOCKER_USER)/frontend

# Default tag (override: make release TAG=v1.0.0)
TAG := latest

# Dockerfiles
DOCKERFILE_BACKEND := docker/backend.Dockerfile
DOCKERFILE_FRONTEND := docker/frontend.Dockerfile

# Build context (project root)
CONTEXT := .

# Kubernetes path (kustomize overlay)
K8S_DEV := k8s/overlays/dev

# Kubernetes namespace
NAMESPACE := nginx-stack

# PHONY TARGETS
.PHONY: help \
	build-backend build-frontend build-all \
	tag-backend tag-frontend \
	push-backend push-frontend \
	release-backend release-frontend release-all \
	docker-up docker-down docker-logs \
	k8s-dev k8s-dev-delete \
	k8s-pods k8s-svc k8s-all \
	k8s-restart-backend k8s-restart-frontend \
	k8s-status-backend k8s-status-frontend \
	k8s-logs-backend k8s-logs-frontend \
	k8s-describe-backend k8s-describe-frontend

# HELP COMMAND
help:
	@echo "--------------------------------"
	@echo "Docker Commands"
	@echo "--------------------------------"
	@echo "make build-backend           Build backend image"
	@echo "make build-frontend          Build frontend image"
	@echo "make build-all               Build both images"
	@echo "make release-backend         Build + tag + push backend"
	@echo "make release-frontend        Build + tag + push frontend"
	@echo "make release-all             Build + tag + push both"
	@echo ""
	@echo "--------------------------------"
	@echo "Docker Compose Commands"
	@echo "--------------------------------"
	@echo "make docker-up               Start all services locally"
	@echo "make docker-down             Stop all services"
	@echo "make docker-logs             Tail logs from all services"
	@echo ""
	@echo "--------------------------------"
	@echo "Kubernetes Commands (DEV)"
	@echo "--------------------------------"
	@echo "make k8s-dev                 Deploy dev environment"
	@echo "make k8s-dev-delete          Tear down dev environment"
	@echo "make k8s-pods                List pods"
	@echo "make k8s-svc                 List services"
	@echo "make k8s-all                 Full resource overview"
	@echo "make k8s-restart-backend     Rolling restart backend"
	@echo "make k8s-restart-frontend    Rolling restart frontend"
	@echo "make k8s-status-backend      Watch backend rollout status"
	@echo "make k8s-status-frontend     Watch frontend rollout status"
	@echo "make k8s-logs-backend        Tail backend pod logs"
	@echo "make k8s-logs-frontend       Tail frontend pod logs"
	@echo "make k8s-describe-backend    Describe backend deployment"
	@echo "make k8s-describe-frontend   Describe frontend deployment"

# DOCKER - BUILD
build-backend:
	@echo "Building backend image..."
	docker build -t $(APP_BACKEND):$(TAG) -f $(DOCKERFILE_BACKEND) $(CONTEXT)

build-frontend:
	@echo "Building frontend image..."
	docker build -t $(APP_FRONTEND):$(TAG) -f $(DOCKERFILE_FRONTEND) $(CONTEXT)

build-all: build-backend build-frontend
	@echo "Both images built."

# DOCKER - TAG
tag-backend:
	@echo "Tagging backend image..."
	docker tag $(APP_BACKEND):$(TAG) $(IMAGE_BACKEND):$(TAG)

tag-frontend:
	@echo "Tagging frontend image..."
	docker tag $(APP_FRONTEND):$(TAG) $(IMAGE_FRONTEND):$(TAG)

# DOCKER - PUSH
push-backend:
	@echo "Pushing backend image..."
	docker push $(IMAGE_BACKEND):$(TAG)

push-frontend:
	@echo "Pushing frontend image..."
	docker push $(IMAGE_FRONTEND):$(TAG)

# DOCKER - FULL PIPELINE
release-backend: build-backend tag-backend push-backend
	@echo "Backend release done → $(IMAGE_BACKEND):$(TAG)"

release-frontend: build-frontend tag-frontend push-frontend
	@echo "Frontend release done → $(IMAGE_FRONTEND):$(TAG)"

release-all: release-backend release-frontend
	@echo "Full release done → $(IMAGE_BACKEND):$(TAG) + $(IMAGE_FRONTEND):$(TAG)"

# DOCKER COMPOSE
docker-up:
	@echo "Starting services with Docker Compose..."
	docker compose up --build -d

docker-down:
	@echo "Stopping services..."
	docker compose down

docker-logs:
	docker compose logs -f

# KUBERNETES (KUSTOMIZE DEV)
k8s-dev:
	@echo "Deploying Kubernetes dev environment..."
	kubectl apply -k $(K8S_DEV)

k8s-dev-delete:
	@echo "Deleting Kubernetes dev environment..."
	kubectl delete -k $(K8S_DEV) --ignore-not-found

# KUBERNETES DEBUG COMMANDS
k8s-pods:
	kubectl get pods -n $(NAMESPACE)

k8s-svc:
	kubectl get svc -n $(NAMESPACE)

k8s-all:
	kubectl get all -n $(NAMESPACE)

# KUBERNETES RESTART
k8s-restart-backend:
	kubectl rollout restart deployment $(APP_BACKEND) -n $(NAMESPACE)

k8s-restart-frontend:
	kubectl rollout restart deployment $(APP_FRONTEND) -n $(NAMESPACE)

# STATUS CHECK
k8s-status-backend:
	kubectl rollout status deployment $(APP_BACKEND) -n $(NAMESPACE)

k8s-status-frontend:
	kubectl rollout status deployment $(APP_FRONTEND) -n $(NAMESPACE)

# LOGS
k8s-logs-backend:
	kubectl logs -f deployment/$(APP_BACKEND) -n $(NAMESPACE)

k8s-logs-frontend:
	kubectl logs -f deployment/$(APP_FRONTEND) -n $(NAMESPACE)

# DESCRIBE
k8s-describe-backend:
	kubectl describe deployment $(APP_BACKEND) -n $(NAMESPACE)

k8s-describe-frontend:
	kubectl describe deployment $(APP_FRONTEND) -n $(NAMESPACE)