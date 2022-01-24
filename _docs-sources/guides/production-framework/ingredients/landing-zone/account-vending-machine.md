# Account vending machine

A Landing Zone isn't something static. As your cloud usage grows, you will need to create more and more accounts or projects. To ensure that these are all created in a secure & consistent manner—that they all use the account baselines mentioned in the previous section—you will want to set up an *account vending machine*, which is a way to automatically provision new accounts. Here are the basic features you'll want:

## Self-service

Developers should be able to provision accounts for themselves via a *self-service* experience. Just like most things in the cloud, you should be able to spin up new accounts quickly and cheaply, and throw them away if you don't need them later. Companies that put a lot of manual processes in the way of account creation (e.g., file a ticket, wait a few weeks, etc.) typically end up with either too many things in too few accounts or with developers finding workarounds (e.g., putting accounts into totally separate organizations on separate credit cards), neither of which is good from a security or reliability perspective. Therefore, aim to create a self-service account creation process as soon as possible. We'll discuss self-service in more detail in a dedicated section below.

## Gather info

The self-service experience in your Account Vending Machine will need a way to gather information from the developer: e.g., a name for the account; what team or organization owns the account (e.g., which may be important for billing purposes); which developers need access to the account; and so on. You might gather this information via a web form or a file the developer fills out and commits to version control.

## GitOps-driven

Whether or not your Account Vending Machine has a web UI, under the hood, it should store the information it gathers from the developer in a version control system. This is typically referred to as a *GitOps-driven* system, as Git is by far the most popular version control system these days. These commits will trigger your CI / CD pipeline, creating the new accounts fully automatically, as discussed in the next section. Moreover, this ensures that every time you create or modify an account, the action is recorded in your version control history, which is a very powerful tool to have for debugging and auditing.

## Provision access

As part of the account provisioning process, the Account Vending Machine should grant the relevant developers access to the new accounts via the authentication and authorization system in your account baselines (e.g., via SSO). This allows the developers to immediately start using the new accounts as soon as they are created.


