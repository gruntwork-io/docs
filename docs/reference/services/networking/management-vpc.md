import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Management VPC

Deploy a VPC  on AWS for administrative and management functions.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/vpc-mgmt" class="link-button">View on GitHub</a>

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>availability_zone_exclude_ids</td>
        <td>List of excluded Availability Zone IDs.</td>
    </tr><tr>
        <td>availability_zone_exclude_names</td>
        <td>List of excluded Availability Zone names.</td>
    </tr><tr>
        <td>availability_zone_state</td>
        <td>Allows to filter list of Availability Zones based on their current state. Can be either "available", "information", "impaired" or "unavailable". By default the list includes a complete set of Availability Zones to which the underlying AWS account has access, regardless of their state.</td>
    </tr><tr>
        <td>aws_region</td>
        <td>The AWS region to deploy into</td>
    </tr><tr>
        <td>cidr_block</td>
        <td>The IP address range of the VPC in CIDR notation. A prefix of /16 is recommended. Do not use a prefix higher than /27. Examples include '10.100.0.0/16', '10.200.0.0/16', etc.</td>
    </tr><tr>
        <td>create_flow_logs</td>
        <td>If you set this variable to false, this module will not create VPC Flow Logs resources. This is used as a workaround because Terraform does not allow you to use the 'count' parameter on modules. By using this parameter, you can optionally create or not create the resources within this module.</td>
    </tr><tr>
        <td>create_network_acls</td>
        <td>If set to false, this module will NOT create Network ACLs. This is useful if you don't want to use Network ACLs or you want to provide your own Network ACLs outside of this module.</td>
    </tr><tr>
        <td>custom_tags</td>
        <td>A map of tags to apply to the VPC, Subnets, Route Tables, and Internet Gateway. The key is the tag name and the value is the tag value. Note that the tag 'Name' is automatically added by this module but may be optionally overwritten by this variable.</td>
    </tr><tr>
        <td>custom_tags_vpc_only</td>
        <td>A map of tags to apply just to the VPC itself, but not any of the other resources. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.</td>
    </tr><tr>
        <td>kms_key_arn</td>
        <td>The ARN of a KMS key to use for encrypting VPC the flow log. A new KMS key will be created if this is not supplied.</td>
    </tr><tr>
        <td>kms_key_user_iam_arns</td>
        <td>VPC Flow Logs will be encrypted with a KMS Key (a Customer Master Key). The IAM Users specified in this list will have access to this key.</td>
    </tr><tr>
        <td>nat_gateway_custom_tags</td>
        <td>A map of tags to apply to the NAT gateways, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.</td>
    </tr><tr>
        <td>num_availability_zones</td>
        <td>How many AWS Availability Zones (AZs) to use. One subnet of each type (public, private app) will be created in each AZ. Note that this must be less than or equal to the total number of AZs in a region. A value of null means all AZs should be used. For example, if you specify 3 in a region with 5 AZs, subnets will be created in just 3 AZs instead of all 5. Defaults to 3.</td>
    </tr><tr>
        <td>num_nat_gateways</td>
        <td>The number of NAT Gateways to launch for this VPC. The management VPC defaults to 1 NAT Gateway to save on cost, but to increase redundancy, you can adjust this to add additional NAT Gateways.</td>
    </tr><tr>
        <td>private_subnet_bits</td>
        <td>Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information.</td>
    </tr><tr>
        <td>private_subnet_cidr_blocks</td>
        <td>A map listing the specific CIDR blocks desired for each private subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.</td>
    </tr><tr>
        <td>private_subnet_custom_tags</td>
        <td>A map of tags to apply to the private Subnet, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.</td>
    </tr><tr>
        <td>public_subnet_bits</td>
        <td>Takes the CIDR prefix and adds these many bits to it for calculating subnet ranges.  MAKE SURE if you change this you also change the CIDR spacing or you may hit errors.  See cidrsubnet interpolation in terraform config for more information.</td>
    </tr><tr>
        <td>public_subnet_cidr_blocks</td>
        <td>A map listing the specific CIDR blocks desired for each public subnet. The key must be in the form AZ-0, AZ-1, ... AZ-n where n is the number of Availability Zones. If left blank, we will compute a reasonable CIDR block for each subnet.</td>
    </tr><tr>
        <td>public_subnet_custom_tags</td>
        <td>A map of tags to apply to the public Subnet, on top of the custom_tags. The key is the tag name and the value is the tag value. Note that tags defined here will override tags defined as custom_tags in case of conflict.</td>
    </tr><tr>
        <td>subnet_spacing</td>
        <td>The amount of spacing between the different subnet types</td>
    </tr><tr>
        <td>vpc_name</td>
        <td>The name of the VPC. Defaults to mgmt.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>nat_gateway_public_ips</td>
        <td>The public IP address(es) of the NAT gateway(s) of the mgmt VPC.</td>
    </tr><tr>
        <td>num_availability_zones</td>
        <td>The number of availability zones used by the mgmt VPC.</td>
    </tr><tr>
        <td>private_subnet_arns</td>
        <td>The private subnet ARNs of the mgmt VPC.</td>
    </tr><tr>
        <td>private_subnet_cidr_blocks</td>
        <td>The private subnet CIDR blocks of the mgmt VPC.</td>
    </tr><tr>
        <td>private_subnet_ids</td>
        <td>The private subnet IDs of the mgmt VPC.</td>
    </tr><tr>
        <td>private_subnet_route_table_ids</td>
        <td>The ID of the private subnet route table of the mgmt VPC.</td>
    </tr><tr>
        <td>public_subnet_arns</td>
        <td>The public subnet ARNs of the mgmt VPC.</td>
    </tr><tr>
        <td>public_subnet_cidr_blocks</td>
        <td>The public subnet CIDR blocks of the mgmt VPC.</td>
    </tr><tr>
        <td>public_subnet_ids</td>
        <td>The public subnet IDs of the mgmt VPC.</td>
    </tr><tr>
        <td>public_subnet_route_table_id</td>
        <td>The ID of the public subnet route table of the mgmt VPC.</td>
    </tr><tr>
        <td>vpc_cidr_block</td>
        <td>The CIDR block of the mgmt VPC.</td>
    </tr><tr>
        <td>vpc_id</td>
        <td>The ID of the mgmt VPC.</td>
    </tr><tr>
        <td>vpc_name</td>
        <td>The name of the mgmt VPC.</td>
    </tr><tr>
        <td>vpc_ready</td>
        <td>Indicates whether or not the VPC has finished creating</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"5d12ca681da23b1e62e7d0bc8932f369"}
##DOCS-SOURCER-END -->
