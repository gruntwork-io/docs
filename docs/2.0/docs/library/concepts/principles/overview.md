import DocCardList from '@theme/DocCardList';

# Overview

Developing and maintaining a comprehensive library of modules requires clearly defined and documented principles to support ongoing iteration and improvement.

These principles serve as a framework for decision-making when multiple valid solutions are available for addressing a problem.

## High-level principles

The following high-level principles are intended to continuously improve the quality and reliability of the modules within this library.

### If it isn't tested, it's broken

The [Terratest](https://github.com/gruntwork-io/terratest) testing library was developed to provide an efficient and effective method for testing Infrastructure as Code (IaC) modules.  

All modules in this library **must** have associated tests. Wherever feasible, these tests should cover all critical functionalities and behaviors.  

While maintaining a comprehensive suite of tests can be resource-intensive, neglecting testing introduces significantly higher risks and costs due to the library's extensive surface area.  

As a best practice, it is **more important that a module has basic testing coverage** than that it is tested exhaustively.

<DocCardList />
