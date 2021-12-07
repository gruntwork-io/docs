import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Route 53 Hosted Zones

Manage DNS entries using https://aws.amazon.com/route53/:Amazon Route 53

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/route53" className="link-button">View on GitHub</a>

### Reference

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <ul>
      
    <li>
      <p>
        <a name="private_zones" href="#private_zones" className="snap-top">
          <code>private_zones</code>
        </a> - A map of private Route 53 Hosted Zones. In this map, the key should be the domain name. See examples below.
      </p>
    </li>
    <li>
      <p>
        <a name="public_zones" href="#public_zones" className="snap-top">
          <code>public_zones</code>
        </a> - A map of public Route 53 Hosted Zones. In this map, the key should be the domain name. See examples below.
      </p>
    </li>
    <li>
      <p>
        <a name="service_discovery_private_namespaces" href="#service_discovery_private_namespaces" className="snap-top">
          <code>service_discovery_private_namespaces</code>
        </a> - A map of domain names to configurations for setting up a new private namespace in AWS Cloud Map.
      </p>
    </li>
    <li>
      <p>
        <a name="service_discovery_public_namespaces" href="#service_discovery_public_namespaces" className="snap-top">
          <code>service_discovery_public_namespaces</code>
        </a> - A map of domain names to configurations for setting up a new public namespace in AWS Cloud Map. Note that the domain name must be registered with Route 53.
      </p>
    </li>
    </ul>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <ul>
      
    <li>
      <p>
        <a name="acm_tls_certificates" href="#acm_tls_certificates" className="snap-top">
          <code>acm_tls_certificates</code>
        </a> - A list of ARNs of the wildcard and service discovery certificates that were provisioned along with the Route 53 zone.
      </p>
    </li>
    <li>
      <p>
        <a name="private_domain_names" href="#private_domain_names" className="snap-top">
          <code>private_domain_names</code>
        </a> - The names of the internal-only Route 53 Hosted Zones
      </p>
    </li>
    <li>
      <p>
        <a name="private_zones_ids" href="#private_zones_ids" className="snap-top">
          <code>private_zones_ids</code>
        </a> - The IDs of the internal-only Route 53 Hosted Zones
      </p>
    </li>
    <li>
      <p>
        <a name="private_zones_name_servers" href="#private_zones_name_servers" className="snap-top">
          <code>private_zones_name_servers</code>
        </a> - The name servers associated with the internal-only Route 53 Hosted Zones
      </p>
    </li>
    <li>
      <p>
        <a name="public_domain_names" href="#public_domain_names" className="snap-top">
          <code>public_domain_names</code>
        </a> - The names of the public Route 53 Hosted Zones
      </p>
    </li>
    <li>
      <p>
        <a name="public_hosted_zone_map" href="#public_hosted_zone_map" className="snap-top">
          <code>public_hosted_zone_map</code>
        </a> - A map of domains to their zone IDs. IDs are user inputs, when supplied, and otherwise resource IDs
      </p>
    </li>
    <li>
      <p>
        <a name="public_hosted_zones_ids" href="#public_hosted_zones_ids" className="snap-top">
          <code>public_hosted_zones_ids</code>
        </a> - The IDs of the public Route 53 Hosted Zones
      </p>
    </li>
    <li>
      <p>
        <a name="public_hosted_zones_name_servers" href="#public_hosted_zones_name_servers" className="snap-top">
          <code>public_hosted_zones_name_servers</code>
        </a> - The name servers associated with the public Route 53 Hosted Zones
      </p>
    </li>
    <li>
      <p>
        <a name="service_discovery_private_namespaces" href="#service_discovery_private_namespaces" className="snap-top">
          <code>service_discovery_private_namespaces</code>
        </a> - A map of domains to resource arns and hosted zones of the created Service Discovery Private Namespaces.
      </p>
    </li>
    <li>
      <p>
        <a name="service_discovery_public_namespaces" href="#service_discovery_public_namespaces" className="snap-top">
          <code>service_discovery_public_namespaces</code>
        </a> - A map of domains to resource arns and hosted zones of the created Service Discovery Public Namespaces.
      </p>
    </li>
    </ul>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"72427b5e9ed7cdda26633a198e5f2bd0"}
##DOCS-SOURCER-END -->
