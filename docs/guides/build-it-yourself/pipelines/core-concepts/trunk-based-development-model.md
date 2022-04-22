# Trunk-based development model

![Trunk branch with a continuous stream of commits.](/img/guides/build-it-yourself/pipelines/trunk.png)

The most common way to implement CI/CD is to use a _trunk-based development model_. In trunk-based development, all the
work is done on the same branch, called `trunk` or `master` depending on the Version Control System (VCS). You would
still have feature branches that developers work on to facilitate review processes, but typically these are tiny and
short-lived containing only a handful of commits. Everyone actively merges their work back into trunk on a regular
basis, oftentimes multiple times per day (Continuous Integration). Then, as `trunk` or `master` is updated, the work is
immediately deployed into the active environments so that they can be tested further (Continuous Delivery).

Can having all developers work on a single branch really scale? It turns out that trunk-based development is used by
thousands of developers at [LinkedIn](https://www.wired.com/2013/04/linkedin-software-revolution/),
[Facebook](https://paulhammant.com/2013/03/13/facebook-tbd-take-2/), and
[Google](https://www.youtube.com/watch?v=W71BTkUbdqE). How are these software giants able to manage active trunks on the
scale of billions of lines of code with 10s of thousands of commits per day?

There are three factors that make this possible:

<div className="dlist">

#### Small, frequent commits reduce the scope of each integration

It turns out that if you’re integrating small amounts of code on a regular basis, the number of conflicts that arise is
also fairly small. Instead of having big, monolithic merge conflicts, each conflict that arises will be in a tiny
portion of the work being integrated. In fact, these conflicts can be viewed as helpful as it is a sign that there is
a design flaw. These integration challenges are part and parcel to distributed software development projects. You’ll
have to deal with conflicts no matter what, and it is going to be easier to deal with conflicts that arise from one or
two days of work than with conflicts that represents months of work.

#### Automated testing

When frequent development happens on `trunk`/`master`, naturally it can make the branch unstable. A broken
`trunk`/`master` is something you want to avoid at all costs in trunk-based development as it could block all
development. To prevent this, it is important to have a self-testing build with a solid automated testing suite. A
self-testing build is a fully automated build process that is triggered on any work being committed to the repository.
The associated test suite should be complete enough that when they pass, you can be confident the code is stable.
Typically code is only merged into the trunk when the self-testing build passes.

#### Feature toggles

One potential problem with continuous integration is that it can be difficult to break down your work to bite-sized
units. Major features cannot be implemented in a day. How can you ship parts of your feature without breaking the
overall functionality of the application? Feature toggles are constructs in your code that allow you to disable or
enable entire features in the application. This allows you to continuously develop, integrate, and ship partially
working features without compromising the overall functionality. Examples of feature toggles include tags on
users such that only those users can see the new feature, or configuration in the code that avoid the feature path
when disabled.

</div>

CI/CD requires all of these factors to implement successfully and at scale.

Now that we have observed the benefits of CI/CD, let’s take a look at what it means to implement CI/CD with
infrastructure code.


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "7e5794c67b0a6291110316f83cf3ec40"
}
##DOCS-SOURCER-END -->
