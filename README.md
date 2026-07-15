# Meal Planner - DevOps Project

Full DevOps pipeline project: **Terraform, Docker, K3d, GitHub Actions**.

Aplikasi **Meal Planner** (jadwal makan mingguan) yang di-deploy otomatis ke Kubernetes cluster di AWS menggunakan CI/CD pipeline.

<img width="1894" height="856" alt="image" src="https://github.com/user-attachments/assets/e6a7d5f9-b49b-40af-ac73-a984986e550b" />

## Tools & Stack

| Layer | Tool |
|-------|------|
| Infrastructure | Terraform (AWS VPC + EC2) |
| Container | Docker (Nginx Alpine) |
| Orchestration | K3d (K3s in Docker) |
| CI/CD | GitHub Actions |
| Registry | Docker Hub |
| Generator | [DevFormat](https://dashboard.aboutdevops.my.id/) |

## Arsitektur

```
[git push] → [GitHub Actions] → [Docker Build] → [Push Docker Hub]
                                                        ↓
                                              [SSH to EC2 + kubectl apply]
                                                        ↓
                                              [App on K3d :30080]
```

## Fitur Aplikasi

- Jadwal makan Senin-Minggu (sarapan, makan siang, snack, makan malam)
- Menu masakan Indonesia dengan waktu WIB
- Input/edit/hapus meal sendiri
- Referensi kalori 80+ makanan Indonesia
- Export/import data JSON
- Live clock WIB
- Responsive, retro clean white theme

## Quick Start

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/project-web-devops.git
cd project-web-devops
```

### 2. Install Tools

```cmd
choco install terraform awscli git -y
```

### 3. Konfigurasi AWS

```cmd
aws configure
```

### 4. Generate SSH Key

```cmd
ssh-keygen -t ed25519 -f %USERPROFILE%\.ssh\vm-demo-key -N "" -C "vm-demo"
```

### 5. Edit terraform.tfvars

Ganti `ssh_public_key` dengan output dari:

```cmd
type %USERPROFILE%\.ssh\vm-demo-key.pub
```

### 6. Terraform Apply

```cmd
cd terraform
terraform init
terraform apply -auto-approve
```

### 7. Install Docker + K3d di VM

```cmd
ssh -i %USERPROFILE%\.ssh\vm-demo-key ubuntu@<IP_VM>
```

Lalu paste script install:

```bash
curl -fsSL https://get.docker.com | sh && sudo usermod -aG docker $USER && \
curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash && \
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl && rm kubectl && \
sudo systemctl enable docker && sudo systemctl start docker && \
sudo k3d cluster create mycluster --port "30080:30080@server:0" --agents 2 && \
mkdir -p ~/.kube && sudo k3d kubeconfig get mycluster > ~/.kube/config && \
chmod 600 ~/.kube/config && echo 'export KUBECONFIG=/home/ubuntu/.kube/config' >> ~/.bashrc
```

### 8. Setup GitHub Secrets

| Secret | Value |
|--------|-------|
| `EC2_HOST` | IP publik EC2 |
| `EC2_SSH_KEY` | Isi private key (`vm-demo-key`) |
| `DOCKERHUB_USERNAME` | Username Docker Hub |
| `DOCKERHUB_TOKEN` | Access Token Docker Hub |

### 9. Push & Auto Deploy

```bash
git add . && git commit -m "deploy" && git push
```

Akses: `http://<IP_VM>:30080`

## Struktur Project

```
project-web-devops/
├── .github/workflows/
│   └── deploy.yml              # CI/CD pipeline
├── app/
│   ├── index.html              # Frontend Meal Planner
│   ├── style.css               # Retro clean white theme
│   ├── app.js                  # Logic + calorie reference
│   ├── nginx.conf              # Nginx config + /health
│   ├── Dockerfile              # Nginx 1.27 Alpine
│   └── .dockerignore
├── k8s/
│   ├── deployment.yaml         # 3 replicas + health checks
│   └── service.yaml            # NodePort :30080
├── terraform/
│   ├── main.tf                 # VPC + SG + EC2
│   ├── variables.tf
│   ├── outputs.tf
│   ├── terraform.tfvars        # Edit SSH key disini
│   └── terraform.tfvars.example
├── scripts/
│   └── setup-vm.sh
├── docs/
│   ├── lab-guide.html
│   ├── Lab-Guide-DevOps-Pipeline.doc
│   └── topology.html
└── .gitignore
```

## Cleanup

```cmd
cd terraform
terraform destroy -auto-approve
```

## Credits

- Infrastructure config generated with [DevFormat](https://dashboard.aboutdevops.my.id/)
- Terraform Generator, Dockerfile Generator, Kubernetes Generator
