import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Route 53 Hosted Zones

Manage DNS entries using https://aws.amazon.com/route53/:Amazon Route 53

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/route53" class="link-button">View on GitHub</a>

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
        <td>private_zones</td>
        <td>A map of private Route 53 Hosted Zones. In this map, the key should be the domain name. See examples below.</td>
    </tr><tr>
        <td>public_zones</td>
        <td>A map of public Route 53 Hosted Zones. In this map, the key should be the domain name. See examples below.</td>
    </tr><tr>
        <td>service_discovery_private_namespaces</td>
        <td>A map of domain names to configurations for setting up a new private namespace in AWS Cloud Map.</td>
    </tr><tr>
        <td>service_discovery_public_namespaces</td>
        <td>A map of domain names to configurations for setting up a new public namespace in AWS Cloud Map. Note that the domain name must be registered with Route 53.</td>
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
        <td>acm_tls_certificates</td>
        <td>A list of ARNs of the wildcard and service discovery certificates that were provisioned along with the Route 53 zone.</td>
    </tr><tr>
        <td>private_domain_names</td>
        <td>The names of the internal-only Route 53 Hosted Zones</td>
    </tr><tr>
        <td>private_zones_ids</td>
        <td>The IDs of the internal-only Route 53 Hosted Zones</td>
    </tr><tr>
        <td>private_zones_name_servers</td>
        <td>The name servers associated with the internal-only Route 53 Hosted Zones</td>
    </tr><tr>
        <td>public_domain_names</td>
        <td>The names of the public Route 53 Hosted Zones</td>
    </tr><tr>
        <td>public_hosted_zone_map</td>
        <td>A map of domains to their zone IDs. IDs are user inputs, when supplied, and otherwise resource IDs</td>
    </tr><tr>
        <td>public_hosted_zones_ids</td>
        <td>The IDs of the public Route 53 Hosted Zones</td>
    </tr><tr>
        <td>public_hosted_zones_name_servers</td>
        <td>The name servers associated with the public Route 53 Hosted Zones</td>
    </tr><tr>
        <td>service_discovery_private_namespaces</td>
        <td>A map of domains to resource arns and hosted zones of the created Service Discovery Private Namespaces.</td>
    </tr><tr>
        <td>service_discovery_public_namespaces</td>
        <td>A map of domains to resource arns and hosted zones of the created Service Discovery Public Namespaces.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"d82c9bcdbf18b8462d7cd6238c46998a"}
##DOCS-SOURCER-END -->
