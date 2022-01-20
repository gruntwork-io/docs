# The modern Service Catalog

If you find yourself cringing a little bit at the term *Service Catalog* because of bad experiences with certain
vendors, don't panic. The modern Service Catalog, in 2021, is an entirely different beast. Here are the key ideas:

1. **Defined as code**. The Service Catalog must be defined as code, using the tools mentioned in the previous section, such as Terraform, CloudFormation, Docker, Kubernetes, etc.
2. **Designed for use directly in production**. Many of the Service Catalogs that you find in the wild seem to be full of code that's great for a "5 minute demo"—something that looks great in a sales presentation—but isn't actually useful for real-world production use cases. The sort of Service Catalog we're talking about here *should be explicitly built to be used directly in production*.
3. **Designed to meet your company's requirements**. In order to be able to use your Service Catalog in production, it should be written *specifically to meet your company's requirements out-of-the-box* (the ones you defined in the previous section). **Here's the key idea**: as you'll see in the next section on CI / CD, you'll set up your cloud accounts so that only way to deploy anything into those accounts is to use the Service Catalog, which means the code in the Service Catalog is how you enforce all your requirements around security, compliance, scalability, and so on!
4. **Tested to meet your company's requirements**. As described in the previous section, one of the big advantages of using code is that you can validate it. Your Service Catalog should have tests built in *that systematically validate the code meets your company's requirements*. This includes:
  1. **Code review**: You should enforce that code cannot be merged to your `main` branch unless it has been reviewed by at least 1 (or more) people who are not authors of that code.
  2. **Static analysis**: You can run tools such as `tflint` and `checkhov` to statically check your code for security vulnerabilities and other defects.
  3. **Functional testing**: You can run tools such as Terratest to check that your code actually deploys infrastructure that works the way you expect.
  4. **Policy enforcement**: You can run tools such as Open Policy Agent (OPA) to test that your code meets various compliance and regulatory requirements.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"7f2e396a9879a839ad919090e510930a"}
##DOCS-SOURCER-END -->
