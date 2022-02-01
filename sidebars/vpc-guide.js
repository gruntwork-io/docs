const sidebar = [
  {
    label: "Build Your Own Architecture",
    type: "link",
    href: "/guides/build-it-yourself",
    className: "back-button",
  },
  {
    label: "VPC Guide",
    type: "category",
    link: {
      type: "doc",
      id: "guides/build-it-yourself/vpc/index",
    },
    items: [
      {
        "Core Concepts": [
          "guides/build-it-yourself/vpc/core-concepts/what-is-a-vpc",
          "guides/build-it-yourself/vpc/core-concepts/default-vp-cs-and-custom-vp-cs",
          "guides/build-it-yourself/vpc/core-concepts/vpc-ip-addresses",
          "guides/build-it-yourself/vpc/core-concepts/cidr-notation",
          "guides/build-it-yourself/vpc/core-concepts/subnets",
          "guides/build-it-yourself/vpc/core-concepts/route-tables",
          "guides/build-it-yourself/vpc/core-concepts/internet-gateways-public-subnets-and-private-subnets",
          "guides/build-it-yourself/vpc/core-concepts/nat-gateways",
          "guides/build-it-yourself/vpc/core-concepts/security-groups",
          "guides/build-it-yourself/vpc/core-concepts/network-ac-ls",
          "guides/build-it-yourself/vpc/core-concepts/vpc-peering",
          "guides/build-it-yourself/vpc/core-concepts/vpc-endpoints",
          "guides/build-it-yourself/vpc/core-concepts/regions-and-availability-zones",
        ],
      },
      {
        "Production Grade Design": [
          "guides/build-it-yourself/vpc/production-grade-design/intro",
          "guides/build-it-yourself/vpc/production-grade-design/defense-in-depth",
          "guides/build-it-yourself/vpc/production-grade-design/multiple-aws-accounts",
          "guides/build-it-yourself/vpc/production-grade-design/multiple-vp-cs",
          "guides/build-it-yourself/vpc/production-grade-design/multiple-subnet-tiers",
          "guides/build-it-yourself/vpc/production-grade-design/security-groups-and-nac-ls",
          "guides/build-it-yourself/vpc/production-grade-design/internet-gateways-and-nat-gateways",
          "guides/build-it-yourself/vpc/production-grade-design/bastion-host",
        ],
      },
      {
        "Deployment walkthrough": [
          "guides/build-it-yourself/vpc/deployment-walkthrough/pre-requisites",
          "guides/build-it-yourself/vpc/deployment-walkthrough/deploy-a-management-vpc",
          "guides/build-it-yourself/vpc/deployment-walkthrough/deploy-application-vp-cs",
          "guides/build-it-yourself/vpc/deployment-walkthrough/deploy-a-bastion-host",
          "guides/build-it-yourself/vpc/deployment-walkthrough/clean-up-default-vp-cs-and-security-groups",
        ],
      },
      "guides/build-it-yourself/vpc/next-steps",
    ],
  },
]

module.exports = sidebar
