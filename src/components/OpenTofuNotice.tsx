import React from "react"
import Admonition from "@theme/Admonition"

export const OpenTofuNotice = () => {
    return (
        <Admonition type="tip" title="OpenTofu Support">
            <p>Gruntwork Library activley supports OpenTofu. If you encounter any issues using the library with OpenTofu please reach out to support@gruntwork.io.</p>
        </Admonition>
    )
}

export default OpenTofuNotice
