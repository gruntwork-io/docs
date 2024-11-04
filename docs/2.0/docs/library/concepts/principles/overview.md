import DocCardList from '@theme/DocCardList';

# Overview

Authoring a large library of modules like this requires that certain principles be decided and documented for iteration.

These principles help guide decision making when multiple valid approaches exist for tackling a problem.

## High Level Principles

These are some documented high level principles that should be followed in order to encourage continuous increase in the quality of modules in the library.

### If Isn't Tested It's Broken

The [Terratest](https://github.com/gruntwork-io/terratest) testing library was created in order to provide a way to efficiently test IAC modules in an easy way.
All modules in the library should have tests associated with them, and whenever possible, should have tests that test all the most important behaviors.

It can be expensive to maintain this many tests, but it is more expensive not to, when dealing with surface area this large.

As a matter of general practice, it is more important that a module is tested at all than that it is tested comprehensively

<DocCardList />
