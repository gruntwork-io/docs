import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Route 53 Hosted Zones

Manage DNS entries using https://aws.amazon.com/route53/:Amazon Route 53

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/route53" className="link-button">View on GitHub</a>

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
        <td><a name="private_zones" href="#private_zones" className="snap-top"><code>private_zones</code></a></td>
        <td>A map of private Route 53 Hosted Zones. In this map, the key should be the domain name. See examples below.</td>
    </tr><tr>
        <td><a name="public_zones" href="#public_zones" className="snap-top"><code>public_zones</code></a></td>
        <td>A map of public Route 53 Hosted Zones. In this map, the key should be the domain name. See examples below.</td>
    </tr><tr>
        <td><a name="service_discovery_private_namespaces" href="#service_discovery_private_namespaces" className="snap-top"><code>service_discovery_private_namespaces</code></a></td>
        <td>A map of domain names to configurations for setting up a new private namespace in AWS Cloud Map.</td>
    </tr><tr>
        <td><a name="service_discovery_public_namespaces" href="#service_discovery_public_namespaces" className="snap-top"><code>service_discovery_public_namespaces</code></a></td>
        <td>A map of domain names to configurations for setting up a new public namespace in AWS Cloud Map. Note that the domain name must be registered with Route 53.</td>
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
        <td><a name="acm_tls_certificates" href="#acm_tls_certificates" className="snap-top"><code>acm_tls_certificates</code></a></td>
        <td>A list of ARNs of the wildcard and service discovery certificates that were provisioned along with the Route 53 zone.</td>
    </tr><tr>
        <td><a name="private_domain_names" href="#private_domain_names" className="snap-top"><code>private_domain_names</code></a></td>
        <td>The names of the internal-only Route 53 Hosted Zones</td>
    </tr><tr>
        <td><a name="private_zones_ids" href="#private_zones_ids" className="snap-top"><code>private_zones_ids</code></a></td>
        <td>The IDs of the internal-only Route 53 Hosted Zones</td>
    </tr><tr>
        <td><a name="private_zones_name_servers" href="#private_zones_name_servers" className="snap-top"><code>private_zones_name_servers</code></a></td>
        <td>The name servers associated with the internal-only Route 53 Hosted Zones</td>
    </tr><tr>
        <td><a name="public_domain_names" href="#public_domain_names" className="snap-top"><code>public_domain_names</code></a></td>
        <td>The names of the public Route 53 Hosted Zones</td>
    </tr><tr>
        <td><a name="public_hosted_zone_map" href="#public_hosted_zone_map" className="snap-top"><code>public_hosted_zone_map</code></a></td>
        <td>A map of domains to their zone IDs. IDs are user inputs, when supplied, and otherwise resource IDs</td>
    </tr><tr>
        <td><a name="public_hosted_zones_ids" href="#public_hosted_zones_ids" className="snap-top"><code>public_hosted_zones_ids</code></a></td>
        <td>The IDs of the public Route 53 Hosted Zones</td>
    </tr><tr>
        <td><a name="public_hosted_zones_name_servers" href="#public_hosted_zones_name_servers" className="snap-top"><code>public_hosted_zones_name_servers</code></a></td>
        <td>The name servers associated with the public Route 53 Hosted Zones</td>
    </tr><tr>
        <td><a name="service_discovery_private_namespaces" href="#service_discovery_private_namespaces" className="snap-top"><code>service_discovery_private_namespaces</code></a></td>
        <td>A map of domains to resource arns and hosted zones of the created Service Discovery Private Namespaces.</td>
    </tr><tr>
        <td><a name="service_discovery_public_namespaces" href="#service_discovery_public_namespaces" className="snap-top"><code>service_discovery_public_namespaces</code></a></td>
        <td>A map of domains to resource arns and hosted zones of the created Service Discovery Public Namespaces.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"f56d0235ac6ca678cd268ac546f712b8"}
##DOCS-SOURCER-END -->
