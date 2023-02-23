# The CI / CD Pipeline is the only path to prod

## The only path to prod

The CI / CD pipeline should be the *only* way to deploy something to production. There's no other way to make changes in prod—no individual user has write access. The only exception is a small handful of admins who set up the CI / CD pipeline in the first place (bootstrapping) and then have access for in-case-of-emergency-break-glass situations. But on a daily basis, for all employees, the CI / CD pipeline is the *only* way to get something into prod. In fact, not just prod, but most shared environments too, such as stage. The only environments devs should have write access to are dev or sandbox environments designed specifically for learning about, experimenting with, and testing infrastructure in the cloud.

## Locked down to your Service Catalog

As an added measure, the CI / CD pipeline should be locked down so that it only deploys code from your company's Service Catalog. If you put these two ingredients together, your Service Catalog (which has all your vetted, tested infrastructure code) and CI / CD pipeline become the mechanisms by which you enforce all of your company's requirements (from the first section) around security, compliance, scalability, governance, etc!

## Locked down access to the pipeline itself

It's a bad idea to have give your CI server (e.g., Jenkins)—which your entire dev team can log into to execute arbitrary code—*direct* access to the powerful credentials (often admin credentials!) that you need to deploy infrastructure. Instead, the portions of your pipeline that need sensitive permissions should run in a separate, isolated, highly locked down environment that only exposes a very limited API. For example, you might put the sensitive permissions and work into an ECS Fargate Task, which only exposes an API to run specific commands (e.g., `terraform apply`), in specific repos, on specific branches, in specific folders; you then give your CI server (e.g., Jenkins) permissions to trigger that ECS Fargate Task, but nothing else. That way, if a developer makes a mistake on your CI server, or an attacker manages to get access to that CI server, the worst that can happen is that they trigger that ECS Fargate Task to run on known, tested code.




<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"184306807d3afdf76391109109b4fe83"}
##DOCS-SOURCER-END -->
