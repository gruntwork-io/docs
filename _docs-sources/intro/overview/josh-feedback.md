---
'title': "Josh's Feedback"
---

# Josh's Feedback

- What's the vision for "tool fundamentals"?
  - How does it compare to Set Up Your Environment / Installing Neccessary Tools?
  - Should "Setup Your Tools" (formerly Tool Fundamentals) be part of Set Up Your Environment?
- "Next Steps" at bottom should be the same boldness. 
- Should "Deploy Your First Module" focus on teaching The Gruntwork Way? 
  - You could start by identifying a use case ("deploy a VPC"), then look at the service catalog, then, use Terraform or Terragrunt to deploy the module (we should cover both).

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

- The difference is that there are newlines between toplevel bullets. I'm not sure what the correct behavior here is.

- Zooming out leads to centered text. Should we left-align instead?

- Are inline links too low-contrast (compared to black text) to easily see?