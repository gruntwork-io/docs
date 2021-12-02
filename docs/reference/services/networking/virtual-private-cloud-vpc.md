import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Virtual Private Cloud (VPC)

Deploy a VPC on AWS.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/vpc" className="link-button">View on GitHub</a>

### Reference 

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <table>
        <thead>
            <tr>
                <td><b>Variable name</b></td>
                <td><b>Description</b></td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td><a name="allow_private_persistence_internet_access" href="#allow_private_persistence_internet_access" className="snap-top"><code>allow_private_persistence_internet_access</code></a></td>
        <td>Should the private persistence subnet be allowed outbound access to the internet?</td>
    </tr><tr>
        <td><a name="apply_default_nacl_rules" href="#apply_default_nacl_rules" className="snap-top"><code>apply_default_nacl_rules</code></a></td>
        <td>If true, will apply the default NACL rules in var.default_nacl_ingress_rules and var.default_nacl_egress_rules to the public, private, and persistence subnets created by this module. Note that every VPC has default NACL rules that apply to subnets. When this is false, the original default NACL rules managed by AWS will be used. If you are managing NACLs for the subnets using another module or for some reason do not want to use the default NACLs, set this to false.</td>
    </tr><tr>
        <td><a name="availability_zone_exclude_names" href="#availability_zone_exclude_names" className="snap-top"><code>availability_zone_exclude_names</code></a></td>
        <td>Specific Availability Zones in which subnets SHOULD NOT be created. Useful for when features / support is missing from a given AZ.</td>
    </tr><tr>
        <td><a name="aws_region" href="#aws_region" className="snap-top"><code>aws_region</code></a></td>
        <td>The AWS region in which all resources will be created</td>
    </tr><tr>
        <td><a name="cidr_block" href="#cidr_block" className="snap-top"><code>cidr_block</code></a></td>
        <td>The IP address range of the VPC in CIDR notation. A prefix of /18 is recommended. Do not use a prefix higher than /27. Examples include '10.100.0.0/18', '10.200.0.0/18', etc.</td>
    </tr><tr>
        <td><a name="create_dns_forwarder" href="#create_dns_forwarder" className="snap-top"><code>create_dns_forwarder</code></a></td>
        <td>Whether or not to create DNS forwarders from the Mgmt VPC to the App VPC to resolve private Route 53 endpoints. This is most useful when you want to keep your EKS Kubernetes API endpoint private to the VPC, but want to access it from the Mgmt VPC (where your VPN/Bastion servers are).</td>
    </tr><tr>
        <td><a name="create_flow_logs" href="#create_flow_logs" className="snap-top"><code>create_flow_logs</code></a></td>
        <td>If you set this variable to false, this module will not create VPC Flow Logs resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module.</td>
    </tr><tr>
        <td><a name="create_network_acls" href="#create_network_acls" className="snap-top"><code>create_network_acls</code></a></td>
        <td>If set to false, this module will NOT create Network ACLs. This is useful if you don't want to use Network ACLs or you want to provide your own Network ACLs outside of this module.</td>
    </tr><tr>
        <td><a name="create_peering_connection" href="#create_peering_connection" className="snap-top"><code>create_peering_connection</code></a></td>
        <td>Whether or not to create a peering connection to another VPC.</td>
    </tr><tr>
        <td><a name="create_private_app_subnet_nacls" href="#create_private_app_subnet_nacls" className="snap-top"><code>create_private_app_subnet_nacls</code></a></td>
        <td>If set to false, this module will NOT create the NACLs for the private app subnet tier.</td>
    </tr><tr>
        <td><a name="create_private_app_subnets" href="#create_private_app_subnets" className="snap-top"><code>create_private_app_subnets</code></a></td>
        <td>If set to false, this module will NOT create the private app subnet tier.</td>
    </tr><tr>
        <td><a name="create_private_persistence_subnet_nacls" href="#create_private_persistence_subnet_nacls" className="snap-top"><code>create_private_persistence_subnet_nacls</code></a></td>
        <td>If set to false, this module will NOT create the NACLs for the private persistence subnet tier.</td>
    </tr><tr>
        <td><a name="create_private_persistence_subnets" href="#create_private_persistence_subnets" className="snap-top"><code>create_private_persistence_subnets</code></a></td>
        <td>If set to false, this module will NOT create the private persistence subnet tier.</td>
    </tr><tr>
        <td><a name="create_public_subnet_nacls" href="#create_public_subnet_nacls" className="snap-top"><code>create_public_subnet_nacls</code></a></td>
        <td>If set to false, this module will NOT create the NACLs for the public subnet tier. This is useful for VPCs that only need private subnets.</td>
    </tr><tr>
        <td><a name="create_public_subnets" href="#create_public_subnets" className="snap-top"><code>create_public_subnets</code></a></td>
        <td>If set to false, this module will NOT create the public subnet tier. This is useful for VPCs that only need private subnets. Note that setting this to false also means the module will NOT create an Internet Gateway or the NAT gateways, so if you want any public Internet access in the VPC (even outbound access—e.g., to run apt get), you'll need to provide it yourself via some other mechanism (e.g., via VPC peering, a Transit Gateway, Direct Connect, etc).</td>
    </tr><tr>
        <td><a name="create_vpc_endpoints" href="#create_vpc_endpoints" className="snap-top"><code>create_vpc_endpoints</code></a></td>
        <td>Create VPC endpoints for S3 and DynamoDB.</td>
    </tr><tr>
        <td><a name="custom_tags" href="#custom_tags" className="snap-top"><code>custom_tags</code></a></td>
        <td>A map of tags to apply to the VPC, Subnets, Route Tables, Internet Gateway, default security group, and default NACLs. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable.</td>
    </tr><tr>
        <td><a name="default_nacl_egress_rules" href="#default_nacl_egress_rules" className="snap-top"><code>default_nacl_egress_rules</code></a></td>
        <td>The egress rules to apply to the default NACL in the VPC. This is the security group that is used by any subnet that doesn't have its own NACL attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the egress block in the aws_default_network_acl resource: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl.</td>
    </tr><tr>
        <td><a name="default_nacl_ingress_rules" href="#default_nacl_ingress_rules" className="snap-top"><code>default_nacl_ingress_rules</code></a></td>
        <td>The ingress rules to apply to the default NACL in the VPC. This is the NACL that is used by any subnet that doesn't have its own NACL attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the ingress block in the aws_default_network_acl resource: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_network_acl.</td>
    </tr><tr>
        <td><a name="default_security_group_egress_rules" href="#default_security_group_egress_rules" className="snap-top"><code>default_security_group_egress_rules</code></a></td>
        <td>The egress rules to apply to the default security group in the VPC. This is the security group that is used by any resource that doesn't have its own security group attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the egress block in the aws_default_security_group resource: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group#egress-block.</td>
    </tr><tr>
        <td><a name="default_security_group_ingress_rules" href="#default_security_group_ingress_rules" className="snap-top"><code>default_security_group_ingress_rules</code></a></td>
        <td>The ingress rules to apply to the default security group in the VPC. This is the security group that is used by any resource that doesn't have its own security group attached. The value for this variable must be a map where the keys are a unique name for each rule and the values are objects with the same fields as the ingress block in the aws_default_security_group resource: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/default_security_group#ingress-block.</td>
    </tr><tr>
        <td><a name="destination_vpc_resolver_name" href="#destination_vpc_resolver_name" className="snap-top"><code>destination_vpc_resolver_name</code></a></td>
        <td>Name to set for the destination VPC resolver (inbound from origin VPC to destination VPC). If null (default), defaults to 'DESTINATION_VPC_NAME-from-ORIGIN_VPC_NAME-in'.</td>
    </tr><tr>
        <td><a name="eks_cluster_names" href="#eks_cluster_names" className="snap-top"><code>eks_cluster_names</code></a></td>
        <td>The names of EKS clusters that will be deployed into the VPC, if var.tag_for_use_with_eks is true.</td>
    </tr><tr>
        <td><a name="enable_default_security_group" href="#enable_default_security_group" className="snap-top"><code>enable_default_security_group</code></a></td>
        <td>If set to false, the default security groups will NOT be created.</td>
    </tr><tr>
        <td><a name="flow_log_cloudwatch_iam_role_name" href="#flow_log_cloudwatch_iam_role_name" className="snap-top"><code>flow_log_cloudwatch_iam_role_name</code></a></td>
        <td>The name to use for the flow log IAM role. This can be useful if you provision the VPC without admin privileges which needs setting IAM:PassRole on deployment role. When null, a default name based on the VPC name will be chosen.</td>
    </tr><tr>
        <td><a name="flow_log_cloudwatch_log_group_name" href="#flow_log_cloudwatch_log_group_name" className="snap-top"><code>flow_log_cloudwatch_log_group_name</code></a></td>
        <td>The name to use for the CloudWatch Log group used for storing flow log. When null, a default name based on the VPC name will be chosen.</td>
    </tr><tr>
        <td><a name="flow_logs_traffic_type" href="#flow_logs_traffic_type" className="snap-top"><code>flow_logs_traffic_type</code></a></td>
        <td>The type of traffic to capture in the VPC flow log. Valid values include ACCEPT, REJECT, or ALL. Defaults to REJECT. Only used if create_flow_logs is true.</td>
    </tr><tr>
        <td><a name="kms_key_arn" href="#kms_key_arn" className="snap-top"><code>kms_key_arn</code></a></td>
        <td>The ARN of a KMS key to use for encrypting VPC the flow log. A new KMS key will be created if this is not supplied.</td>
    </tr><tr>
        <td><a name="kms_key_user_iam_arns" href="#kms_key_user_iam_arns" className="snap-top"><code>kms_key_user_iam_arns</code></a></td>
        <td>VPC Flow Logs will be encrypted with a KMS Key (a Customer Master Key). The IAM Users specified in this list will have access to this key.</td>
    </tr><tr>
        <td><a name="nat_gateway_custom_tags" href="#nat_gateway_custom_tags" className="snap-top"><code>nat_gateway_custom_tags</code></a></td>
        <td>A map of tags to apply to the NAT gateways, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.</td>
    </tr><tr>
        <td><a name="num_availability_zones" href="#num_availability_zones" className="snap-top"><code>num_availability_zones</code></a></td>
        <td>How many AWS Availability Zones (AZs) to use. One subnet of each type (public, private app) will be created in each AZ. Note that this must be less than or equal to the total number of AZs in a region. A value of null means all AZs should be used. For example, if you specify 3 in a region with 5 AZs, subnets will be created in just 3 AZs instead of all 5. Defaults to all AZs in a region.</td>
    </tr><tr>
        <td><a name="num_nat_gateways" href="#num_nat_gateways" className="snap-top"><code>num_nat_gateways</code></a></td>
        <td>The number of NAT Gateways to launch for this VPC. For production VPCs, a NAT Gateway should be placed in each Availability Zone (so likely 3 total), whereas for non-prod VPCs, just one Availability Zone (and hence 1 NAT Gateway) will suffice.</td>
    </tr><tr>
        <td><a name="origin_vpc_cidr_block" href="#origin_vpc_cidr_block" className="snap-top"><code>origin_vpc_cidr_block</code></a></td>
        <td>The CIDR block of the origin VPC.</td>
    </tr><tr>
        <td><a name="origin_vpc_id" href="#origin_vpc_id" className="snap-top"><code>origin_vpc_id</code></a></td>
        <td>The ID of the origin VPC to use when creating peering connections and DNS forwarding.</td>
    </tr><tr>
        <td><a name="origin_vpc_name" href="#origin_vpc_name" className="snap-top"><code>origin_vpc_name</code></a></td>
        <td>The name of the origin VPC to use when creating peering connections and DNS forwarding.</td>
    </tr><tr>
        <td><a name="origin_vpc_public_subnet_ids" href="#origin_vpc_public_subnet_ids" className="snap-top"><code>origin_vpc_public_subnet_ids</code></a></td>
        <td>The public subnets in the origin VPC to use when creating route53 resolvers. These are public subnets due to network ACLs restrictions. Although the forwarder is addressable publicly, access is blocked by security groups.</td>
    </tr><tr>
        <td><a name="origin_vpc_resolver_name" href="#origin_vpc_resolver_name" className="snap-top"><code>origin_vpc_resolver_name</code></a></td>
        <td>Name to set for the origin VPC resolver (outbound from origin VPC to destination VPC). If null (default), defaults to 'ORIGIN_VPC_NAME-to-DESTINATION_VPC_NAME-out'.</td>
    </tr><tr>
        <td><a name="origin_vpc_route_table_ids" href="#origin_vpc_route_table_ids" className="snap-top"><code>origin_vpc_route_table_ids</code></a></td>
        <td>A list of route tables from the origin VPC that should have routes to this app VPC.</td>
    </tr><tr>
        <td><a name="persistence_subnet_bits" href="#persistence_subnet_bits" className="snap-top"><code>persistence_subnet_bits</code></a></td>
        <td>Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information.</td>
    </tr><tr>
        <td><a name="persistence_subnet_spacing" href="#persistence_subnet_spacing" className="snap-top"><code>persistence_subnet_spacing</code></a></td>
        <td>The amount of spacing between the private persistence subnets. Default: 2 times the value of private_subnet_spacing.</td>
    </tr><tr>
        <td><a name="private_app_allow_inbound_ports_from_cidr" href="#private_app_allow_inbound_ports_from_cidr" className="snap-top"><code>private_app_allow_inbound_ports_from_cidr</code></a></td>
        <td>A map of unique names to client IP CIDR block and inbound ports that should be exposed in the private app subnet tier nACLs. This is useful when exposing your service on a privileged port with an NLB, where the address isn't translated.</td>
    </tr><tr>
        <td><a name="private_app_subnet_cidr_blocks" href="#private_app_subnet_cidr_blocks" className="snap-top"><code>private_app_subnet_cidr_blocks</code></a></td>
        <td>A map listing the specific CIDR blocks desired for each private-app subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.</td>
    </tr><tr>
        <td><a name="private_app_subnet_custom_tags" href="#private_app_subnet_custom_tags" className="snap-top"><code>private_app_subnet_custom_tags</code></a></td>
        <td>A map of tags to apply to the private-app Subnet, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.</td>
    </tr><tr>
        <td><a name="private_persistence_subnet_cidr_blocks" href="#private_persistence_subnet_cidr_blocks" className="snap-top"><code>private_persistence_subnet_cidr_blocks</code></a></td>
        <td>A map listing the specific CIDR blocks desired for each private-persistence subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.</td>
    </tr><tr>
        <td><a name="private_persistence_subnet_custom_tags" href="#private_persistence_subnet_custom_tags" className="snap-top"><code>private_persistence_subnet_custom_tags</code></a></td>
        <td>A map of tags to apply to the private-persistence Subnet, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.</td>
    </tr><tr>
        <td><a name="private_subnet_bits" href="#private_subnet_bits" className="snap-top"><code>private_subnet_bits</code></a></td>
        <td>Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information.</td>
    </tr><tr>
        <td><a name="private_subnet_spacing" href="#private_subnet_spacing" className="snap-top"><code>private_subnet_spacing</code></a></td>
        <td>The amount of spacing between private app subnets. Defaults to subnet_spacing in vpc-app module if not set.</td>
    </tr><tr>
        <td><a name="public_subnet_bits" href="#public_subnet_bits" className="snap-top"><code>public_subnet_bits</code></a></td>
        <td>Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information.</td>
    </tr><tr>
        <td><a name="public_subnet_cidr_blocks" href="#public_subnet_cidr_blocks" className="snap-top"><code>public_subnet_cidr_blocks</code></a></td>
        <td>A map listing the specific CIDR blocks desired for each public subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.</td>
    </tr><tr>
        <td><a name="public_subnet_custom_tags" href="#public_subnet_custom_tags" className="snap-top"><code>public_subnet_custom_tags</code></a></td>
        <td>A map of tags to apply to the public Subnet, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.</td>
    </tr><tr>
        <td><a name="security_group_tags" href="#security_group_tags" className="snap-top"><code>security_group_tags</code></a></td>
        <td>A map of tags to apply to the default Security Group, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.</td>
    </tr><tr>
        <td><a name="subnet_spacing" href="#subnet_spacing" className="snap-top"><code>subnet_spacing</code></a></td>
        <td>The amount of spacing between the different subnet types</td>
    </tr><tr>
        <td><a name="tag_for_use_with_eks" href="#tag_for_use_with_eks" className="snap-top"><code>tag_for_use_with_eks</code></a></td>
        <td>The VPC resources need special tags for discoverability by Kubernetes to use with certain features, like deploying ALBs.</td>
    </tr><tr>
        <td><a name="tenancy" href="#tenancy" className="snap-top"><code>tenancy</code></a></td>
        <td>The allowed tenancy of instances launched into the selected VPC. Must be one of: default, dedicated, or host.</td>
    </tr><tr>
        <td><a name="vpc_custom_tags" href="#vpc_custom_tags" className="snap-top"><code>vpc_custom_tags</code></a></td>
        <td>A map of tags to apply just to the VPC itself, but not any of the other resources. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.</td>
    </tr><tr>
        <td><a name="vpc_name" href="#vpc_name" className="snap-top"><code>vpc_name</code></a></td>
        <td>Name of the VPC. Examples include 'prod', 'dev', 'mgmt', etc.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <table>
        <thead>
            <tr>
              <td><b>Variable name</b></td>
              <td><b>Description</b></td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td><a name="availability_zones" href="#availability_zones" className="snap-top"><code>availability_zones</code></a></td>
        <td>The availability zones of the VPC</td>
    </tr><tr>
        <td><a name="default_security_group_id" href="#default_security_group_id" className="snap-top"><code>default_security_group_id</code></a></td>
        <td>The ID of the default security group of this VPC.</td>
    </tr><tr>
        <td><a name="dynamodb_vpc_endpoint_id" href="#dynamodb_vpc_endpoint_id" className="snap-top"><code>dynamodb_vpc_endpoint_id</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="nat_gateway_public_ip_count" href="#nat_gateway_public_ip_count" className="snap-top"><code>nat_gateway_public_ip_count</code></a></td>
        <td>Count of public IPs from the NAT Gateway</td>
    </tr><tr>
        <td><a name="nat_gateway_public_ips" href="#nat_gateway_public_ips" className="snap-top"><code>nat_gateway_public_ips</code></a></td>
        <td>A list of public IPs from the NAT Gateway</td>
    </tr><tr>
        <td><a name="num_availability_zones" href="#num_availability_zones" className="snap-top"><code>num_availability_zones</code></a></td>
        <td>The number of availability zones of the VPC</td>
    </tr><tr>
        <td><a name="private_app_subnet_cidr_blocks" href="#private_app_subnet_cidr_blocks" className="snap-top"><code>private_app_subnet_cidr_blocks</code></a></td>
        <td>The private IP address range of the VPC in CIDR notation.</td>
    </tr><tr>
        <td><a name="private_app_subnet_ids" href="#private_app_subnet_ids" className="snap-top"><code>private_app_subnet_ids</code></a></td>
        <td>A list of IDs of the private app subnets in the VPC</td>
    </tr><tr>
        <td><a name="private_app_subnet_route_table_ids" href="#private_app_subnet_route_table_ids" className="snap-top"><code>private_app_subnet_route_table_ids</code></a></td>
        <td>A list of IDs of the private app subnet routing table.</td>
    </tr><tr>
        <td><a name="private_app_subnets" href="#private_app_subnets" className="snap-top"><code>private_app_subnets</code></a></td>
        <td>A map of all private-app subnets, with the subnet name as key, and all `aws-subnet` properties as the value.</td>
    </tr><tr>
        <td><a name="private_app_subnets_network_acl_id" href="#private_app_subnets_network_acl_id" className="snap-top"><code>private_app_subnets_network_acl_id</code></a></td>
        <td>The ID of the private subnet's ACL</td>
    </tr><tr>
        <td><a name="private_persistence_route_table_ids" href="#private_persistence_route_table_ids" className="snap-top"><code>private_persistence_route_table_ids</code></a></td>
        <td>A list of IDs of the private persistence subnet routing table.</td>
    </tr><tr>
        <td><a name="private_persistence_subnet_cidr_blocks" href="#private_persistence_subnet_cidr_blocks" className="snap-top"><code>private_persistence_subnet_cidr_blocks</code></a></td>
        <td>The private IP address range of the VPC Persistence tier in CIDR notation.</td>
    </tr><tr>
        <td><a name="private_persistence_subnet_ids" href="#private_persistence_subnet_ids" className="snap-top"><code>private_persistence_subnet_ids</code></a></td>
        <td>The IDs of the private persistence tier subnets of the VPC.</td>
    </tr><tr>
        <td><a name="private_persistence_subnets" href="#private_persistence_subnets" className="snap-top"><code>private_persistence_subnets</code></a></td>
        <td>A map of all private-persistence subnets, with the subnet name as key, and all `aws-subnet` properties as the value.</td>
    </tr><tr>
        <td><a name="private_persistence_subnets_network_acl_id" href="#private_persistence_subnets_network_acl_id" className="snap-top"><code>private_persistence_subnets_network_acl_id</code></a></td>
        <td>The ID of the private persistence subnet's ACL</td>
    </tr><tr>
        <td><a name="public_subnet_cidr_blocks" href="#public_subnet_cidr_blocks" className="snap-top"><code>public_subnet_cidr_blocks</code></a></td>
        <td>The public IP address range of the VPC in CIDR notation.</td>
    </tr><tr>
        <td><a name="public_subnet_ids" href="#public_subnet_ids" className="snap-top"><code>public_subnet_ids</code></a></td>
        <td>A list of IDs of the public subnets of the VPC.</td>
    </tr><tr>
        <td><a name="public_subnet_route_table_id" href="#public_subnet_route_table_id" className="snap-top"><code>public_subnet_route_table_id</code></a></td>
        <td>The ID of the public routing table.</td>
    </tr><tr>
        <td><a name="public_subnets" href="#public_subnets" className="snap-top"><code>public_subnets</code></a></td>
        <td>A map of all public subnets, with the subnet name as key, and all `aws-subnet` properties as the value.</td>
    </tr><tr>
        <td><a name="public_subnets_network_acl_id" href="#public_subnets_network_acl_id" className="snap-top"><code>public_subnets_network_acl_id</code></a></td>
        <td>The ID of the public subnet's ACL</td>
    </tr><tr>
        <td><a name="s3_vpc_endpoint_id" href="#s3_vpc_endpoint_id" className="snap-top"><code>s3_vpc_endpoint_id</code></a></td>
        <td></td>
    </tr><tr>
        <td><a name="vpc_cidr_block" href="#vpc_cidr_block" className="snap-top"><code>vpc_cidr_block</code></a></td>
        <td>The IP address range of the VPC in CIDR notation.</td>
    </tr><tr>
        <td><a name="vpc_id" href="#vpc_id" className="snap-top"><code>vpc_id</code></a></td>
        <td>The ID of the VPC.</td>
    </tr><tr>
        <td><a name="vpc_name" href="#vpc_name" className="snap-top"><code>vpc_name</code></a></td>
        <td>The name configured for VPC.</td>
    </tr><tr>
        <td><a name="vpc_ready" href="#vpc_ready" className="snap-top"><code>vpc_ready</code></a></td>
        <td>Indicates whether or not the VPC has finished creating</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"44a4203842033c26ec9e379e9eff9231"}
##DOCS-SOURCER-END -->
