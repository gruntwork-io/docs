import React from "react"
import Admonition from "@theme/Admonition"

export const OpenTofuNotice = () => {
    return (
        <Admonition type="tip" title="OpenTofu Support">
            <p>Gruntwork Library will support OpenTofu when it becomes available. To learn more, see the official <a href="https://opentofu.org/">OpenTofu website</a> and <a href="https://github.com/opentofu/opentofu/blob/main/WEEKLY_UPDATES.md">project status</a>.</p>
        </Admonition>
    )
}

export default OpenTofuNotice
