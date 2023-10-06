const sidebar = [
    {
        label: "Landing Zone",
        type: "category",
        collapsible: false,
        items: [
            {
                label: "Ovrerview",
                type: "doc",
                id: "landing-zone/index",
            },
            "landing-zone/prerequisites",
            "landing-zone/enable-control-tower",
            "landing-zone/add-aws-account",
            "landing-zone/manage-accounts",
            "landing-zone/logging",
        ]
    }
]

module.exports = sidebar
