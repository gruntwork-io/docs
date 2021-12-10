# Step 4: start using lock files

One of the big new features in Terraform 0.14 is the lock file for provider dependencies. The next time you run `init`
with Terraform 0.14, it will create a `.terraform.lock.hcl` file that locks you to specific versions of all the
providers you’re using. We recommend checking the `.terraform.lock.hcl` files into version control so that all your
team members get the _exact_ same provider versions when they run `init`.

Note that we’ve updated Terragrunt (as of [v0.27.0](https://github.com/gruntwork-io/terragrunt/releases/tag/v0.27.0)) to
work with lock files too. When you run `terragrunt init`, or when
[Auto Init](https://terragrunt.gruntwork.io/docs/features/auto-init/) runs as part of some other command, Terragrunt will
automatically copy the `.terraform.lock.hcl` file right next to your `terragrunt.hcl` file, making it easy to commit it
to version control.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"f61f38e0162cec9e2c37183a237e5822"}
##DOCS-SOURCER-END -->
