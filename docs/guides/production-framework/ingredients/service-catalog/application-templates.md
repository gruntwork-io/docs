# Application templates

Your Service Catalog should also include templates for building applications. By "applications," we mean server-side
and client-side software your team might build using general purpose programming languages (e.g., Java, Ruby, Python,
JavaScript) and frameworks (e.g., Spring Boot, Ruby on Rails, Django, Express, React). These templates can be used both
to bootstrap brand new applications ("greenfield"), as well as reference code for updating existing applications
("brownfield") to use cloud-native practices.

You should typically provide templates, libraries, and frameworks for *at least* the following:

## Dev environment

A method for developers to run the app locally. This might include a set of instructions (e.g., install X, run command Y) and various scripts and commands to run (e.g., `docker-compose up`).

## Build system

A way to fetch app dependencies (e.g., NPM for JavaScript apps, Gems for Ruby code, Maven Central for Java apps, etc) and build the code (e.g., using tools such as Gradle, Rake, Bazel, etc).

## Packaging

A way to package the app for deployment, such as Docker images, VM images, `.jar` files, `.zip` file for Lambda, etc. You'll need to think through how to build those images efficiently (e.g., Docker layer caching), where to store those images (e.g., Docker Hub, ECR, Artifactory), and how to version those images (e.g., tags).

## App configuration

A way to configure the app for different environments (e.g., dev, stage, prod), such as config files (e.g., YAML, JSON), environment variables, config stores (e.g., Consul, SSM), Kubernetes manifests, etc. You'll need to think through how to share common configuration values across multiple apps and environments, how to deal with sensitive configuration values (see also secrets management), what to do when you need to update a configuration value (e.g., do you have to redeploy the app?), and if/how you'll test configuration changes (as they are one of the most common sources of outages).

## Automated tests

A way to automatically test the app, including which test libraries and frameworks to use and how to do pre-commit checks (e.g., code formatting), static analysis, unit tests, integration tests, end-to-end tests, and performance tests.

## Secrets management

Most apps need access to various types of sensitive data ("secrets"), such as database passwords, API keys, and TLS certs. You'll need to figure out how to store those secrets (e.g., in a secret store such as Vault, Kubernetes Secrets, or AWS Secrets Manager or in version control, encrypted with KMS), how the app will retrieve those secrets (e.g., how the app will authenticate to the secret store and fetch data or how it will get access to the encryption key to decrypt a secret), how secrets will be rotated, and how all of this will work in both dev environments and production.

## Auth

Your apps will likely need a way to handle both authentication (establishing who a user is) and authorization (determining what a user is allowed to do). Every company has different ways of handling this—e.g., a filter or middleware that handles auth automatically based on cookie data or an authentication or entitlements microservice to call explicitly—and getting auth wrong can be very costly, so you'll need your Service Catalog to include clear, tested examples of the right way to do it.

## Service discovery

Your apps will need to find a way to discover each other ("microservices") and other dependencies (e.g., a database) in a cloud environment where services and IPs are elastic and constantly change. This is typically done via an external service discovery mechanism (e.g., Consul, Envoy, ZooKeeper, Kubernetes Services) combined with your app knowing how to use those services: e.g., look up service endpoints via env vars, or rely on DNS, or rely on proxied IPs, or a thick client-library.

## Service mesh

Going one step beyond service discovery, you may not only need to know how to find a service, but also how to authenticate to it (e.g., mutual TLS auth), how to encrypt the communication channel (e.g., TLS), how to control which services are allowed to talk to which other services (e.g., ACLs), how to route traffic across all these services (e.g., load balancing), and how to see and debug what's going on (e.g., tracing). Although each of these problems can be solved in an ad-hoc way (e.g., distribute self-signed TLS certs), if you have enough services at play, you may wish to use a service mesh solution, such as Istio or Consul Connect, which solve all of these issues in a unified way.

## Service resilience

When talking to other services, especially at large scale, you need to think through how to make your services resilient to outages through the use of retries, exponential back-off, jitter, circuit breakers, thread management, async I/O, throttling, error handling, and so on.

## Metrics / observability

You'll want every app to be instrumented to provide metrics and event data to help debugging. This includes server-level metrics (e.g., CPU usage, memory usage, disk usage), app-level metrics (e.g., QPS, latency, error counts), and business-level metrics (e.g., which endpoints are being used, clicks/conversions, etc). You might instrument the app directly (e.g., embed a Java library that emits metrics in your Spring Boot app) or indirectly (e.g., a sidecar running alongside your app's Docker container).

## Logging

You'll need to figure out how to send logs to a central location (e.g., write logs to stdout/stderr and have your Docker orchestration tool send them to CloudWatch Logs or DataDog), how to format of the logs (e.g., structured logging vs plain text, Apache Commons format vs custom formats), what log levels to use (e.g., INFO, DEBUG, etc), and how to rotate log files on disk (so you don't run out of disk space).

## Database management

If your app interacts with a database, you'll want to think through how to manage schema migrations (e.g., using Flyway, ActiveRecord, Phinx), how to connect to the database (e.g., service discovery, TLS, cert validation), how to manage DB users, credentials, and permissions, how to manage connection pooling, whether to use an ORM or other database access library, whether or not to enable Transparent Data Encryption (TDE), and how to sanitize user input (avoiding the good old [Bobby Tables](https://xkcd.com/327/) attack).

## Asset pipeline

If your app depends on static content (images, CSS, JS, fonts), you will need to think through asset compilation (e.g., compile TypeScript to JS), minification, concatenation, fingerprinting, deployment to a CDN, rollbacks and cache invalidation in the face of deployment issues or a bad release, and making the URLs work across all environments.

## CI / CD

You'll want to make it as simple as possible for new apps to be integrated into your CI / CD pipeline (which we'll cover in more detail in the next section), including thinking through how to get the pipeline to build, test, and deploy your app completely automatically.




<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"local-copier","hash":"8fe39d263edd56aa3da7b053063169eb"}
##DOCS-SOURCER-END -->
