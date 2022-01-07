# Immutable infrastructure

With _mutable infrastructure_, you deploy a set of servers, and you continuously update those servers in place. Every
new update gets installed on top of the previous updates, either manually (e.g., by SSHing to each server and running
commands), or via tools like Ansible, Chef, or Puppet. The idea behind _immutable infrastructure_ is that once you
deploy a server, you never change it again. If you need to roll out an update, you deploy a _new_ server with that
update, and undeploy the old one. This paradigm is built for use with (a) the cloud, where you can easily spin up or
tear down servers on-demand and (b) machine images, as every time there’s a change, you can use tools like Packer or
Docker to build a new, immutable, versioned machine image (e.g., VM image or Docker image), and deploy new servers with
that image.

The advantages of immutable infrastructure are:

#### Easier to reason about servers

With mutable infrastructure, each server builds up a unique history of changes, so each one is a little different,
which (a) makes it difficult to reason about what’s actually installed and (b) leads to tricky bugs that only show up
on some servers, and not on others. With immutable infrastructure, you avoid these sorts of bugs, and you always know
what’s installed on any server, as you know the exact image each server is running, and that the image never changes.

#### You can run the same images in all environments

Whereas it’s rare to run mutable infrastructure tools such as Ansible, Chef, or Puppet in your local dev environment,
it’s common to run the same Docker or VM image in all environments, including your laptop, staging, and production.
This helps to reduce "works on my machine" and environment-specific bugs, and makes it easier to debug those issues
when they do happen.

#### Easier scaling and rollback

With immutable images, you can quickly and easily spin up 100 or 1,000 servers, with no need to worry about how long
it’ll take to configure all those servers (e.g., via Ansible, Chef, or Puppet), as all the configuration has already
happened and is captured in the VM or Docker image. Rollback is easier too, as you can quickly jump back to a
previous image, without having to wait for and worry about running a bunch of older install commands (which may no
longer work, e.g., if certain packages have been removed from APT or YUM).
