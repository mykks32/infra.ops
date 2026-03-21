#!/bin/bash

echo "Building docker images...."
docker build -t backend -f ./docker/backend.Dockerfile .

docker build -t frontend -f ./docker/frontend.Dockerfile .

echo "Deploying in Kubernetes..."
kubectl apply -f k8s/

echo "Done"
