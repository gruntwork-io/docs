# Defense in depth

![Aerial view of Beaumaris Castle, showing multiple layers of walls for defense. Crown copyright 2016.](/img/guides/build-it-yourself/vpc/castle.jpeg)

People make mistakes all the time: forgetting to remove accounts, keeping ports open, including test credentials in
production code, etc. Rather than living in an idealized model where you assume people won’t make mistakes, you can
employ a [Defense in Depth](https://en.wikipedia.org/wiki/Defense_in_depth_(computing)) strategy of setting up multiple
layers of protection so that a failure in any single layer doesn’t immediately lead to disaster. You never want to be
one typo away from a security incident.

In the middle ages, castles were built with multiple layers of defense to ward off attackers: moat, outer wall, inner
wall, keep, defenders on the walls, and so on. Similarly, a production-grade VPC infrastructure will include multiple
layers of defense against attackers, including multiple VPCs, subnet tiers, security groups, NACLs, and so on, as
described in the next few sections.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "a416c8f8b2b950fe84740b0736f09765"
}
##DOCS-SOURCER-END -->
