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

output "instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.this.id
}

output "instance_public_ip" {
  description = "EC2 public IP"
  value       = aws_instance.this.public_ip
}
