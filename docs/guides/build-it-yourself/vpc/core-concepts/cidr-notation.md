# CIDR notation

When dealing with networking, you often need to reason about ranges of IPs, such as "all IP addresses between
`172.31.0.0` and `172.31.255.255`" (there are 65,536 IP addresses in this range). The de facto standard for
representing IP address ranges is called
_[Classless Inter-Domain Routing (CIDR) notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)_. For
example, the same 65,536 IP addresses can be represented in CIDR notation as `172.31.0.0/16`. This notation includes
the _IP address_ (`172.31.0.0`) and the _number of bits in the mask_ (`/16`). To understand what the notation means,
you:

1.  Convert the IP address to binary: e.g., `172.31.0.0` in binary is `10101100.00011111.00000000.00000000`.

2.  The mask tells you how many bits of the binary IP address identify the network (and stay constant for everything in
    that network) and how many bits identify unique hosts (and therefore, can vary). For a `/16` mask, the
    left-most 16 bits stay constant, while the right-most 16 bits are allowed to vary.

3.  Putting that together, `172.31.0.0/16` represents all IP addresses from `10101100.00011111.00000000.00000000`
    (`172.31.0.0`) to `10101100.00011111.11111111.11111111` (`172.31.255.255`).

A few handy notes:

<div className="dlist">

#### CIDR calculators

You can use [online CIDR calculators](http://cidr.xyz/) to quickly do the math for you.

#### CIDR blocks

IP addresses expressed in CIDR notation are often called CIDR Blocks.

#### All IPs

The CIDR Block `0.0.0.0/0` corresponds to all IP address.

#### Single IPs

To specify a single IP address (e.g., the IP of a specific server), use the `/32` mask: e.g., `4.4.4.4/32` is the
CIDR notation for just one IP, `4.4.4.4`.

</div>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"7b2b8b88ad17636beedfea22b23770f8"}
##DOCS-SOURCER-END -->
