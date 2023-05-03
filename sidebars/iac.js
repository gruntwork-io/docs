const sidebar = [
    {
        "label": "What is all this?",
        "type": "category",
        "link": {
        "type": "doc",
        "id": "iac/whats-this/index"
        },
        "items": [
            "iac/whats-this/modules",
            "iac/whats-this/services",
        ]
    },
    {
        "label": "Getting Started",
        "type": "category",
        "link": {
        "type": "doc",
        "id": "iac/getting-started/index"
        },
        "items": [
            "iac/getting-started/setting-up",
            "iac/getting-started/accessing-the-code",
        ]
    },
    {
        "label": "Usage",
        "type": "category",
        "link": {
        "type": "doc",
        "id": "iac/usage/index"
        },
        "items": [
            "iac/usage/using-a-module",
            "iac/usage/using-a-service",
            "iac/usage/composing-your-own-service",
            "iac/usage/customizing-modules",
        ]
    }
]

module.exports = sidebar
