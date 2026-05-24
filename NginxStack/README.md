# NginxStack

A full-stack containerized application with a Node.js backend, static HTML frontend, and Nginx reverse proxy — deployable via Docker Compose or Kubernetes (Kustomize).

---

## Project Structure

```
NginxStack/
├── apps/
│   ├── backend/           # Node.js Express API
│   │   ├── package.json
│   │   └── src/server.js
│   └── frontend/          # Static HTML frontend
│       └── index.html
├── docker/
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   └── nginx.conf         # Nginx reverse proxy config
├── docker-compose.yaml    # Local dev with Docker Compose
├── k8s/
│   ├── base/
│   │   ├── namespace.yaml
│   │   ├── kustomization.yaml
│   │   └── apps/
│   │       ├── backend/   # Deployment, Service, Ingress, HPA, PDB, ConfigMap
│   │       └── frontend/  # Deployment, Service, Ingress, HPA, PDB, ConfigMap
│   └── overlays/
│       └── dev/           # Dev environment overrides + env secrets
├── Makefile
└── README.md
```

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [kustomize](https://kubectl.docs.kubernetes.io/installation/kustomize/) (bundled with `kubectl apply -k`)
- A running Kubernetes cluster (local: [minikube](https://minikube.sigs.k8s.io/) / [kind](https://kind.sigs.k8s.io/))

---

## Configuration

### Docker Hub

Edit the `DOCKER_USER` variable in `Makefile` to match your Docker Hub username:

```makefile
DOCKER_USER := your-dockerhub-username
```

### Environment Variables

Copy the example env file and fill in your values:

```bash
cp k8s/overlays/dev/backend.env.example k8s/overlays/dev/backend.env
```

---

## Docker Commands

### Build Images

```bash
make build-backend       # Build backend Docker image
make build-frontend      # Build frontend Docker image
make build-all           # Build both images at once
```

### Tag Images

```bash
make tag-backend         # Tag backend image for Docker Hub
make tag-frontend        # Tag frontend image for Docker Hub
```

### Push Images

```bash
make push-backend        # Push backend image to Docker Hub
make push-frontend       # Push frontend image to Docker Hub
```

### Full Release Pipeline (Build → Tag → Push)

```bash
make release-backend     # Full pipeline for backend
make release-frontend    # Full pipeline for frontend
make release-all         # Full pipeline for both
```

To release with a custom tag:

```bash
make release-all TAG=v1.0.0
```

---

## Docker Compose (Local Dev)

```bash
make docker-up           # Build and start all services in detached mode
make docker-down         # Stop and remove all containers
make docker-logs         # Tail logs from all running services
```

Or directly:

```bash
docker compose up --build
```

---

## Kubernetes Commands (Dev)

### Deploy

```bash
make k8s-dev             # Deploy dev environment using Kustomize overlay
```

### Teardown

```bash
make k8s-dev-delete      # Delete all resources in the dev environment
```

### Inspect Resources

```bash
make k8s-pods            # List all pods in the nginx-stack namespace
make k8s-svc             # List all services in the nginx-stack namespace
make k8s-all             # Full overview of all resources in the namespace
```

### Restart Deployments

```bash
make k8s-restart-backend    # Rolling restart of the backend deployment
make k8s-restart-frontend   # Rolling restart of the frontend deployment
```

### Rollout Status

```bash
make k8s-status-backend     # Watch rollout status for backend
make k8s-status-frontend    # Watch rollout status for frontend
```

### Logs

```bash
make k8s-logs-backend       # Tail live logs from the backend deployment
make k8s-logs-frontend      # Tail live logs from the frontend deployment
```

### Describe

```bash
make k8s-describe-backend   # kubectl describe for backend deployment
make k8s-describe-frontend  # kubectl describe for frontend deployment
```

---

## Kubernetes Namespace

All resources are deployed into the `nginx-stack` namespace.

---

## Help

Run `make help` to see a summary of all available commands:

```bash
make help
```

---

## Image Registry

| Service  | Image                        |
|----------|------------------------------|
| Backend  | `mykks32/backend:latest`     |
| Frontend | `mykks32/frontend:latest`    |

> Change `mykks32` to your Docker Hub username in the `Makefile`.