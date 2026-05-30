# Create EKS Cluster IAM Role

## Step 1 — Select Trusted Entity

Choose:

- AWS service

Then in **Service or use case**:

Search or select:

- EKS

After selecting EKS, AWS usually shows options like:

- EKS - Cluster
- EKS - Nodegroup
- EKS - Fargate

Choose:

- EKS - Cluster

Then click:

- Next

---

## Step 2 — Add Permissions

AWS usually auto-selects:

- AmazonEKSClusterPolicy

If not selected, search and check:

- AmazonEKSClusterPolicy

Then click:

- Next

---

## Step 3 — Name Role

Role name:

```bash
eks-cluster-role
```

Click:

- Create role

---

Now create the **Node Group Role**.

# Create Node Group IAM Role

Go again:

**IAM → Roles → Create role**

## Step 1 — Trusted Entity

Choose:

- AWS service

Service/use case:

- EC2

Select:

- EC2

Click:

- Next

---

## Step 2 — Add Permissions

Search and select these 3 policies:

- AmazonEKSWorkerNodePolicy
- AmazonEC2ContainerRegistryReadOnly
- AmazonEKS_CNI_Policy

Click:

- Next

---

## Step 3 — Role Name

Role name:

```bash
eks-nodegroup-role
```

Click:

- Create role

---

After both roles are created, move to:

**Amazon EKS → Create cluster**

# AWS EKS Cluster Setup (Full Step-by-Step Guide)

This guide explains how to create an Amazon EKS cluster using AWS Console with IAM roles, networking, add-ons, and manual node setup.

---

# 1. Create IAM Role for EKS Cluster

## Step 1: Open IAM Console
AWS Console → IAM → Roles → Create role

## Step 2: Trusted Entity
- Choose: AWS service
- Use case: EKS → EKS - Cluster

## Step 3: Permissions
Attach:
- AmazonEKSClusterPolicy

## Step 4: Name Role

```
eks-cluster-role
```

Create role.

---

# 2. Create IAM Role for Worker Nodes

IAM → Roles → Create role

## Trusted Entity
- AWS service → EC2

## Attach Policies
- AmazonEKSWorkerNodePolicy
- AmazonEC2ContainerRegistryReadOnly
- AmazonEKS_CNI_Policy

## Role Name

```
eks-nodegroup-role
```

Create role.

---

# 3. Create EKS Cluster

Go to:
AWS Console → EKS → Create Cluster

## Step 1: Configure Cluster

### Configuration
- Select: Custom configuration
- Disable: EKS Auto Mode

### Cluster Details
- Name: nginx-cluster
- Kubernetes version: 1.35

### IAM Role
- eks-cluster-role

### Authentication
- Allow cluster admin access: YES
- Auth mode: EKS API + ConfigMap

### Settings
- Upgrade policy: Standard
- Scaling tier: Default
- ARC Zonal Shift: Disabled
- Deletion protection: Disabled

---

# 4. Networking Configuration

## VPC
- Default VPC

## Subnets
Select all 3 subnets:
- ap-south-1a
- ap-south-1b
- ap-south-1c

## IP Type
- IPv4

## Endpoint Access
- Public + Private

## Public Access CIDR
```
0.0.0.0/0
```

---

# 5. Observability Settings

## Control Plane Logs
Enable only:
- API server

Disable:
- Audit
- Authenticator
- Scheduler
- Controller manager

## Others
- Prometheus: OFF
- CloudWatch: optional
- Network observability: OFF

---

# 6. Add-ons Configuration

## Required Add-ons

### VPC CNI
- Default version
- IAM role: create new role (aws-node)

### CoreDNS
- Default version

### kube-proxy
- Default version

### Metrics Server
- Optional but recommended

### Amazon EBS CSI Driver
- IAM role: create new role (ebs-csi-controller-sa)

---

# 7. Review & Create Cluster

Verify:
- Cluster name: nginx-cluster
- IAM role: eks-cluster-role
- VPC: default
- Subnets: 3 AZs
- Endpoint: Public + Private
- Add-ons: selected

Click:
- CREATE CLUSTER

---

# 8. Cluster Creation Time

Approx:
- 10–15 minutes

Status:
- Creating → Active

---

# 9. Create Node Group

Go to:
EKS → Cluster → Compute → Add Node Group

## Configuration

### Name
```
backend-nodes
```

### IAM Role
```
eks-nodegroup-role
```

### Instance Type
- t3.medium

### Scaling
- Desired: 2
- Min: 1
- Max: 3

### Subnets
- Same 3 subnets

Create node group.

---

# 10. Connect kubectl to Cluster

```bash
aws eks update-kubeconfig \
  --region ap-south-1 \
  --name nginx-cluster
```

---

# 11. Verify Cluster

```bash
kubectl get nodes
```

Expected:
- 2 worker nodes in Ready state

---

# 12. Deploy Test Application

```bash
kubectl create deployment nginx --image=nginx
```

Expose service:

```bash
kubectl expose deployment nginx \
  --port=80 \
  --type=LoadBalancer
```

---

# 13. Verify Pods and Service

```bash
kubectl get pods
kubectl get svc
```

---

# Final Result

You will have:

- EKS cluster running
- Worker nodes active
- Kubernetes fully functional
- Nginx deployed
- LoadBalancer exposed

---

# End of Guide

# Create Node Group (EKS Worker Nodes)

---

## Step 1: Open Your Cluster

Go to:

- AWS Console → EKS
- Click **Clusters**
- Click your cluster:

```
nginx-cluster
```

---

## Step 2: Go to Compute Tab

Inside the cluster:

- Click **Compute**
- Scroll down to **Node groups**

Click:

- Add node group

---

## Step 3: Node Group Configuration

### Name

```
backend-nodes
```

---

### Node IAM Role

Select:

```
eks-nodegroup-role
```

If you don’t see it:

- Go to IAM → Roles
- Confirm it exists
- Refresh page

---

### Compute Configuration

#### Instance type

- t3.medium  
  (You can also use t3.small for cheaper testing)

---

### Scaling configuration

Set:

- Desired: 2
- Min: 1
- Max: 3

Meaning:
- 2 nodes will start
- Minimum 1 node always running
- Can scale up to 3 nodes

---

### Subnets

Select all same subnets as cluster:

- ap-south-1a
- ap-south-1b
- ap-south-1c

---

## Step 4: Review

Check everything:

- Name → backend-nodes
- IAM Role → eks-nodegroup-role
- Instance → t3.medium
- Scaling → 1–3 (desired 2)
- Subnets → all 3

---

## Step 5: Create

Click:

- Create

---

## Step 6: What Happens Next

AWS will:

- Launch EC2 instances
- Attach them to EKS cluster
- Install Kubernetes components

Time:
- 5–10 minutes

---

## Step 7: Verify Node Group

Go to:

- EKS → Cluster → Compute

Wait until status becomes:

- Active

---

## Step 8: Check Nodes

Run:

```bash
kubectl get nodes
```

Expected output:

- 2 nodes
- STATUS: Ready

---

# Done

Now your cluster is fully working:

- Control plane (EKS)
- Worker nodes (EC2)
- Networking configured
- Add-ons installed

---

# Next Steps

If you want to continue, I can guide you through:

- Deploy nginx application
- Expose service using LoadBalancer
- Install Ingress controller (NGINX / ALB)
- Setup CI/CD pipeline to EKS (GitHub Actions / Jenkins)

Just tell me 👍
```