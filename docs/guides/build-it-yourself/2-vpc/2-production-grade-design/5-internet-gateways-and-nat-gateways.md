# Internet Gateways and NAT Gateways

If the resources in your VPC need to be able to reach the outside world, you’ll need to deploy an Internet Gateway and
NAT Gateway:

<div className="dlist">

#### Internet Gateway

Deploy an Internet Gateway and configure a fallback route (i.e., `0.0.0.0/0`) in your public subnets to send traffic
to this Gateway. You only need one Internet Gateway per VPC, as AWS will handle auto scaling and auto healing for this
managed service completely automatically.

#### NAT Gateways

If you have resources in your private application or private persistence subnets that need to make outbound calls to
the public Internet (e.g., to call a 3rd party API), you’ll need to deploy one or more NAT Gateways in your public
subnets. In pre-prod environments, a single NAT Gateway is probably enough, but to get high availability in
production, you may want to deploy multiple NAT Gateways, each one in a different availability zone.

</div>

    Each NAT Gateway should get an Elastic IP Address so that it has a consistent IP address you (and your
    customers/partners) can use in firewalls. In each of your private subnets, you’ll need to configure a fallback route
    (i.e., `0.0.0.0/0`) to point to one of your NAT Gateway (if using multiple NAT Gateways, point to the one in the same
    availability zone as the subnet itself).


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"4d81dd25ee886679c16bf82378f8c428"}
##DOCS-SOURCER-END -->
