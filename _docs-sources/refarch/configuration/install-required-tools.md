# Install Required Tools

Configuring your Reference Architecture requires that you have `git` and the `gruntwork` CLI tool installed on your machine. You have two options for installation.

## Use the bootstrap script (preferred)

The bootstrap script will ensure you have all required dependencies installed. Within your `infrastructure-live` repository, there are two bootstrap scripts.
- `bootstrap_unix.sh` which can be run on macOS and Linux machines
- `bootstrap_windows.py` which runs on Windows machines

Choose the correct bootstrap script for your system. Both scripts perform the equivalent functionality.

In addition to installing dependencies, the bootstrap script will:
- Ensure you are running the script in the root of your `infrastructure-live` repository
- Ensure you have sufficient GitHub access to access and clone private Gruntwork repositories
- Download the Gruntwork installer
- Use the Gruntwork installer to install the Gruntwork command line interface (CLI) which contains the Reference Architecture configuration wizard. The wizard will make a best effort attempt to automatically perform the required setup **actions**
- [Run the Gruntwork wizard](./use-the-gruntwork-cli) to assist you in completing your Reference Architecture configuration steps

## Install manually

### Installing git
If you would like to install `git` manually, installation steps can be found on the [Git SCM Installing Git Guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).


### Installing gruntwork CLI
If you would like to install the Gruntwork CLI manually, we recommend downloading the latest release from the [GitHub releases page](https://github.com/gruntwork-io/gruntwork/releases).
