#!/bin/bash

# Build images
echo "Building docker images..."
docker build -t backend -f ./docker/backend.Dockerfile .
docker build -t frontend -f ./docker/frontend.Dockerfile .

# Tag for Docker Hub
echo "Tagging docker images..."
docker tag localhost/backend mykks32/backend:latest
docker tag localhost/frontend mykks32/frontend:latest

# Push to Docker Hub
echo "Pushing images to docker hub..."
docker push mykks32/backend:latest
docker push mykks32/frontend:latest

# Deploy k8s deployments
echo "k8s deployments..."
kubectl apply -f k8s/deployments/

# Deploy k8s services
echo "k8s services..."
kubectl apply -f k8s/services/

# Deploy k8s ingress
echo "k8s ingress..."
kubectl apply -f k8s/ingress.yaml

echo "Done"

# Forward ports to localhost
# kubectl port-forward service/frontend 3000:80 &
# kubectl port-forward service/backend 5000:5000 &

# echo "Frontend: http://localhost:3000"
# echo "Backend:  http://localhost:5000"

# Keep script running (Ctrl+C to stop)
# wait
