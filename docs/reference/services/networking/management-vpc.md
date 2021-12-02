import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Management VPC

Deploy a VPC  on AWS for administrative and management functions.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/vpc-mgmt" className="link-button">View on GitHub</a>

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
        <td><a name="availability_zone_exclude_ids" href="#availability_zone_exclude_ids" className="snap-top"><code>availability_zone_exclude_ids</code></a></td>
        <td>List of excluded Availability Zone IDs.</td>
    </tr><tr>
        <td><a name="availability_zone_exclude_names" href="#availability_zone_exclude_names" className="snap-top"><code>availability_zone_exclude_names</code></a></td>
        <td>List of excluded Availability Zone names.</td>
    </tr><tr>
        <td><a name="availability_zone_state" href="#availability_zone_state" className="snap-top"><code>availability_zone_state</code></a></td>
        <td>Allows to filter list of Availability Zones based on their current state. Can be either "available", "information", "impaired" or "unavailable". By default the list includes a complete set of Availability Zones to which the underlying AWS account has access, regardless of their state.</td>
    </tr><tr>
        <td><a name="aws_region" href="#aws_region" className="snap-top"><code>aws_region</code></a></td>
        <td>The AWS region to deploy into</td>
    </tr><tr>
        <td><a name="cidr_block" href="#cidr_block" className="snap-top"><code>cidr_block</code></a></td>
        <td>The IP address range of the VPC in CIDR notation. A prefix of /16 is recommended. Do not use a prefix higher than /27. Examples include '10.100.0.0/16', '10.200.0.0/16', etc.</td>
    </tr><tr>
        <td><a name="create_flow_logs" href="#create_flow_logs" className="snap-top"><code>create_flow_logs</code></a></td>
        <td>If you set this variable to false, this module will not create VPC Flow Logs resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module.</td>
    </tr><tr>
        <td><a name="create_network_acls" href="#create_network_acls" className="snap-top"><code>create_network_acls</code></a></td>
        <td>If set to false, this module will NOT create Network ACLs. This is useful if you don't want to use Network ACLs or you want to provide your own Network ACLs outside of this module.</td>
    </tr><tr>
        <td><a name="custom_tags" href="#custom_tags" className="snap-top"><code>custom_tags</code></a></td>
        <td>A map of tags to apply to the VPC, Subnets, Route Tables, and Internet Gateway. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable.</td>
    </tr><tr>
        <td><a name="custom_tags_vpc_only" href="#custom_tags_vpc_only" className="snap-top"><code>custom_tags_vpc_only</code></a></td>
        <td>A map of tags to apply just to the VPC itself, but not any of the other resources. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.</td>
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
        <td>How many AWS Availability Zones (AZs) to use. One subnet of each type (public, private app) will be created in each AZ. Note that this must be less than or equal to the total number of AZs in a region. A value of null means all AZs should be used. For example, if you specify 3 in a region with 5 AZs, subnets will be created in just 3 AZs instead of all 5. Defaults to 3.</td>
    </tr><tr>
        <td><a name="num_nat_gateways" href="#num_nat_gateways" className="snap-top"><code>num_nat_gateways</code></a></td>
        <td>The number of NAT Gateways to launch for this VPC. The management VPC defaults to 1 NAT Gateway to save on cost, but to increase redundancy, you can adjust this to add additional NAT Gateways.</td>
    </tr><tr>
        <td><a name="private_subnet_bits" href="#private_subnet_bits" className="snap-top"><code>private_subnet_bits</code></a></td>
        <td>Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information.</td>
    </tr><tr>
        <td><a name="private_subnet_cidr_blocks" href="#private_subnet_cidr_blocks" className="snap-top"><code>private_subnet_cidr_blocks</code></a></td>
        <td>A map listing the specific CIDR blocks desired for each private subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.</td>
    </tr><tr>
        <td><a name="private_subnet_custom_tags" href="#private_subnet_custom_tags" className="snap-top"><code>private_subnet_custom_tags</code></a></td>
        <td>A map of tags to apply to the private Subnet, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.</td>
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
        <td><a name="subnet_spacing" href="#subnet_spacing" className="snap-top"><code>subnet_spacing</code></a></td>
        <td>The amount of spacing between the different subnet types</td>
    </tr><tr>
        <td><a name="vpc_name" href="#vpc_name" className="snap-top"><code>vpc_name</code></a></td>
        <td>The name of the VPC. Defaults to mgmt.</td>
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
        <td><a name="nat_gateway_public_ips" href="#nat_gateway_public_ips" className="snap-top"><code>nat_gateway_public_ips</code></a></td>
        <td>The public IP address(es) of the NAT gateway(s) of the mgmt VPC.</td>
    </tr><tr>
        <td><a name="num_availability_zones" href="#num_availability_zones" className="snap-top"><code>num_availability_zones</code></a></td>
        <td>The number of availability zones used by the mgmt VPC.</td>
    </tr><tr>
        <td><a name="private_subnet_arns" href="#private_subnet_arns" className="snap-top"><code>private_subnet_arns</code></a></td>
        <td>The private subnet ARNs of the mgmt VPC.</td>
    </tr><tr>
        <td><a name="private_subnet_cidr_blocks" href="#private_subnet_cidr_blocks" className="snap-top"><code>private_subnet_cidr_blocks</code></a></td>
        <td>The private subnet CIDR blocks of the mgmt VPC.</td>
    </tr><tr>
        <td><a name="private_subnet_ids" href="#private_subnet_ids" className="snap-top"><code>private_subnet_ids</code></a></td>
        <td>The private subnet IDs of the mgmt VPC.</td>
    </tr><tr>
        <td><a name="private_subnet_route_table_ids" href="#private_subnet_route_table_ids" className="snap-top"><code>private_subnet_route_table_ids</code></a></td>
        <td>The ID of the private subnet route table of the mgmt VPC.</td>
    </tr><tr>
        <td><a name="public_subnet_arns" href="#public_subnet_arns" className="snap-top"><code>public_subnet_arns</code></a></td>
        <td>The public subnet ARNs of the mgmt VPC.</td>
    </tr><tr>
        <td><a name="public_subnet_cidr_blocks" href="#public_subnet_cidr_blocks" className="snap-top"><code>public_subnet_cidr_blocks</code></a></td>
        <td>The public subnet CIDR blocks of the mgmt VPC.</td>
    </tr><tr>
        <td><a name="public_subnet_ids" href="#public_subnet_ids" className="snap-top"><code>public_subnet_ids</code></a></td>
        <td>The public subnet IDs of the mgmt VPC.</td>
    </tr><tr>
        <td><a name="public_subnet_route_table_id" href="#public_subnet_route_table_id" className="snap-top"><code>public_subnet_route_table_id</code></a></td>
        <td>The ID of the public subnet route table of the mgmt VPC.</td>
    </tr><tr>
        <td><a name="vpc_cidr_block" href="#vpc_cidr_block" className="snap-top"><code>vpc_cidr_block</code></a></td>
        <td>The CIDR block of the mgmt VPC.</td>
    </tr><tr>
        <td><a name="vpc_id" href="#vpc_id" className="snap-top"><code>vpc_id</code></a></td>
        <td>The ID of the mgmt VPC.</td>
    </tr><tr>
        <td><a name="vpc_name" href="#vpc_name" className="snap-top"><code>vpc_name</code></a></td>
        <td>The name of the mgmt VPC.</td>
    </tr><tr>
        <td><a name="vpc_ready" href="#vpc_ready" className="snap-top"><code>vpc_ready</code></a></td>
        <td>Indicates whether or not the VPC has finished creating</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"cc6bda3bee8f6edaed91b53bfe0ff85d"}
##DOCS-SOURCER-END -->
