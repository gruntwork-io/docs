const sidebar = [
  {
    label: "Build Your Own Architecture",
    type: "link",
    href: "/guides/build-it-yourself",
    className: "back-button",
  },
  {
    label: "Kubernetes Guide",
    type: "category",
    link: {
      type: "doc",
      id: "guides/build-it-yourself/kubernetes-cluster/index",
    },
    items: [
      {
        "Core Concepts": [
          "guides/build-it-yourself/kubernetes-cluster/core-concepts/what-is-kubernetes",
          "guides/build-it-yourself/kubernetes-cluster/core-concepts/why-kubernetes",
          "guides/build-it-yourself/kubernetes-cluster/core-concepts/kubernetes-architecture",
          "guides/build-it-yourself/kubernetes-cluster/core-concepts/kubernetes-access-control",
          "guides/build-it-yourself/kubernetes-cluster/core-concepts/interacting-with-kubernetes",
          "guides/build-it-yourself/kubernetes-cluster/core-concepts/kubernetes-resources",
          "guides/build-it-yourself/kubernetes-cluster/core-concepts/options-for-running-kubernetes-in-aws",
        ],
      },
      {
        "Production Grade Design": [
          "guides/build-it-yourself/kubernetes-cluster/production-grade-design/intro",
          "guides/build-it-yourself/kubernetes-cluster/production-grade-design/use-eks",
          "guides/build-it-yourself/kubernetes-cluster/production-grade-design/vpc-configuration",
          "guides/build-it-yourself/kubernetes-cluster/production-grade-design/control-plane",
          "guides/build-it-yourself/kubernetes-cluster/production-grade-design/worker-nodes",
          "guides/build-it-yourself/kubernetes-cluster/production-grade-design/authenticate",
          "guides/build-it-yourself/kubernetes-cluster/production-grade-design/iam-role-mapping-and-rbac",
          "guides/build-it-yourself/kubernetes-cluster/production-grade-design/logging",
          "guides/build-it-yourself/kubernetes-cluster/production-grade-design/protecting-pods",
        ],
      },
      {
        "Deployment Walkthrough": [
          "guides/build-it-yourself/kubernetes-cluster/deployment-walkthrough/pre-requisites",
          "guides/build-it-yourself/kubernetes-cluster/deployment-walkthrough/deploy-the-vpc",
          "guides/build-it-yourself/kubernetes-cluster/deployment-walkthrough/configure-the-control-plane",
          "guides/build-it-yourself/kubernetes-cluster/deployment-walkthrough/configure-the-worker-nodes",
          "guides/build-it-yourself/kubernetes-cluster/deployment-walkthrough/create-the-worker-node-ami",
          "guides/build-it-yourself/kubernetes-cluster/deployment-walkthrough/configure-the-worker-node-user-data-script",
          "guides/build-it-yourself/kubernetes-cluster/deployment-walkthrough/configure-logging-metrics-and-alarms-for-the-worker-nodes",
          "guides/build-it-yourself/kubernetes-cluster/deployment-walkthrough/configure-role-mapping",
          "guides/build-it-yourself/kubernetes-cluster/deployment-walkthrough/configure-access-to-the-control-plane-and-worker-nodes",
          "guides/build-it-yourself/kubernetes-cluster/deployment-walkthrough/deploy-the-eks-cluster",
          "guides/build-it-yourself/kubernetes-cluster/deployment-walkthrough/try-out-the-cluster",
          "guides/build-it-yourself/kubernetes-cluster/deployment-walkthrough/updating-the-worker-nodes",
        ],
      },
      "guides/build-it-yourself/kubernetes-cluster/next-steps",
    ],
  },
]

module.exports = sidebar
