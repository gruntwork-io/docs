---
sidebar_position: 2
title: Offer "golden paths"
---

# Offer "golden paths"

Platform engineers face a fundamental tension: you want _consistency_ because it means a smaller surface area to maintain and more confidence around governance, but application developers want _flexibility_ because autonomy is both motivating and fast.

What's the right balance? The answer lies in offering **golden paths,** which are well-supported, pre-built ways to accomplish the most common infrastructure problems that developers face. To solve a given problem, application developers can choose to use the golden path approach and enjoy a pre-built solution, ongoing maintenance, and support from the platform team, or they can go their own way knowing that development, support, and maintenance will now be their responsibility. 

The golden paths concept was [first coined by Spotify](https://engineering.atspotify.com/2020/08/how-we-use-golden-paths-to-solve-fragmentation-in-our-software-ecosystem) back in 2020 and remains popular to today. It works because it aligns incentives. Platform engineers want to see their work used and have to make their patterns compelling enough to drive adoption. Application developers want to minimize their responsibilities so they can focus on building core features and not infrastructure.

Once again, we see the need to [treat your platform as a product](/2.0/way/principles/core-philosophy/your-developer-platform-is-a-product). In this case, you are "competing" against the application developer's next best alternative of "I'll just do it myself." Sometimes your developer platform will lose because it's actually not the right fit for a particular use case, and that's okay. But once you create a golden path for a given use case, it should win most of the time.

How a golden pattern wins out is a nuanced topic. As former Spotify Staff Agile Coach [Jason Yip points out](https://jchyip.medium.com/my-critique-of-the-spotify-model-part-1-197d335ef7af), teams need four things to make good decisions (like choosing the golden path option!) as an autonomous team: competence to evaluate technical tradeoffs, clarity on the full business context, exposure to what's working well elsewhere in the organization, and a cultural orientation to act in the best interest of the company.

In practice, golden paths are implementations of [patterns](/2.0/way/solution/patterns/overview). They might be written as OpenTofu/Terraform modules, Terragrunt Stack definitions, [Runbooks](https://github.com/gruntwork-io/runbooks) or any other valid pattern technology. Whatever form they take, they need to be easy to discover, easy to use, work as expected, and actually meet developers' needs.

