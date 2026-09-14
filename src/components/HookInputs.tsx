import React from "react"
import styles from "./HookInputs.module.css"
import { Hook, HookInput, hookInputs } from "./hooks"

type TableProps = {
  heading: string
  rows: { input: HookInput; variable: string }[]
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
                {input.help}
                {!!input.default && (
                  <>
                    {" "}
                    Defaults to <code>{input.default}</code>.
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
 * Every input a Gruntwork-provided hook accepts, split only by whether it must be supplied.
 *
 * An input carrying `since` arrived after the hook's compatibility line opened, and is marked. One
 * without has been accepted since the line opened, and says nothing.
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
