# Before you get started

Terraform makes it fairly easy to delete resources using the `destroy` command. This is very useful in testing and
pre-prod environments, but can also be dangerous in production environments, because if you delete resources, **there
is no undo**. Therefore, be extra sure and careful with where you run `destroy` so you don't accidentally end up
deleting something you'll very much regret (e.g., a production database). Also, as explained in the rest of this guide,
we put a few features in place that make deletion harder (read: a bit more annoying to do) to prevent you from
accidentally shooting yourself in the foot.
