#!/bin/bash

# Build images
docker build -t backend -f ./docker/backend.Dockerfile .
docker build -t frontend -f ./docker/frontend.Dockerfile .

# Tag for Docker Hub
docker tag localhost/backend mykks32/backend:latest
docker tag localhost/frontend mykks32/frontend:latest

# Push to Docker Hub
docker push mykks32/backend:latest
docker push mykks32/frontend:latest

# Deploy to Kubernetes
kubectl apply -f k8s/

# Forward ports to localhost
kubectl port-forward service/frontend 3000:80 &
kubectl port-forward service/backend 5000:5000 &

echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"

# Keep script running (Ctrl+C to stop)
wait
