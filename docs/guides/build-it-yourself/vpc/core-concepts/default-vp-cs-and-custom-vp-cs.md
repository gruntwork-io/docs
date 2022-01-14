# Default VPCs and custom VPCs

A quick overview of VPCs:

<div className="dlist">

#### Before VPCs

When AWS first launched, it did not support VPCs, so every resource you launched in your AWS account (e.g., every EC2
instance) was effectively in a single, large, public IP address space that could be accessed by anyone, anywhere,
over the public Internet (unless you blocked it using security groups and OS-level firewalls):

</div>

![Before VPCs, all your AWS resources were in one global IP address space anyone could access (unless you blocked them via security groups or firewalls)](/img/guides/build-it-yourself/vpc/no-vpc-diagram.png)

From a security standpoint, this represented a step backwards compared to traditional data centers where you could
configure most of your servers so they were physically unreachable from the public Internet.

<div className="dlist">

#### VPCs are introduced

Around 2009, AWS added support for VPCs to allow you to better isolate your resources. For example, you could create
one VPC for a staging environment that is completely isolated from (that is, has no way to talk to) a separate VPC for
your production environment:

</div>

![With VPCs, you could separate your AWS resources into completely isolated networks](/img/guides/build-it-yourself/vpc/vpc-no-subnets-diagram.png)

You’ll see later in this guide how you can use VPCs, route tables, subnets, security groups, and NACLs to get
fine-grained control over what network traffic can or can’t reach your AWS resources.

<div className="dlist">

#### Default VPCs

Every AWS account created after 2013 requires that you use a VPC for just about all resources. If you don’t specify a
VPC, your resource will be deployed into the
[_Default VPC_](https://docs.aws.amazon.com/vpc/latest/userguide/default-vpc.html) in your AWS account. The Default VPC
is great for learning and experimenting, but it is not a good choice for production use cases. That’s because the
default settings in the Default VPC makes all your resources accessible on the public Internet, a bit like having no
VPC at all. You can modify those settings to lock things down more, but it’s a lot of settings to change, and as
nothing in the Default VPC is managed as code (it’s all automatically created for you behind the scenes by AWS),
you’re typically better off creating a new, custom VPC.

#### Custom VPCs

For any production use cases, you should create a _custom VPC_. In the [Production-grade design](../production-grade-design/intro.md) section, we’ll go
over how to configure a VPC with the kind of security, scalability, and high availability you need in production.

</div>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"6590a3524e17c9eb1805818e98c04514"}
##DOCS-SOURCER-END -->
