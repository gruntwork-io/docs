import React from "react"
import Admonition from "@theme/Admonition"

type CCLicenseAttribute =
  | "cc"
  | "by"
  | "nc"
  | "nc-eu"
  | "nc-jp"
  | "sa"
  | "nd"
  | "pd"
  | "zero"
  | "share"
  | "remix"

type CCLicenseProps = {
  license: CCLicenseAttribute | [CCLicenseAttribute]
  version: string
  children
}

export const CCLicense: React.FunctionComponent<CCLicenseProps> = ({
  license,
  version = "4.0",
  children,
}) => {
  // we need to iterate over the license attributes even if only one was provided
  const attrs = Array.isArray(license) ? license : [license]

  // construct the set of icons corresponding to the license attributes
  const icons = attrs.map((attr) => {
    return (
      <img
        src={`https://mirrors.creativecommons.org/presskit/icons/${attr}.svg`}
        alt={`CC ${attr} icon`}
        className="no-zoom"
      />
    )
  })

  // prepend the default CC icon
  icons.unshift(
    <img
      src={`https://mirrors.creativecommons.org/presskit/icons/cc.svg`}
      alt={`CC icon`}
      className="no-zoom"
    />
  )

  // construct license text and path segment
  const licenseLabel = attrs.join("-").toUpperCase()

  // construct an admonition from these elements
  return (
    <div style={{ margin: "4rem 0" }}>
      <Admonition type="note" icon={icons} title="License">
        {children ? (
          children
        ) : (
          <>
            This content is provided under a{" "}
            <a
              href={`https://creativecommons.org/licenses/${licenseLabel.toLowerCase()}/${version}/`}
            >
              Creative Commons {licenseLabel} {version} license
            </a>
            .
          </>
        )}
      </Admonition>
    </div>
  )
}

export default CCLicense
