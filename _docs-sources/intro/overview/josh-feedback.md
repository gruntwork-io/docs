# Josh's Feedback

- What's the vision for "tool fundamentals"?
  - How does it compare to Set Up Your Environment / Installing Neccessary Tools?
  - Should "Setup Your Tools" (formerly Tool Fundamentals) be part of Set Up Your Environment?
- "Next Steps" at bottom should be the same boldness. 
- Should "Deploy Your First Module" focus on teaching The Gruntwork Way? 
  - You could start by identifying a use case ("deploy a VPC"), then look at the service catalog, then, use Terraform or Terragrunt to deploy the module (we should cover both).
- Zooming out leads to centered text. Should we left-align instead?
- Are inline links too low-contrast (compared to black text) to easily see?

# Bugs

## Spacing on multi-level outlines

### This works fine

- What is Gruntwork
  - DevOps accelerator

### But this does not

- What is Gruntwork
  - DevOps accelerator
    - Pre-written, production-grade AWS infrastructure-as-code lets you go live in days
      - with all of the pieces you need to go to production including:
        - **Landing Zones**
        - **Docker Orchestration:** Kubernetes, ECS, Nomad
        - **CI/CD Pipelines:** Jenkins, CircleCI, TravisCI

- Products
  - Service Catalog 

### Another bug example

- **DevOps Skill.** Gruntwork requires that users learn the following core DevOps skills:
  - Terraform: Intermediate
  - Bash: Beginner
  - Packer: Beginner
  - Docker: Intermediate
    :::note

    In the Gruntwork model, the user takes responsibility for developing these skills, however Gruntwork assists this effort by offering [DevOps Courses](/courses), [Professional Services](#), and [Support](#).

    :::
- **Ownership.** sdfadfasdfdfdf

### Third bug example

- **DevOps Ownership.** Someone at your organization must "own" the infrastructure. This could be an experienced DevOps engineer, software engineer learning DevOps for the first time, outside consultant, or anyone else committed to developing the necessary skills.
- **DevOps Skill.** Gruntwork requires that users learn the following core DevOps skills:
  - AWS: Intermediate
  - Terraform: Intermediate
  - Bash: Beginner
  - Packer: Beginner
  - Docker: Intermediate

*In the Gruntwork model, the user takes responsibility for developing these skills, however Gruntwork assists this effort by offering [DevOps Courses](/courses), [Professional Services](#), and [Support](#).*

### Interpretation

The difference in the first is that there are newlines between toplevel bullets. I'm not sure what the correct behavior here is. The difference in the second is the presence of the `:::note` admonition.
