import React from "react"
import CodeBlock from "@theme/CodeBlock"
import Link from "@docusaurus/Link"
import { Hook, hookInputs } from "./hooks"

const AUTHENTICATION = "/2.0/docs/pipelines/guides/hooks/authentication"

/**
 * The hook block a customer declares, ready to paste. Required inputs are set to <REQUIRED>; a
 * secret is named underneath instead, since a literal in an env block reaches ps output and CI
 * logs. The reference pins the compatibility line, not the major.
 */
const HookUsage: React.FunctionComponent<Hook> = (hook) => {
  const { name, phase, commands = [], on_errors: onErrors, line } = hook

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

  const onErrorsAttributes: [string, string][] = onErrors
    ? [["on_errors", hclList(onErrors)]]
    : []
  const attributes: [string, string][] = [
    ["commands", hclList(commands)],
    ...onErrorsAttributes,
    ["execute", `["pipelines", "hook", "${reference}"]`],
  ]
  const attributeWidth = Math.max(
    ...attributes.map(([attribute]) => attribute.length)
  )

  const block = [
    "repository {",
    `  ${phase} "${name}" {`,
    ...attributes.map(
      ([attribute, value]) =>
        `    ${attribute.padEnd(attributeWidth)} = ${value}`
    ),
    ...(settable.length > 0
      ? [
          "",
          "    env {",
          ...settable.map((v) => `      ${v.padEnd(width)} = "<REQUIRED>"`),
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

const hclList = (values: string[]) =>
  `[${values.map((value) => JSON.stringify(value)).join(", ")}]`

export default HookUsage
