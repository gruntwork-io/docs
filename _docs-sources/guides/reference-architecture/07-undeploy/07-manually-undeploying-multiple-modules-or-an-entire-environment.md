# Manually undeploying multiple modules or an entire environment

*If you are absolutely sure you want to run destroy on multiple modules or an entire environment* (remember, there's
no undo!), you can use the `destroy-all` command. For example, to undeploy the entire staging environment, you'd run:

```bash
cd stage
terragrunt destroy-all
```

Terragrunt will then run `terragrunt destroy` in each subfolder of the current working directory, processing them in
reverse order based on the dependencies you define in the `terragrunt.hcl` files.

To avoid interactive prompts from Terragrunt (use very carefully!!), add the `--terragrunt-non-interactive` flag:

```bash
cd stage
terragrunt destroy-all --terragrunt-non-interactive
```

To undeploy everything except a couple specific subfolders, add the `--terragrunt-exclude-dir` flag. For example, to
run `destroy` in each subfolder of the `stage` environment except MySQL and Redis, you'd run:

```bash
cd stage
terragrunt destroy-all \
    --terragrunt-exclude-dir stage/us-east-1/stage/data-stores/mysql \
    --terragrunt-exclude-dir stage/us-east-1/stage/data-stores/redis
```
