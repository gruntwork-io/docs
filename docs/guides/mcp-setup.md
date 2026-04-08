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
  - [Claude Desktop](https://claude.ai/download)
  - [Cursor](https://www.cursor.com/)

:::tip
The MCP API must be enabled for your account. If it is not, contact us at
[support@gruntwork.io](mailto:support@gruntwork.io) to request access.
:::

## Step 1: Create an API Key

1. Log in to the [Gruntwork Developer Portal](https://app.gruntwork.io).
2. Navigate to **Settings** > **MCP API Keys**.
3. Click **Create MCP API Key**.
4. Enter a descriptive name for the key (e.g., "Work Laptop" or "CI Server"). We recommend one key per device.
5. **Copy the key immediately.** It starts with `gw_mk_` and is only shown once — you will not be able to retrieve it
   later. Store it somewhere safe.

:::caution
Treat your API key like a password. Do not commit it to version control or share it in chat. If a key is compromised,
revoke it immediately from the MCP API Keys settings page.
:::

## Step 2: Configure Your AI Tool

### Claude Code

Add the Gruntwork MCP server to your Claude Code configuration. Run the following command:

```bash
claude mcp add gruntwork \
  --transport http
  --header "Authorization: Bearer YOUR_API_KEY" \
  https://mcp.gruntwork.io/api/mcp
```

Replace `YOUR_API_KEY` with the key you copied in Step 1.

To verify the server is connected:

```bash
claude mcp list
```

You should see `gruntwork` listed with a status of `connected`.

### Claude Desktop

1. Open Claude Desktop and go to **Settings** > **Developer** > **Edit Config**.
2. Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gruntwork": {
      "url": "https://mcp.gruntwork.io/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

3. Replace `YOUR_API_KEY` with the key you copied in Step 1.
4. Restart Claude Desktop.

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
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

3. Replace `YOUR_API_KEY` with the key you copied in Step 1.

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

## Managing API Keys

### Viewing Keys

Go to **Settings** > **MCP API Keys** in the Developer Portal. You can see all active keys for your account, including
when they were last used.

### Revoking a Key

If a key is lost or compromised, revoke it immediately:

1. Go to **Settings** > **MCP API Keys**.
2. Click **Revoke** next to the key you want to disable.
3. Confirm the revocation.

Revoked keys stop working immediately. You will need to create a new key and update your tool configuration.

### Key Limits

- Each user can have up to **5 active keys** at a time.
- Keys expire after **1 year** by default.
- Revoked keys do not count toward the limit.

## Troubleshooting

### "MCP API keys are not enabled for your organization"

The MCP API must be enabled for your account. Contact us at [support@gruntwork.io](mailto:support@gruntwork.io) to
request access.

### Key rejected or unauthorized

- Verify the key was copied correctly (it should start with `gw_mk_`).
- Check that the key has not been revoked in the Developer Portal.
- Ensure the key has not expired (keys expire after 1 year).
- Create a new key if needed.

### MCP server not connecting

- Ensure your tool is configured with the correct server URL.
- Check that your network allows outbound HTTPS connections to `mcp.gruntwork.io/api/mcp`.
- Restart your AI tool after making configuration changes.
- Run `claude mcp list` (Claude Code) to verify server status.

### Rate limiting

The MCP server allows up to **60 requests per minute** per API key. If you hit this limit, wait briefly before
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


<!-- ##DOCS-SOURCER-START
{
  "sourcePlugin": "local-copier",
  "hash": "mcp-setup-guide-v1"
}
##DOCS-SOURCER-END -->
