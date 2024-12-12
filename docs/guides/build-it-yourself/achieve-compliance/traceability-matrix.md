# Traceability matrix

Use the table below as a quick reference to map the CIS AWS Foundations Benchmark recommendations to the
sections above.


<table className="tableblock frame-all grid-all stretch">
  <colgroup>
    <col style={{ width: "3.8461%" }} />
    <col style={{ width: "3.8461%" }} />
    <col style={{ width: "3.8461%" }} />
  </colgroup>
  <tbody>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">#</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">Section</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">Description</p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.1</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/production-grade-design/identity-and-access-management#answer-security-questions-and-complete-contact-details">
            Answer security questions and complete contact details
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Complete the contact details on the AWS account page
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.2</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/production-grade-design/identity-and-access-management#answer-security-questions-and-complete-contact-details">
            Answer security questions and complete contact details
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Complete the security contact information on the AWS account page
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.3</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/production-grade-design/identity-and-access-management#answer-security-questions-and-complete-contact-details">
            Answer security questions and complete contact details
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Answer the security questions on the AWS account page
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.4</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-root-to-root-account">
            Apply the <code>account-baseline-root</code> baseline to the root
            account
          </a>

          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-security-to-security-account">
            Apply the <code>account-baseline-security</code> to the security
            account
          </a>

          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-app-to-logs-account">
            Apply the <code>account-baseline-app</code> to the logs account
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>account-baseline-*</code> modules to set up your
          accounts. This will ensure that the Security Hub service is enabled,
          which will notify you if the root user has access keys set
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.5</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/production-grade-design/identity-and-access-management#enable-mfa-for-the-root-account">Enable MFA for the root account</a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">Manually configure MFA for the root user</p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.6</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/production-grade-design/identity-and-access-management#enable-mfa-for-the-root-account">Enable MFA for the root account</a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use a Yubikey (or other hardware MFA) for the root user
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.7</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/production-grade-design/identity-and-access-management#manual-steps">Manual steps</a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Take manual steps to complete this recommendation
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.8-9</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-security-to-security-account">
            Apply the <code>account-baseline-security</code> to the security
            account
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>account-baseline-security</code> module to set up the
          IAM password policy
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.10</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/production-grade-design/identity-and-access-management#configure-authentication">Configure authentication</a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">Configure authentication using SAML or IAM</p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.11</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-security-to-security-account">
            Apply the <code>account-baseline-security</code> to the security
            account
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>account-baseline-security</code> module to create users
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.12</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-root-to-root-account">
            Apply the <code>account-baseline-root</code> baseline to the root
            account
          </a>
          ,{" "}
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-security-to-security-account">
            Apply the <code>account-baseline-security</code> to the security
            account
          </a>
          ,{" "}
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-app-to-logs-account">
            Apply the <code>account-baseline-app</code> to the logs account
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>account-baseline-*</code> modules to set up your
          accounts. This will ensure that there are no unused credentials
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.13</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-root-to-root-account">
            Apply the <code>account-baseline-root</code> baseline to the root
            account
          </a>
          ,{" "}
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-security-to-security-account">
            Apply the <code>account-baseline-security</code> to the security
            account
          </a>
          ,{" "}
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-app-to-logs-account">
            Apply the <code>account-baseline-app</code> to the logs account
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>account-baseline-*</code> modules to set up your
          accounts. This will ensure that there are no extra access keys
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.14</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-root-to-root-account">
            Apply the <code>account-baseline-root</code> baseline to the root
            account
          </a>
          ,{" "}
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-security-to-security-account">
            Apply the <code>account-baseline-security</code> to the security
            account
          </a>
          ,{" "}
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-app-to-logs-account">
            Apply the <code>account-baseline-app</code> to the logs account
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>account-baseline-*</code> modules to set up your
          accounts. This will ensure that there are no unused access keys
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.15</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-security-to-security-account">
            Apply the <code>account-baseline-security</code> to the security
            account
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>account-baseline-security</code> module to create users
          and groups
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.16</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-security-to-security-account">
            Apply the <code>account-baseline-security</code> to the security
            account
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>account-baseline-security</code> module to ensure no
          full-access policies are attached to any groups or users
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.17</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-security-to-security-account">
            Apply the <code>account-baseline-security</code> to the security
            account
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>account-baseline-security</code> module to create a
          support group
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.18</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/use-iam-roles-for-ec2-instances">Use IAM roles for EC2 instances</a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use Gruntwork modules to ensure EC2 instances use roles for access
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.19</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/production-grade-design/identity-and-access-management#cleanup-expired-ssltls-certificates">
            Cleanup Expired SSL/TLS certificates
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use Gruntwork modules to automatically remove expired certificates
          from IAM
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.20</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/production-grade-design/identity-and-access-management#iam-access-analyzer">IAM Access Analyzer</a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use Gruntwork modules to enable IAM Access Analyzer across regions
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">1.21</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-root-to-root-account">
            Apply the <code>account-baseline-root</code> baseline to the root
            account
          </a>
          ,{" "}
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-security-to-security-account">
            Apply the <code>account-baseline-security</code> to the security
            account
          </a>
          ,{" "}
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-app-to-logs-account">
            Apply the <code>account-baseline-app</code> to the logs account
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>account-baseline-*</code> modules to set up your
          accounts. This will ensure IAM users are managed centrally through the
          user of AWS Organizations.
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">2.1.1-2.1.2</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/maintain-compliance-by-following-storage-best-practices#s3-buckets">S3 Buckets</a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>private-s3-bucket</code> module
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">2.1.3</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/maintain-compliance-by-following-storage-best-practices#s3-buckets">S3 Buckets</a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>private-s3-bucket</code> module and follow the
          instructions in the README
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">2.1.4</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-root-to-root-account">
            Apply the <code>account-baseline-root</code> baseline to the root
            account
          </a>
          ,{" "}
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-security-to-security-account">
            Apply the <code>account-baseline-security</code> to the security
            account
          </a>
          ,{" "}
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-app-to-logs-account">
            Apply the <code>account-baseline-app</code> to the logs account
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>account-baseline-*</code> modules to set up your
          accounts. This will ensure Amazon Macie is enabled.
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">2.1.5</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/maintain-compliance-by-following-storage-best-practices#s3-buckets">S3 Buckets</a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>private-s3-bucket</code> module
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">2.2.1</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/production-grade-design/storage#configure-ebs-encryption">Configure EBS Encryption</a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use Gruntwork modules to configure AWS EBS encryption
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">2.3.1</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/production-grade-design/storage#configure-rds-encryption">Configure RDS Encryption</a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use Gruntwork modules to configure AWS RDS encryption
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">3.1-3.4</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-app-to-logs-account">
            Apply the <code>account-baseline-app</code> to the logs account
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>account-baseline-*</code> modules to ensure CloudTrail
          is enabled and configured in all regions
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">3.5</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-security-to-security-account">
            Apply the <code>account-baseline-security</code> to the security
            account
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>account-baseline-security</code> module to ensure AWS
          Config is enabled in all regions
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">3.6</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-app-to-logs-account">
            Apply the <code>account-baseline-app</code> to the logs account
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>account-baseline-*</code> modules to ensure CloudTrail
          S3 bucket has access logging enabled
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">3.7</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-app-to-logs-account">
            Apply the <code>account-baseline-app</code> to the logs account
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>account-baseline-*</code> modules to ensure CloudTrail
          logs are encrypted at rest using KMS CMKs
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">3.8</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/enable-key-rotation-for-kms-keys">
            Enable key rotation for KMS keys
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">Use the KMS module</p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">3.9</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/create-vpc-flow-logs">Create VPC flow logs</a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the Gruntwork CIS-compliant <code>vpc</code> service to provision
          VPCs with flow logs enabled
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">3.10-3.11</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/deploy-landing-zone-solution/apply-account-baseline-app-to-logs-account">
            Apply the <code>account-baseline-app</code> to the logs account
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>account-baseline-*</code> modules to ensure Object-level
          logging is enabled for S3 buckets for read and write events
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">4.1-4.15</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/create-vpc-flow-logs#maintaining-compliance-by-following-monitoring-best-practices">
            Maintaining compliance by following Monitoring best practices
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          The CloudWatch Logs metrics filters wrapper module will satisfy each
          recommendation
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">5.1</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/create-vpc-flow-logs#maintaining-compliance-by-following-networking-best-practices">
            Maintaining compliance by following Networking best practices
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the Gruntwork CIS-compliant <code>vpc</code> service to ensure
          there is no public remote access
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">5.2</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/create-vpc-flow-logs#maintaining-compliance-by-following-networking-best-practices">
            Maintaining compliance by following Networking best practices
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the Gruntwork CIS-compliant <code>vpc</code> service for a secure
          network configuration
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">5.3</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/create-vpc-flow-logs#maintaining-compliance-by-following-networking-best-practices">
            Maintaining compliance by following Networking best practices
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the <code>cloud-nuke</code> tool to remove all default security
          groups
        </p>
      </td>
    </tr>
    <tr>
      <td className="tableblock halign-center valign-top">
        <p className="tableblock">5.4</p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          <a href="/guides/build-it-yourself/achieve-compliance/deployment-walkthrough/create-vpc-flow-logs#maintaining-compliance-by-following-networking-best-practices">
            Maintaining compliance by following Networking best practices
          </a>
        </p>
      </td>
      <td className="tableblock halign-left valign-top">
        <p className="tableblock">
          Use the Gruntwork CIS-compliant <code>vpc</code> service to configure
          least-privilege routing by default
        </p>
      </td>
    </tr>
  </tbody>
</table>


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "deda90311b36e4b300a2d13b43d04817"
}
##DOCS-SOURCER-END -->
