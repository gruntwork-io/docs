# What is Continuous Integration and Continuous Delivery?

Continuous Integration and Continuous Delivery (also widely known as CI/CD) are software development practices that
involve developers merging their work together and deploying it to production on a regular basis (oftentimes as
frequent as multiple times per day). The goal of a Continuous Integration process is to integrate the features developed
independently by engineers often enough such that you can identify problems with the design earlier in the process,
allowing you to improve the design incrementally. Similarly, by deploying the software more frequently to production,
the Continuous Delivery process enables you to keep software packages small enough to reduce the risk and impact of each
deployment.

While CI/CD for application code is well understood in the software industry, CI/CD for infrastructure code is a
nascent practice. This guide focuses on providing an overview of the background info, design, and implementation
of a production-ready CI/CD pipeline for infrastructure code.
