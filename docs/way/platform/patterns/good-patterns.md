---
sidebar_position: 4
title: Good Patterns
---

# Good patterns

What makes an effective pattern?

## Minimum requirements

To qualify as a pattern, you need only meet two requirements. A pattern is:

- **Reusable.** The pattern is intended to be used by potentially many consumers.
- **Opinionated.** The pattern takes a stand on how something should be done.

## Effective patterns

To be an _effective_ pattern, we need a few more requirements. Effective patterns are:

- **Abstracted.** The consumer of the pattern can use it without comprehensively understanding how it is built.
- **Good by default.** A consumer would need to go out of their way to give the pattern a "bad" configuration.
- **Configurable.** Within the confines of the opinions, the consumer can customize the pattern as needed.
- **Tested.** The pattern has been validated to work as advertised.
- **Documented.** The pattern has documentation so that its consumers can understand it.
- **Vetted.** The pattern has been approved for used by a subject matter expert.
- **Maintained.** The pattern is versioned and actively updated to reflect new insights.

This is admittedly a long list, but it works best as a checklist when building a pattern. 

## Examples

Let's look at some examples of good patterns.

### Creating an AWS S3 Bucket

The [Gruntwork S3 Bucket Module](https://docs.gruntwork.io/reference/services/data-storage/s-3-bucket/) is written for either OpenTofu or Terraform, and exposes a single required variable input, `primary_bucket`, which is the name of the S3 Bucket. A user creating the S3 bucket need understand very little of how the module works to use it successfully, so this pattern is **abstracted.**

The module exposes 50+ variables that can be used to configure the S3 bucket as needed. That is, this pattern is **good by default** but also **configurable.**

The module is validated with automated tests using [Terratest](https://github.com/gruntwork-io/terratest), so it is **tested.** Specifically, the tests run `tofu apply`, checks the logging configuration, uploads a file and confirms that it was replicated, and then runs `tofu destroy`.

<details>
  <summary>See the actual test code for this module.</summary>

    ```go
    import (
        "os"
        "strings"
        "testing"

        "github.com/gruntwork-io/aws-service-catalog/test"

        awsgo "github.com/aws/aws-sdk-go/aws"
        "github.com/aws/aws-sdk-go/service/s3"
        "github.com/aws/aws-sdk-go/service/s3/s3manager"
        "github.com/gruntwork-io/terratest/modules/aws"
        "github.com/gruntwork-io/terratest/modules/random"
        "github.com/gruntwork-io/terratest/modules/terraform"
        test_structure "github.com/gruntwork-io/terratest/modules/test-structure"
        "github.com/stretchr/testify/assert"
        "github.com/stretchr/testify/require"
    )
                
    func TestS3Bucket(t *testing.T) {
        t.Parallel()

        // Uncomment the items below to skip certain parts of the test
        //os.Setenv("SKIP_setup", "true")
        //os.Setenv("SKIP_deploy_terraform", "true")
        //os.Setenv("SKIP_validate_access_logs", "true")
        //os.Setenv("SKIP_validate_replication", "true")
        //os.Setenv("SKIP_cleanup", "true")

        testFolder := "../../examples/for-learning-and-testing/data-stores/s3-bucket"

        defer test_structure.RunTestStage(t, "cleanup", func() {
            terraformOptions := test_structure.LoadTerraformOptions(t, testFolder)
            terraform.Destroy(t, terraformOptions)
        })

        test_structure.RunTestStage(t, "setup", func() {
            primaryRegion := aws.GetRandomRegion(t, test.RegionsForEc2Tests, nil)
            // Choose a different region for cross-region replication
            replicaRegion := aws.GetRandomRegion(t, test.RegionsForEc2Tests, []string{primaryRegion})
            uniqueID := strings.ToLower(random.UniqueId())

            test_structure.SaveString(t, testFolder, "primaryRegion", primaryRegion)
            test_structure.SaveString(t, testFolder, "replicaRegion", replicaRegion)
            test_structure.SaveString(t, testFolder, "uniqueID", uniqueID)
        })

        test_structure.RunTestStage(t, "deploy_terraform", func() {
            primaryRegion := test_structure.LoadString(t, testFolder, "primaryRegion")
            replicaRegion := test_structure.LoadString(t, testFolder, "replicaRegion")
            uniqueID := test_structure.LoadString(t, testFolder, "uniqueID")

            terraformOptions := CreateS3BucketTerraformOptions(t, testFolder, uniqueID, primaryRegion, replicaRegion)

            test_structure.SaveTerraformOptions(t, testFolder, terraformOptions)
            terraform.InitAndApply(t, terraformOptions)
        })

        test_structure.RunTestStage(t, "validate_access_logs", func() {
            terraformOptions := test_structure.LoadTerraformOptions(t, testFolder)
            accessLogsBucket := terraform.OutputRequired(t, terraformOptions, "access_logging_bucket_name")
            primaryBucket := terraform.OutputRequired(t, terraformOptions, "primary_bucket_name")
            primaryRegion := test_structure.LoadString(t, testFolder, "primaryRegion")

            primaryClient := aws.NewS3Client(t, primaryRegion)

            // Since access logs can take a long time to appear in the bucket, we confirm the access logging setup
            // not by checking for the existence of logs objects, but by checking the logging configuration to the target
            // bucket is properly set.
            loggingOutput, err := primaryClient.GetBucketLogging(&s3.GetBucketLoggingInput{
                Bucket: awsgo.String(primaryBucket),
            })
            require.NoError(t, err)
            assert.Equal(t, accessLogsBucket, awsgo.StringValue(loggingOutput.LoggingEnabled.TargetBucket))
        })

        test_structure.RunTestStage(t, "validate_replication", func() {
            testFilePath := "../fixtures/simple-docker-img/Dockerfile"
            testFileKey := "config/Dockerfile"

            terraformOptions := test_structure.LoadTerraformOptions(t, testFolder)
            primaryBucket := terraform.OutputRequired(t, terraformOptions, "primary_bucket_name")
            primaryRegion := test_structure.LoadString(t, testFolder, "primaryRegion")

            testfile, err := os.Open(testFilePath)
            require.NoError(t, err)
            defer testfile.Close()

            // To test the replication, we upload a test file to the primary bucket and check the replication status
            // of the object immediately following the upload is either PENDING or COMPLETE. We do not check that the
            // object actually gets replicated to the replica bucket, since this can take a long time.
            primaryUploader := aws.NewS3Uploader(t, primaryRegion)
            _, err = primaryUploader.Upload(&s3manager.UploadInput{
                Bucket: awsgo.String(primaryBucket),
                Key:    awsgo.String(testFileKey),
                Body:   testfile,
            })
            require.NoError(t, err)

            primaryClient := aws.NewS3Client(t, primaryRegion)
            objectOutput, err := primaryClient.GetObject(&s3.GetObjectInput{
                Bucket: awsgo.String(primaryBucket),
                Key:    awsgo.String(testFileKey),
            })
            require.NoError(t, err)
            assert.Contains(t, []string{"PENDING", "COMPLETE"}, awsgo.StringValue(objectOutput.ReplicationStatus))
        })
    }
    ```
</details>

This module has extensive documentation, so it is **documented.**

It was written by a Gruntwork subject matter expert, and peer reviewed by other Gruntwork subject matter experts, so it is **vetted.**

Finally, it is has undergone years of revisions, so it is **maintained.**

As you can see, it takes a lot to get a pattern right, but when you do, your consumers can achieve [velocity](/docs/way/why/velocity), [governance](/docs/way/why/governance), and [maintainability](/docs/way/why/maintainability) with relative ease.