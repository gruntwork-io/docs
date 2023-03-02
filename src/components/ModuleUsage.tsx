import React, { PropsWithChildren } from "react"
import styles from "./ModuleUsage.module.css"

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import CodeBlock from "@theme/CodeBlock"

export interface HCLContainer {
  name: string
  description?: string
  type?: string
  default?: MetaDefault
  examples?: string[]
  notifications?: string[]
  tips?: string[]
  cautions?: string[]
  warnings?: string[]
  otherComments?: string[]
}

export type MetaDefault = string | number | boolean | null | Array<any> | Object

interface ModuleUsageProps {
  name?: string
  variables: HCLContainer[]
}

export const ModuleUsage: React.FunctionComponent<
  PropsWithChildren<ModuleUsageProps>
> = ({ children }) => {
  return (
    <Tabs>
      <TabItem
        className={`${styles.fixedHeight}`}
        value="terraform"
        label="Terraform"
        default
      >
        {children}
      </TabItem>
      <TabItem value="terragrunt" label="Terragrunt" >
        <CodeBlock
          language="hcl"
          title="terraform.tfvars"
        >

          # Coming soon!

        </CodeBlock>
      </TabItem>
    </Tabs>
  )
}

export default ModuleUsage
