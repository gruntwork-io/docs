# Step 1. Run the bootstrap script

Within your `infrastructure-live` repository, there are two bootstrap scripts: 
1. `bootstrap_unix.sh` which can be run on macOS and Linux machines
1. `bootstrap_windows.py` which runs on Windows machines

Choose the correct bootstrap script for your system. Both scripts perform the equivalent functionality. 

## What the bootstrap script does

The bootstrap script will: 
* Ensure you have required dependencies installed, such as the official `aws` command line tool and `git`
* Ensure you are running the script in the correct place (the root of your `infrastructure-live` repository)
* Ensure you have sufficient GitHub access to access and clone private Gruntwork repositories
* Download the Gruntwork installer 
* Use the Gruntwork installer to install the Gruntwork command line interface (CLI) which contains the Reference Architecture configuration wizard, which will make a best effort attempt to automatically perform the required setup **actions**
* Run the Gruntwork wizard to assist you in completing your Reference Architecture configuration steps

## The Gruntwork CLI wizard

The Gruntwork CLI wizard attempts to orchestrate all required configuration **actions**, such as: 
 1. Provisioning AWS accounts on your behalf for use in your Reference Architecture 
 1. Creating the `GruntworkAccountAccess` IAM role in each of your Reference Architecture accounts which is used by Gruntwork tooling and engineers to access and deploy resources into your accounts
 1. Registering new Route53 domain names on your behalf and configuring the Route53 Hosted Zones correctly so that your Reference Architecture can host applications that will resolve over the public internet

 and much more. 



