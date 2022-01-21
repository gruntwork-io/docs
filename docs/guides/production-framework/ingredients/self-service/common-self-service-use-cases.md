# Common Self-Service use cases

Here are just a few of the most common self-service use cases we've seen at most companies, listed in roughly the order that teams use them:

## Account vending machine

A way for teams to request a new account (e.g., new AWS account), including setting up a *baseline* in that account that takes care of all the basic requirements around authentication, authorization, audit logging, networking, tagging, billing, and so on. Once the account is set up, grant the appropriate team access to that account for deploying other infrastructure into it from the Service Catalog (e.g., a database or app, as described next).

## Database deployment

Create a new database (e.g., a new PostgreSQL DB) that meets the company's requirements around replication, backup, scalability, security, and so on. Then, create a new user within that database, store the user's credentials in a secret store, and make them available to the appropriate team. Finally, configure some sort of schema management for the database (e.g., using Flyway, ActiveRecord, Phinx).

## App deployment

Deploy a new app: that is, a web service written in a general purpose programming language such as Java, Ruby, Python or Go. This may include spinning up a new orchestration tool—e.g., a new Kubernetes cluster or Auto Scaling Group—to run the app, or possibly deploying the app using an existing orchestration tool (e.g., existing Kubernetes cluster). The app should be deployed in a way that meets all of your company's requirements around metrics, logging, alerting, service discovery, server hardening, scalability, high availability, and so on.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"9c13d0c788f2295456c702e6c7da82be"}
##DOCS-SOURCER-END -->
