name               = "vm-demo"
vpc_cidr           = "10.0.0.0/16"
public_subnet_cidr = "10.0.1.0/24"
availability_zone  = "ap-southeast-1a"
instance_type      = "t3.medium"

tags = {}

ssh_public_key = "ssh-ed25519 (isi) vm-demo"
