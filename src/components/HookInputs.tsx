import React from "react"
import styles from "./HookInputs.module.css"
import { Hook, HookInput, hookInputs } from "./hooks"

type TableProps = {
  heading: string
  rows: { input: HookInput; variable: string }[]
}

/** Help without the trailing "One of: ..." sentence, which `enum` renders instead. */
const help = (input: HookInput) => {
  const text = input.help ?? ""
  const start = text.lastIndexOf("One of:")

  if (!input.enum?.length || start === -1) {
    return input.help
  }

  // Spacing varies between hooks, so both sides are compared without it.
  const compact = (value: string) => value.replace(/\s/g, "")
  const trailing = compact(text.slice(start)).replace(/\.$/, "")

  return trailing === compact(`One of:${input.enum.join(",")}`)
    ? text.slice(0, start).trimEnd()
    : input.help
}

const InputTable: React.FunctionComponent<TableProps> = ({ heading, rows }) => {
  if (rows.length === 0) {
    return null
  }

  return (
    <>
      <h3>{heading}</h3>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ input, variable }) => (
            <tr key={variable}>
              <td>
                <code>{variable}</code>
                {!!input.since && (
                  <span className={styles.added}>Added in {input.since}</span>
                )}
              </td>
              <td>
                {help(input)}
                {!!input.enum?.length && (
                  <>
                    {" One of "}
                    {input.enum.map((option, i) => (
                      <React.Fragment key={option}>
                        {i > 0 && ", "}
                        <code>{option}</code>
                      </React.Fragment>
                    ))}
                    .
                  </>
                )}
                {!!input.default && (
                  <>
                    {" Defaults to "}
                    <code>{input.default}</code>.
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

/**
 * Every input a hook accepts, split by whether it must be supplied. `since` marks an input added
 * after the hook's compatibility line opened.
 */
const HookInputs: React.FunctionComponent<Hook> = (hook) => {
  const required = hookInputs(hook, true)
  const optional = hookInputs(hook, false)

  if (required.length === 0 && optional.length === 0) {
    return null
  }

  return (
    <>
      <p>
        Configure inputs in the hook's <code>env</code> block.
      </p>
      <InputTable heading="Required" rows={required} />
      <InputTable heading="Optional" rows={optional} />
    </>
  )
}

export default HookInputs
