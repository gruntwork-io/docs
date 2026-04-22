# Setting Up the Gruntwork MCP Server

AI coding assistants are powerful, but without the right context they often generate infrastructure code that is
brittle, insecure, or misses operational best practices. The Gruntwork MCP server solves this by connecting your
AI assistant — Claude Code, Claude Desktop, Cursor, and others — directly to the Gruntwork IaC Library.

With this connection, your AI assistant generates higher quality infrastructure-as-code grounded in battle-tested,
production-hardened modules and patterns rather than guessing from its training data. The result is IaC that follows
proven conventions, handles edge cases, and is ready for real-world deployment from the start.

## Prerequisites

- A Gruntwork account with MCP API access enabled
- One of the following MCP-compatible AI tools installed:
  - [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (CLI)
  - [Cursor](https://www.cursor.com/)

:::tip
The MCP API must be enabled for your account. If it is not, contact us at
[support@gruntwork.io](mailto:support@gruntwork.io) to request access.
:::

## Step 1: Create an Access Token

1. Log in to the [Gruntwork Developer Portal](https://app.gruntwork.io).
2. Navigate to **[Settings](https://app.gruntwork.io/settings/profile#mcp-api-keys)** > **MCP Access Tokens**.
3. Click **Create MCP Access Token**.
4. Enter a descriptive name for the token (e.g., "Work Laptop" or "CI Server"). We recommend one token per device.
5. **Copy the token immediately.** It starts with `gw_mk_` and is only shown once — you will not be able to retrieve
   it later. Store it somewhere safe.

:::caution
Treat your access token like a password. Do not commit it to version control or share it in chat. If a token is
compromised, revoke it immediately from the MCP Access Tokens settings page.
:::

## Step 2: Configure Your AI Tool

### Claude Code

Add the Gruntwork MCP server to your Claude Code configuration. Run the following command:

```bash
claude mcp add --transport http gruntwork \
    https://mcp.gruntwork.io/api/mcp \
    --header "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

Replace `YOUR_ACCESS_TOKEN` with the access token you copied in Step 1.

To verify the server is connected:

```bash
claude mcp list
```

You should see `gruntwork` listed with a status of `connected`.

#### Recommended: Install the Gruntwork Skills for Claude Code

The MCP server gives Claude Code raw access to the Gruntwork IaC Library. For the best experience, also install
the Gruntwork skills — a set of pre-built `/gruntwork-*` workflows that tell Claude Code exactly which MCP tools
to use for common tasks, producing more consistent results than unguided queries.

The skills cover:

- `/gruntwork-find` — discover the right Gruntwork module for an infrastructure requirement
- `/gruntwork-deploy` — scaffold Terragrunt configs for a specific module
- `/gruntwork-debug` — troubleshoot Terragrunt, OpenTofu/Terraform errors
- `/gruntwork-patcher` — audit module versions and apply patches or upgrades
- `/gruntwork-terragrunt` — explain Terragrunt concepts, blocks, functions, repo structure, and migrations

From the root of your `infrastructure-live` repo:

```bash
npx @gruntwork-ai/skills-setup --repo . --key YOUR_ACCESS_TOKEN
```

This will:

- Install the `/gruntwork-*` skill files into `.claude/skills/`
- Write a project-scoped `.claude/settings.json` that registers the Gruntwork MCP server for this repo (if you
  already ran `claude mcp add` above, both registrations work side-by-side — no need to undo it)
- Scan the repo for Gruntwork module versions, AWS accounts, and AWS regions, and generate a `CLAUDE.md` so
  Claude Code has ambient stack context in every session

All scanning is local — nothing leaves your machine. Pass `--no-scan` to skip the filesystem scan; `CLAUDE.md` is still written with placeholders you can fill in by hand.


### Cursor

1. Open the Cursor settings with `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux) and search for
   **"MCP: Add Server"**.
2. Add a new server with the following configuration:

```json
{
  "mcpServers": {
    "gruntwork": {
      "url": "https://mcp.gruntwork.io/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_ACCESS_TOKEN"
      }
    }
  }
}
```

3. Replace `YOUR_ACCESS_TOKEN` with the access token you copied in Step 1.

## Step 3: Verify the Connection

Once configured, test the connection by asking your AI assistant something like:

> "Using the Gruntwork library, how do I deploy a VPC in AWS?"

If the MCP server is working correctly, the assistant will search the Gruntwork IaC Library and provide answers grounded
in Gruntwork's modules and documentation.

## What Can the MCP Server Do?

The Gruntwork MCP server gives your AI assistant access to:

- **Semantic search** — Search across Gruntwork's entire codebase and documentation to find the most relevant modules,
  patterns, and best practices for your use case.
- **Best-practice code generation** — Generate infrastructure code grounded in Gruntwork's production-tested modules
  and conventions, not just generic examples from training data.
- **Module documentation** — Read detailed READMEs, variable definitions, and example usage for any module.
- **IaC guidance** — Get best-practice answers to infrastructure questions informed by Gruntwork's library of
  battle-tested patterns and real-world deployment experience.

Your AI assistant will automatically use these capabilities when relevant to your questions.

## Managing Access Tokens

### Viewing Tokens

Go to [settings](https://app.gruntwork.io/settings/profile#mcp-api-keys) in the Developer Portal. You can see all
active tokens for your account, including when they were last used.

### Revoking a Token

If a token is lost or compromised, revoke it immediately:

1. Go to **Settings** > **MCP Access Tokens**.
2. Click **Revoke** next to the token you want to disable.
3. Confirm the revocation.

Revoked tokens stop working immediately. You will need to create a new token and update your tool configuration.

### Token Limits

- Each user can have up to **5 active tokens** at a time.
- Tokens expire after **1 year** by default.
- Revoked tokens do not count toward the limit.

## Troubleshooting

### "MCP API keys are not enabled for your organization"

The MCP API must be enabled for your account. Contact us at [support@gruntwork.io](mailto:support@gruntwork.io) to
request access.

### Token rejected or unauthorized

- Verify the access token was copied correctly (it should start with `gw_mk_`).
- Check that the token has not been revoked in the Developer Portal.
- Ensure the token has not expired (tokens expire after 1 year).
- Create a new token if needed.

### MCP server not connecting

- Ensure your tool is configured with the correct server URL.
- Check that your network allows outbound HTTPS connections to `mcp.gruntwork.io/api/mcp`.
- Restart your AI tool after making configuration changes.
- Run `claude mcp list` (Claude Code) to verify server status.

### Rate limiting

The MCP server allows up to **60 requests per minute** per access token. If you hit this limit, wait briefly before
continuing. For most interactive workflows this limit will not be reached.

## Example: Confirming It's Working

Once you've completed setup, try the following prompt in your AI assistant to confirm the MCP server is connected and
returning results:

> "Using the Gruntwork MCP server, look up the `terraform-aws-vpc` module and tell me what variables it requires."

If everything is working correctly, you should see a response that:

1. **References the Gruntwork IaC Library** — The assistant should mention specific Gruntwork modules rather than
   generating generic Terraform code from its training data.
2. **Lists actual module variables** — You should see real variable names, types, and descriptions pulled from the
   module's source code (e.g., `vpc_name`, `cidr_block`, `num_nat_gateways`).
3. **Includes usage context** — The response may include example `terragrunt.hcl` or `module` blocks showing how to
   call the module with the required variables populated.

If instead the assistant responds with generic Terraform VPC code that doesn't reference Gruntwork modules, the MCP
server is likely not connected. Go back to [Step 2](#step-2-configure-your-ai-tool) and verify your configuration, then
check the [Troubleshooting](#troubleshooting) section.
