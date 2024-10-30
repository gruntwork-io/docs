# Contributing to Gruntwork Library

Contributions to Gruntwork Library are welcome and appreciated! In fact, Gruntwork receives over 1,000 customer [pull requests](https://help.github.com/articles/about-pull-requests/) per year.

You can contribute to the library in several ways:

- Update an existing "building block" module or service module
- Contribute a new module
- Document a bug

## Start by filing a GitHub issue

If you're thinking of adding a new feature, before starting any work, we recommend filing a GitHub issue in the appropriate repo. This is your chance to ask
questions and get feedback from the maintainers and the community before you sink a lot of time into writing (possibly
the wrong) code. If there is anything you’re unsure about, just ask!

If you're submitting a simple change such as a new variable or new output value, it may be worth opening a pull request directly, as described below.

## Proceed to a pull request

If it makes sense to open a pull request, follow these guidelines:

### Update the documentation first

We recommend updating the documentation _before_ updating any code (see
[Readme Driven Development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html)). This ensures the
documentation stays up to date and allows you to think through the problem at a high level before you get lost in the
weeds of coding.

### Update the tests

We also recommend updating the automated tests _before_ updating any code (see
[Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development)). That means you add or update a test
case, verify that it’s failing with a clear error message, and then make the code changes to get that test to pass.
This ensures the tests stay up to date and verify all the functionality in the repo, including whatever new
functionality you’re adding in your contribution. The `test` folder in every repo will have documentation on how to run
the tests locally.

### Update the code

At this point, you can make your code changes and use your new test case to verify that everything is working.

### Create a pull request

[Create a pull request](https://help.github.com/articles/creating-a-pull-request/) with your changes. Please make sure
to include the following:

1.  A description of the change, including a link to your GitHub issue.
2.  Any notes on backwards incompatibility.

### Merge and release

The maintainers for the repo will review your code and provide feedback. If everything looks good, they will merge the
code and release a new version.
