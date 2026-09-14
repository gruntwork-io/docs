import React from "react"
import CodeBlock from "@theme/CodeBlock"
import Link from "@docusaurus/Link"
import { Hook, hookInputs } from "./hooks"

const AUTHENTICATION = "/2.0/docs/pipelines/guides/hooks/authentication"

/**
 * The hook block a customer declares, ready to paste.
 *
 * The env block sets the inputs with no default, so filling those in is all a copy needs. An
 * input the hook reads only from the environment is a secret and is named underneath instead:
 * a literal in an env block reaches ps output and CI logs.
 *
 * The version reference is the hook's compatibility line rather than its major, so a page frozen
 * under previous/ keeps pointing at the line it documents.
 */
const HookUsage: React.FunctionComponent<Hook> = (hook) => {
  const { name, phase, commands = [], line } = hook

  if (!name || !phase || commands.length === 0) {
    return null
  }

  const required = hookInputs(hook, true)
  const settable = required
    .filter(({ secret }) => !secret)
    .map(({ variable }) => variable)
  const secrets = required
    .filter(({ secret }) => secret)
    .map(({ variable }) => variable)

  const width = Math.max(0, ...settable.map((variable) => variable.length))
  const reference = line ? `${name}@${line}` : name

  const block = [
    "repository {",
    `  ${phase} "${name}" {`,
    `    commands = [${commands.map((command) => `"${command}"`).join(", ")}]`,
    `    execute  = ["pipelines", "hook", "${reference}"]`,
    ...(settable.length > 0
      ? [
          "",
          "    env {",
          ...settable.map((v) => `      ${v.padEnd(width)} = ""`),
          "    }",
        ]
      : []),
    "  }",
    "}",
  ].join("\n")

  return (
    <>
      <CodeBlock language="hcl">{block}</CodeBlock>
      {secrets.map((variable) => (
        <p key={variable}>
          <code>{variable}</code> is a secret. Supply it from{" "}
          <code>execute</code>, as{" "}
          <Link to={AUTHENTICATION}>Authentication &amp; Secrets</Link>{" "}
          describes.
        </p>
      ))}
    </>
  )
}

export default HookUsage
