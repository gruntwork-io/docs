import React from "react"

type ConfigOptionItemProps = {
    Required: boolean
    FullPath: string
    Description: string
    Example?: string
}

export const ConfigOptionItem: React.FunctionComponent<ConfigOptionItemProps> = ({
    Description,
    Required,
    FullPath,
    Example,
}) => {
  return (
    <>
    {Description}
    <ul>
        <li>
            Required: {Required ? (<strong>Yes</strong>) : ('No')}
        </li>
        <li>
            Full path: <code>{FullPath}</code>
        </li>
        {Example && (
        <li>
            Example:
            <pre>{Example}</pre>
        </li>
        )}
    </ul>
    </>
)}

export default ConfigOptionItem