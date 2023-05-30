---
sidebar_label: "Contributing"
---

# Contributing to the Gruntwork Infrastructure as Code Library

Contributions to the Gruntwork Infrastructure as Code Library are very welcome and appreciated! If you find a bug or want to add a new
feature or even contribute an entirely new module, we are very happy to accept
[pull requests](https://help.github.com/articles/about-pull-requests/), provide feedback, and run your changes through
our automated test suite.

This section outlines the process for contributing.

## File a GitHub issue

Before starting any work, we recommend filing a GitHub issue in the appropriate repo. This is your chance to ask
questions and get feedback from the maintainers and the community before you sink a lot of time into writing (possibly
the wrong) code. If there is anything you’re unsure about, just ask!

## Update the documentation

We recommend updating the documentation _before_ updating any code (see
[Readme Driven Development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html)). This ensures the
documentation stays up to date and allows you to think through the problem at a high level before you get lost in the
weeds of coding.

## Update the tests

We also recommend updating the automated tests _before_ updating any code (see
[Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)). That means you add or update a test
case, verify that it’s failing with a clear error message, and then make the code changes to get that test to pass.
This ensures the tests stay up to date and verify all the functionality in the repo, including whatever new
functionality you’re adding in your contribution. The `test` folder in every repo will have documentation on how to run
the tests locally.

## Update the code

At this point, make your code changes and use your new test case to verify that everything is working.

## Create a pull request

[Create a pull request](https://help.github.com/articles/creating-a-pull-request/) with your changes. Please make sure
to include the following:

1.  A description of the change, including a link to your GitHub issue.
2.  Any notes on backwards incompatibility.

## Merge and release

The maintainers for the repo will review your code and provide feedback. If everything looks good, they will merge the
code and release a new version.
