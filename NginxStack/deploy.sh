#!/bin/bash

echo "Building docker images...."
docker build -t backend -f ./docker/backend.Dockerfile .

docker build -t frontend -f ./docker/frontend.Dockerfile .

echo "Tagging images for Docker Hub..."
docker tag localhost/backend mykks32/backend:latest
docker tag localhost/frontend mykks32/frontend:latest

echo "Pushing images to Docker Hub..."
docker push mykks32/backend:latest
docker push mykks32/frontend:latest

echo "Deploying in Kubernetes..."
kubectl apply -f k8s/

echo "Done"
