import React from "react"
import Admonition from "@theme/Admonition"

export const OpenTofuNotice = () => {
    return (
        <div>
            <Admonition type="tip" title="OpenTofu Support">
                <p>Gruntwork Library will support OpenTofu when OpenTofu becomes available.</p>

                <p>To learn more about OpenTofu see the official see the <a href="https://opentofu.org/">OpenTofu website</a> and the current <a href="https://github.com/opentofu/opentofu/blob/main/WEEKLY_UPDATES.md">project status</a>.</p>
            </Admonition>
        </div>
    )
}

export default OpenTofuNotice
