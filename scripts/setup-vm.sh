#!/bin/bash
set -e

echo "=== Installing Docker ==="
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

echo "=== Installing K3d ==="
curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash

echo "=== Installing kubectl ==="
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
rm kubectl

echo "=== Starting Docker ==="
sudo systemctl enable docker
sudo systemctl start docker

echo "=== Creating K3d cluster ==="
sudo k3d cluster create mycluster \
  --port "30080:30080@server:0" \
  --port "80:80@loadbalancer" \
  --agents 2

echo "=== Verifying ==="
sudo kubectl get nodes
sudo kubectl get pods -A

echo ""
echo "=== DONE ==="
echo "Docker, K3d, kubectl installed."
echo "K3d cluster 'mycluster' running with 1 server + 2 agents."
echo ""
echo "Logout dan login ulang agar docker bisa tanpa sudo:"
echo "  exit"
echo "  ssh -i ~/.ssh/vm-demo-key ubuntu@<IP>"
