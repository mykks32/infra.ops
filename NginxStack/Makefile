# AWS account ID used for ECR authentication
AWS_ACCOUNT_ID := 155777995214

# AWS region where ECR repositories exist
AWS_REGION := us-east-1

# Base ECR registry URL
ECR_REGISTRY := $(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com

# Default Docker tag
TAG := latest

# Docker build context
CONTEXT := .

# -------------------------
# BACKEND CONFIG
# -------------------------

# Backend application name (local image)
APP_BACKEND := backend

# Backend ECR repository name
ECR_REPO_BACKEND := nginx-stack/backend

# Full backend image path in ECR
IMAGE_BACKEND := $(ECR_REGISTRY)/$(ECR_REPO_BACKEND)

# Backend Dockerfile path
DOCKERFILE_BACKEND := docker/backend.Dockerfile

# Backend container name
CONTAINER_BACKEND := backend

# -------------------------
# FRONTEND CONFIG
# -------------------------

# Frontend application name (local image)
APP_FRONTEND := frontend

# Frontend ECR repository name
ECR_REPO_FRONTEND := nginx-stack/frontend

# Full frontend image path in ECR
IMAGE_FRONTEND := $(ECR_REGISTRY)/$(ECR_REPO_FRONTEND)

# Frontend Dockerfile path
DOCKERFILE_FRONTEND := docker/frontend.Dockerfile

# Frontend container name
CONTAINER_FRONTEND := frontend

# -------------------------
# PHONY TARGETS
# -------------------------

# Prevent conflicts with files
.PHONY: help ecr-login verify-repos \
        build-backend tag-backend push-backend pull-backend inspect-backend describe-backend release-backend \
        run-backend stop-backend remove-backend restart-backend exec-backend shell-backend debug-backend \
        build-frontend tag-frontend push-frontend pull-frontend inspect-frontend describe-frontend release-frontend \
        run-frontend stop-frontend remove-frontend restart-frontend exec-frontend shell-frontend debug-frontend \
        list-images list-backend-images list-frontend-images clean-images

# -------------------------
# HELP
# -------------------------

# Show available commands
help:
	@echo "Backend commands:"
	@echo "  make build-backend"
	@echo "  make release-backend"
	@echo "  make run-backend"
	@echo "  make exec-backend"
	@echo "  make shell-backend"
	@echo "  make debug-backend"
	@echo ""
	@echo "Frontend commands:"
	@echo "  make build-frontend"
	@echo "  make release-frontend"
	@echo "  make run-frontend"
	@echo "  make exec-frontend"
	@echo "  make shell-frontend"
	@echo "  make debug-frontend"

# -------------------------
# AWS LOGIN
# -------------------------

# Login Docker to AWS ECR
ecr-login:
	@echo "Logging into AWS ECR..."
	aws ecr get-login-password --region $(AWS_REGION) | \
	docker login --username AWS --password-stdin $(ECR_REGISTRY)

# -------------------------
# VERIFY REPOSITORIES
# -------------------------

# Check if ECR repos exist
verify-repos:
	@echo "Checking backend repo..."
	aws ecr describe-repositories --repository-names $(ECR_REPO_BACKEND) --region $(AWS_REGION) || \
	(echo "Backend repo missing" && exit 1)

	@echo "Checking frontend repo..."
	aws ecr describe-repositories --repository-names $(ECR_REPO_FRONTEND) --region $(AWS_REGION) || \
	(echo "Frontend repo missing" && exit 1)

# -------------------------
# BACKEND COMMANDS
# -------------------------

# Build backend image
build-backend:
	docker build -t $(APP_BACKEND):$(TAG) -f $(DOCKERFILE_BACKEND) $(CONTEXT)

# Tag backend image
tag-backend:
	docker tag $(APP_BACKEND):$(TAG) $(IMAGE_BACKEND):$(TAG)

# Push backend image
push-backend:
	docker push $(IMAGE_BACKEND):$(TAG)

# Pull backend image
pull-backend:
	docker pull $(IMAGE_BACKEND):$(TAG)

# Inspect backend image
inspect-backend:
	docker image inspect $(IMAGE_BACKEND):$(TAG)

# Describe backend image in ECR
describe-backend:
	aws ecr describe-images \
		--repository-name $(ECR_REPO_BACKEND) \
		--region $(AWS_REGION) \
		--query "imageDetails[?imageTags && contains(imageTags, '$(TAG)')]" \
		--output table

# Full backend deployment
release-backend: ecr-login build-backend tag-backend push-backend
	@echo "Backend deployed → $(IMAGE_BACKEND):$(TAG)"

# Run backend container
run-backend:
	docker run -d -p 9000:5000 --name $(CONTAINER_BACKEND) $(APP_BACKEND):$(TAG)

# Exec into running backend container
exec-backend:
	docker exec -it $(CONTAINER_BACKEND) /bin/sh

# Debug mode (enter IMAGE directly without keeping container)
debug-backend:
	docker run -it --rm $(APP_BACKEND):$(TAG) /bin/sh

# Stop backend container
stop-backend:
	docker stop $(CONTAINER_BACKEND) || true

# Remove backend container
remove-backend:
	docker rm $(CONTAINER_BACKEND) || true

# Restart backend container
restart-backend: stop-backend remove-backend run-backend

# -------------------------
# FRONTEND COMMANDS
# -------------------------

# Build frontend image
build-frontend:
	docker build -t $(APP_FRONTEND):$(TAG) -f $(DOCKERFILE_FRONTEND) $(CONTEXT)

# Tag frontend image
tag-frontend:
	docker tag $(APP_FRONTEND):$(TAG) $(IMAGE_FRONTEND):$(TAG)

# Push frontend image
push-frontend:
	docker push $(IMAGE_FRONTEND):$(TAG)

# Pull frontend image
pull-frontend:
	docker pull $(IMAGE_FRONTEND):$(TAG)

# Inspect frontend image
inspect-frontend:
	docker image inspect $(IMAGE_FRONTEND):$(TAG)

# Describe frontend image in ECR
describe-frontend:
	aws ecr describe-images \
		--repository-name $(ECR_REPO_FRONTEND) \
		--region $(AWS_REGION) \
		--query "imageDetails[?imageTags && contains(imageTags, '$(TAG)')]" \
		--output table

# Full frontend deployment
release-frontend: ecr-login build-frontend tag-frontend push-frontend
	@echo "Frontend deployed → $(IMAGE_FRONTEND):$(TAG)"

# Run frontend container
run-frontend:
	docker run -d -p 3000:80 --name $(CONTAINER_FRONTEND) $(APP_FRONTEND):$(TAG)

# Exec into running frontend container
exec-frontend:
	docker exec -it $(CONTAINER_FRONTEND) /bin/sh

# Debug mode (enter image directly)
debug-frontend:
	docker run -it --rm $(APP_FRONTEND):$(TAG) /bin/sh

# Stop frontend container
stop-frontend:
	docker stop $(CONTAINER_FRONTEND) || true

# Remove frontend container
remove-frontend:
	docker rm $(CONTAINER_FRONTEND) || true

# Restart frontend container
restart-frontend: stop-frontend remove-frontend run-frontend

# -------------------------
# IMAGE LISTING
# -------------------------

# Show all local images
list-images:
	docker images

# Show backend images only
list-backend-images:
	docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.Size}}" | grep $(APP_BACKEND)
# Show frontend images only
list-frontend-images:
	docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.Size}}" | grep $(APP_FRONTEND)

# Remove unused images
clean-images:
	docker image prune -a -f