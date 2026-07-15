# DevOps Demo Project 🚀

Project sederhana untuk demo full DevOps pipeline: **Terraform → Docker → GitHub Actions → K3s**.

Semua config di-generate dengan bantuan **[DevFormat](https://devformat.com)** tools.

## 📁 Struktur Project

```
project-web-devops/
├── app/                    # Aplikasi Node.js
│   ├── index.js
│   ├── package.json
│   ├── Dockerfile          # ← DevFormat Dockerfile Generator
│   └── .dockerignore
├── terraform/              # Infrastructure as Code
│   ├── main.tf             # ← DevFormat Terraform Generator
│   ├── variables.tf
│   ├── outputs.tf
│   └── terraform.tfvars
├── k8s/                    # Kubernetes Manifests
│   ├── deployment.yaml     # ← DevFormat Kubernetes Generator
│   └── service.yaml
└── .github/workflows/
    └── deploy.yml          # CI/CD Pipeline
```

## 🔧 Tools dari DevFormat yang Dipakai

| Tool | Kegunaan |
|------|----------|
| **Terraform Generator** | Generate `main.tf` untuk AWS EC2 + VPC + Security Group |
| **Dockerfile Generator** | Generate Dockerfile optimized untuk Node.js |
| **Kubernetes Generator** | Generate Deployment & Service YAML |

## 🚀 Cara Pakai

### 1. Provision Infrastructure (Terraform)

```bash
cd terraform
terraform init
terraform plan -var="ssh_public_key=$(cat ~/.ssh/id_rsa.pub)"
terraform apply -var="ssh_public_key=$(cat ~/.ssh/id_rsa.pub)"
```

### 2. Setup GitHub Secrets

Di repository GitHub, tambahkan secrets berikut:

| Secret | Keterangan |
|--------|-----------|
| `EC2_HOST` | Public IP dari output Terraform |
| `EC2_SSH_KEY` | Private SSH key untuk akses EC2 |
| `GHCR_TOKEN` | GitHub PAT dengan scope `read:packages` |

### 3. Push & Auto Deploy

```bash
git add .
git commit -m "Initial DevOps project"
git push origin main
```

GitHub Actions akan otomatis:
1. ✅ Build Docker image dari `app/Dockerfile`
2. ✅ Push image ke GitHub Container Registry (GHCR)
3. ✅ SSH ke EC2 dan deploy ke K3s
4. ✅ Verify deployment health

### 4. Akses Aplikasi

```
http://<EC2_PUBLIC_IP>:30080
```

## 📊 Flow Diagram

```
[Push to GitHub] → [GitHub Actions]
                        ↓
              [Build Docker Image]
                        ↓
              [Push to GHCR]
                        ↓
              [SSH to EC2]
                        ↓
              [kubectl apply → K3s]
                        ↓
              [App Running on :30080]
```
