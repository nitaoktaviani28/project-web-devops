#!/bin/bash
set -e

mkdir -p ~/vm-demo && cd ~/vm-demo

cat > main.tf << 'EOF'
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.availability_zone != "" ? regex("^([a-z]+-[a-z]+-[0-9]+)", var.availability_zone)[0] : "ap-southeast-1"
}

resource "aws_vpc" "this" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = merge(var.tags, { Name = var.name })
}

resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.this.id
  cidr_block        = var.public_subnet_cidr
  availability_zone = var.availability_zone

  tags = merge(var.tags, { Name = "${var.name}-public" })
}

resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.this.id

  tags = merge(var.tags, { Name = "${var.name}-igw" })
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.this.id

  route {
    cidr_block     = "0.0.0.0/0"
    gateway_id     = aws_internet_gateway.this.id
  }

  tags = merge(var.tags, { Name = "${var.name}-public-rt" })
}

resource "aws_route_table_association" "public_assoc" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

resource "aws_security_group" "basic" {
  name        = "${var.name}-basic-sg"
  vpc_id      = aws_vpc.this.id
  description = "Basic public security group"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.tags, { Name = "${var.name}-basic-sg" })
}
EOF

cat > variables.tf << 'EOF'
variable "name" {
  description = "Name prefix for all resources"
  type        = string
  default     = "vm-demo"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block for the public subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "availability_zone" {
  description = "Availability zone for the subnet"
  type        = string
  default     = "ap-southeast-1a"
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default     = {}
}
EOF

cat > outputs.tf << 'EOF'
output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.this.id
}

output "vpc_cidr" {
  description = "VPC CIDR block"
  value       = aws_vpc.this.cidr_block
}

output "public_subnet_id" {
  description = "Public subnet ID"
  value       = aws_subnet.public.id
}

output "internet_gateway_id" {
  description = "Internet gateway ID"
  value       = aws_internet_gateway.this.id
}

output "security_group_id" {
  description = "Basic security group ID"
  value       = aws_security_group.basic.id
}

output "route_table_id" {
  description = "Public route table ID"
  value       = aws_route_table.public.id
}
EOF

cat > terraform.tfvars << 'EOF'
name               = "vm-demo"
vpc_cidr           = "10.0.0.0/16"
public_subnet_cidr = "10.0.1.0/24"
availability_zone  = "ap-southeast-1a"

tags = {}
EOF

echo "Files created. Running terraform..."
terraform init
terraform plan
echo ""
echo "Review plan di atas. Kalau sudah OK, jalankan:"
echo "  cd ~/vm-demo && terraform apply -auto-approve"
