# Why is it important to have CI/CD?

To understand the benefits of CI/CD, it is worth exploring the opposite: _late integration and late delivery (LI/LD)_.
We will explain LI/LD using a thought experiment about building the International Space Station (ISS).

![](/assets/img/guides/infrastructure-cicd-pipeline/iss-components.png)

The ISS consists of dozens of components, as shown in the image above. Each component is built by a team from a
different country, with a central team responsible for organizing development. In LI/LD,
you would organize the development by designing all the components in advance, and then have each team go
off and work on their component in _total isolation_. There is complete trust in the design and the teams such that
there is no need to check in and integrate the components along the way. When all the teams are done, each team launches
the component into space and then put all the components together at the same time in space, _for the first time_.

It isn’t hard to imagine that this could be disastrous: one team would think the other team was responsible for wiring
while that team thought everything would be wireless; all the teams would use the metric system except one; everyone cut
toilets from the scope thinking some other team is sure to include it. Finding all of this out once everything has
already been built and is floating in outer space means that fixing the problems will be very difficult and expensive.

While it is hard to imagine that anyone would build the ISS in this way, unfortunately this model of development is
fairly common in the software industry. Developers work in total isolation for weeks or months at a time on _feature
branches_ without integrating their work with other teams, and then try to merge all the work together at the last
minute moments before release. As a result, the integration process is very expensive and takes days or weeks fixing merge
conflicts, tracking down subtle bugs, and trying to stabilize release branches.

![Many teams employ a practice of working on their features over long periods of time on isolated branches. These long lived feature branches have a higher chance of merge conflicts when they’re finally ready to be integrated.](/assets/img/guides/infrastructure-cicd-pipeline/feature-branch-merge-conflict.png)

In contrast, the Continuous Integration and Continuous Delivery model of development promotes more cross team
communication and integration work as development progresses. Going back to the ISS thought experiment, a CI/CD style of
building the ISS would work by collaborating on a design. Rather than each team working in isolation, there
would be regular checkpoints throughout the process where the teams come together to try to test and integrate all the
components, and update the design if there are problems. As components are completed and integration tests validate the
design, they are launched into space and assembled incrementally as new components arrive.

Rather than integrating at the last moment, CI/CD encourages development teams to integrate their work together
regularly, with smaller deltas between each change. This exposes problems with the design earlier in the process,
ensuring that there is ample time for improvements and corrections.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"6a5dda6a221f9274c83a407548185378"}
##DOCS-SOURCER-END -->
