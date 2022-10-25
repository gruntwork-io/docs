---
sidebar_label: "Forking our code"
---

# Forking the Gruntwork Infrastructure as Code Library

The [Gruntwork Terms of Service](https://gruntwork.io/terms/) give you permissions to fork the code from the Gruntwork
Infrastructure as Code Library into your own repos. This is useful if your company does not allow external dependencies (e.g., you
have a company policy that requires all source code to be pulled from an internal GitHub Enterprise or BitBucket
server) or if you need to make modifications to the Infrastructure as Code Library that you do not wish to contribute back to
Gruntwork. This section will walk you through what you need to do to fork the code.

The definition of an _Authorized User_ from the Gruntwork Terms of Service does NOT change if you fork the
code. That is, if you create internal forks and give 50 users access to those internal forks, then the Gruntwork
License requires that you pay for 50 Authorized Users.

:::danger

Forks of private repositories (such as IaC library modules included in the Gruntwork subscription) will be permanently deleted if the user who created the fork loses access to the source repository. For instance, this can happen when a user is removed from your team in the Gruntwork Developer Portal. Take caution when creating forks of any Gruntwork modules. We recommend creating pull requests to merge your changes upstream and avoid the need to maintain your fork, or creating a machine user to own any forks which will never be removed from your team.

:::

## How to fork the code

Here is how you fork the code in the Gruntwork Infrastructure as Code Library:

1.  Copy each Gruntwork repo into your private repositories.
2.  You’ll also want to copy all the versioned releases (see the `/releases` page for each repo).
3.  For repos that contain pre-built binaries (such as `ssh-grunt` mentioned earlier), you’ll want to copy those binaries
    as well.
4.  Within each repo, search for any cross-references to other Gruntwork repos. Most of the repos are standalone, but
    some of the Terraform and Go code is shared across repos (e.g., the `package-kafka` and `package-zookeeper` repos
    use the `module-asg` repo under the hood to run an Auto Scaling Group). You’ll need to update Terraform source URLs
    and Go import statements from `github.com/gruntwork-io` to your private Git repo URLs.

You’ll want to automate the entire process above and run it on a regular schedule (e.g., daily). The Gruntwork
Infrastructure as Code Library is updated continuously, both by the Gruntwork team and contributions from our community
of customers (see the monthly [Gruntwork Newsletter](https://blog.gruntwork.io/tagged/gruntwork-newsletter) for details),
so you’ll want to pull in these updates as quickly as you can.

## How to use your forked code

Once you’ve forked the code, using it is very similar to what is outlined in [Using Terraform Modules](/intro/first-deployment/using-terraform-modules), except for the following differences:

1.  Point the `source` URLs of your Terraform modules to your own Git repos, rather than the `gruntwork-io` GitHub org.
2.  Point the `--repo` parameter of `gruntwork-install` to your own Git repos, rather than the `gruntwork-io` GitHub org.

## Drawbacks to forking

While forking is allowed under the Gruntwork Terms of Services, it has some downsides:

- You have to do a lot of work up-front to copy the repos, releases, and pre-compiled binaries and update internal
  links.
- You have to do more work to run this process on a regular basis and deal with merge conflicts.
- If your team isn’t directly using the Gruntwork GitHub repos on a regular basis, then you’re less likely to
  participate in issues and pull requests, and you won’t be benefiting as much from the Gruntwork community.

So, whenever possible, use the code directly from the `gruntwork-io` GitHub org, as documented in
[Using Terraform Modules](/intro/first-deployment/using-terraform-modules). If your team relies on NPM, Docker Hub, Maven Central,
GitHub, or the Terraform Registry, using Gruntwork repos directly is no different. However, if your company completely
bans all outside sources, then follow the instructions above to fork the code, and good luck!
