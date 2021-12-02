import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Kubernetes Namespace

Provision a best practices Kubernetes Namespace on any Kubernetes Cluster.

<a href="https://github.com/gruntwork-io/terraform-aws-service-catalog/tree/master/modules/services/k8s-namespace" class="link-button">View on GitHub</a>

<Tabs>
  <TabItem value="inputs" label="Inputs" default>
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>annotations</td>
        <td>Map of string key default pairs that can be used to store arbitrary metadata on the namespace and roles. See the Kubernetes Reference for more info (https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/).</td>
    </tr><tr>
        <td>eks_cluster_name</td>
        <td>Name of the EKS cluster where the Namespace will be created. Required when var.schedule_pods_on_fargate is `true`.</td>
    </tr><tr>
        <td>full_access_rbac_entities</td>
        <td>The list of RBAC entities that should have full access to the Namespace.</td>
    </tr><tr>
        <td>labels</td>
        <td>Map of string key value pairs that can be used to organize and categorize the namespace and roles. See the Kubernetes Reference for more info (https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).</td>
    </tr><tr>
        <td>name</td>
        <td>Name of the Namespace to create.</td>
    </tr><tr>
        <td>pod_execution_iam_role_arn</td>
        <td>ARN of IAM Role to use as the Pod execution role for Fargate. Required if var.schedule_pods_on_fargate is true.</td>
    </tr><tr>
        <td>read_only_access_rbac_entities</td>
        <td>The list of RBAC entities that should have read only access to the Namespace.</td>
    </tr><tr>
        <td>schedule_pods_on_fargate</td>
        <td>When true, will create a Fargate Profile that matches all Pods in the Namespace. This means that all Pods in the Namespace will be scheduled on Fargate. Note that this value is only used if var.kubeconfig_auth_type is eks, as Fargate profiles can only be created against EKS clusters.</td>
    </tr><tr>
        <td>worker_vpc_subnet_ids</td>
        <td>The subnet IDs to use for EKS worker nodes. Used when provisioning Pods on to Fargate. At least 1 subnet is required if var.schedule_pods_on_fargate is true.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
  <TabItem value="outputs" label="Outputs">
    <table>
        <thead>
            <tr>
                <td>Variable name</td>
                <td>Description</td>
            </tr>
        </thead>
        <tbody>
            <tr>
        <td>namespace_name</td>
        <td>The name of the created namespace.</td>
    </tr><tr>
        <td>namespace_rbac_access_all_role</td>
        <td>The name of the rbac role that grants admin level permissions on the namespace.</td>
    </tr><tr>
        <td>namespace_rbac_access_read_only_role</td>
        <td>The name of the rbac role that grants read only permissions on the namespace.</td>
    </tr>
        </tbody>
    </table>
  </TabItem>
</Tabs>


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"d2ff7bc8f54052fd0a4fc1f2724b7326"}
##DOCS-SOURCER-END -->
