import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Route 53 Hosted Zones

Manage DNS entries using https://aws.amazon.com/route53/:Amazon Route 53

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/networking/route53" className="link-button">View on GitHub</a>

### Reference

<Tabs>
<TabItem value="inputs" label="Inputs" default>

<a name="private_zones" className="snap-top"></a>

* [**`private_zones`**](#private_zones) &mdash; A map of private Route 53 Hosted Zones. In this map, the key should be the domain name. See examples below.

<a name="public_zones" className="snap-top"></a>

* [**`public_zones`**](#public_zones) &mdash; A map of public Route 53 Hosted Zones. In this map, the key should be the domain name. See examples below.

<a name="service_discovery_private_namespaces" className="snap-top"></a>

* [**`service_discovery_private_namespaces`**](#service_discovery_private_namespaces) &mdash; A map of domain names to configurations for setting up a new private namespace in AWS Cloud Map.

<a name="service_discovery_public_namespaces" className="snap-top"></a>

* [**`service_discovery_public_namespaces`**](#service_discovery_public_namespaces) &mdash; A map of domain names to configurations for setting up a new public namespace in AWS Cloud Map. Note that the domain name must be registered with Route 53.

</TabItem>
<TabItem value="outputs" label="Outputs">

<a name="acm_tls_certificates" className="snap-top"></a>

* [**`acm_tls_certificates`**](#acm_tls_certificates) &mdash; A list of ARNs of the wildcard and service discovery certificates that were provisioned along with the Route 53 zone.

<a name="private_domain_names" className="snap-top"></a>

* [**`private_domain_names`**](#private_domain_names) &mdash; The names of the internal-only Route 53 Hosted Zones

<a name="private_zones_ids" className="snap-top"></a>

* [**`private_zones_ids`**](#private_zones_ids) &mdash; The IDs of the internal-only Route 53 Hosted Zones

<a name="private_zones_name_servers" className="snap-top"></a>

* [**`private_zones_name_servers`**](#private_zones_name_servers) &mdash; The name servers associated with the internal-only Route 53 Hosted Zones

<a name="public_domain_names" className="snap-top"></a>

* [**`public_domain_names`**](#public_domain_names) &mdash; The names of the public Route 53 Hosted Zones

<a name="public_hosted_zone_map" className="snap-top"></a>

* [**`public_hosted_zone_map`**](#public_hosted_zone_map) &mdash; A map of domains to their zone IDs. IDs are user inputs, when supplied, and otherwise resource IDs

<a name="public_hosted_zones_ids" className="snap-top"></a>

* [**`public_hosted_zones_ids`**](#public_hosted_zones_ids) &mdash; The IDs of the public Route 53 Hosted Zones

<a name="public_hosted_zones_name_servers" className="snap-top"></a>

* [**`public_hosted_zones_name_servers`**](#public_hosted_zones_name_servers) &mdash; The name servers associated with the public Route 53 Hosted Zones

<a name="service_discovery_private_namespaces" className="snap-top"></a>

* [**`service_discovery_private_namespaces`**](#service_discovery_private_namespaces) &mdash; A map of domains to resource arns and hosted zones of the created Service Discovery Private Namespaces.

<a name="service_discovery_public_namespaces" className="snap-top"></a>

* [**`service_discovery_public_namespaces`**](#service_discovery_public_namespaces) &mdash; A map of domains to resource arns and hosted zones of the created Service Discovery Public Namespaces.

</TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"service-catalog-api","hash":"28151d6a249ed9a43b593961c28ae574"}
##DOCS-SOURCER-END -->
