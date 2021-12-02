import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kubernetes Namespace

Provision a best practices Kubernetes Namespace on any Kubernetes Cluster.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/k8s-namespace" className="link-button">View on GitHub</a>

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
        <td><a name="annotations" href="#annotations" className="snap-top"><code>annotations</code></a></td>
        <td>Map of string key default pairs that can be used to store arbitrary metadata on the namespace and roles. See the Kubernetes Reference for more info (https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/).</td>
    </tr><tr>
        <td><a name="eks_cluster_name" href="#eks_cluster_name" className="snap-top"><code>eks_cluster_name</code></a></td>
        <td>Name of the EKS cluster where the Namespace will be created. Required when var.schedule_pods_on_fargate is `true`.</td>
    </tr><tr>
        <td><a name="full_access_rbac_entities" href="#full_access_rbac_entities" className="snap-top"><code>full_access_rbac_entities</code></a></td>
        <td>The list of RBAC entities that should have full access to the Namespace.</td>
    </tr><tr>
        <td><a name="labels" href="#labels" className="snap-top"><code>labels</code></a></td>
        <td>Map of string key value pairs that can be used to organize and categorize the namespace and roles. See the Kubernetes Reference for more info (https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).</td>
    </tr><tr>
        <td><a name="name" href="#name" className="snap-top"><code>name</code></a></td>
        <td>Name of the Namespace to create.</td>
    </tr><tr>
        <td><a name="pod_execution_iam_role_arn" href="#pod_execution_iam_role_arn" className="snap-top"><code>pod_execution_iam_role_arn</code></a></td>
        <td>ARN of IAM Role to use as the Pod execution role for Fargate. Required if var.schedule_pods_on_fargate is true.</td>
    </tr><tr>
        <td><a name="read_only_access_rbac_entities" href="#read_only_access_rbac_entities" className="snap-top"><code>read_only_access_rbac_entities</code></a></td>
        <td>The list of RBAC entities that should have read only access to the Namespace.</td>
    </tr><tr>
        <td><a name="schedule_pods_on_fargate" href="#schedule_pods_on_fargate" className="snap-top"><code>schedule_pods_on_fargate</code></a></td>
        <td>When true, will create a Fargate Profile that matches all Pods in the Namespace. This means that all Pods in the Namespace will be scheduled on Fargate. Note that this value is only used if var.kubeconfig_auth_type is eks, as Fargate profiles can only be created against EKS clusters.</td>
    </tr><tr>
        <td><a name="worker_vpc_subnet_ids" href="#worker_vpc_subnet_ids" className="snap-top"><code>worker_vpc_subnet_ids</code></a></td>
        <td>The subnet IDs to use for EKS worker nodes. Used when provisioning Pods on to Fargate. At least 1 subnet is required if var.schedule_pods_on_fargate is true.</td>
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
        <td><a name="namespace_name" href="#namespace_name" className="snap-top"><code>namespace_name</code></a></td>
        <td>The name of the created namespace.</td>
    </tr><tr>
        <td><a name="namespace_rbac_access_all_role" href="#namespace_rbac_access_all_role" className="snap-top"><code>namespace_rbac_access_all_role</code></a></td>
        <td>The name of the rbac role that grants admin level permissions on the namespace.</td>
    </tr><tr>
        <td><a name="namespace_rbac_access_read_only_role" href="#namespace_rbac_access_read_only_role" className="snap-top"><code>namespace_rbac_access_read_only_role</code></a></td>
        <td>The name of the rbac role that grants read only permissions on the namespace.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"6a8c339d2d100738ed0455225bba96aa"}
##DOCS-SOURCER-END -->
