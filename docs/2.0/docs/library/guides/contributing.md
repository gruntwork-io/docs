# Contributing to Gruntwork IaC Library

Contributions to the Gruntwork IaC Library are encouraged and highly valued. Gruntwork receives over 1,000 customer [pull requests](https://help.github.com/articles/about-pull-requests/) annually.

You can contribute in the following ways:

- Update an existing "building block" module or service module.
- Contribute to a new module.
- Report a bug.

## Start by Filing a GitHub Issue

Before starting work on a new feature, file a GitHub issue in the relevant repository. Doing so allows you to ask questions and gather feedback from maintainers and the community before committing significant time to writing code. Feel free to ask if you are unsure about any aspect of your contribution.

For minor changes, such as adding a new variable or output value, you may proceed directly to creating a pull request, as outlined below.

## Proceed to a Pull Request

If opening a pull request is appropriate, adhere to the following steps:

### Update the Documentation First

Update the documentation **before** modifying any code. This step follows the principle of [Readme Driven Development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html). Documenting the change first ensures the documentation remains current and allows you to conceptualize the solution at a high level before diving into implementation.

### Update the Tests

Add or update automated tests **before** changing the code, following the practice of [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development). Begin by creating or updating test cases, ensuring they fail with clear error messages. Then, modify the code to make the test pass. This approach keeps the tests up to date and validates existing and new functionality. Refer to the `test` folder in the repository for instructions on running tests locally.

### Update the Code

With tests in place, implement your code changes. Use the new test cases to confirm that the changes work as intended.

### Create a Pull Request

[Create a pull request](https://help.github.com/articles/creating-a-pull-request/) with your changes. Make sure to include the following information:

1. A description of the change, including a link to the corresponding GitHub issue.
2. Notes regarding any backward incompatibility.
3. Any other relevant details.

#### How to Create a Pull Request on a Gruntwork Repository

As a Gruntwork customer, you will have **read** access to Gruntwork repositories. Therefore, you cannot push branches directly to Gruntwork repositories. Instead, follow these steps:

1. Fork the Gruntwork repository into a repository within an organization where you have write access.
2. Push your branch to your forked repository.
3. Open a pull request against the Gruntwork repository. Set the base branch to Gruntwork’s `main` or `master` branch, and compare the branch to the branch in your forked repository.

For additional details, refer to [GitHub’s documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).

### Merge and Release

Gruntwork maintainers will review your contribution and provide feedback as necessary. Once approved, they will merge the changes and release a new version.
