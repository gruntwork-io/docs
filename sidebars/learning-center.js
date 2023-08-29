const sidebar = [
    {
        label: "Learning Center",
        type: "category",
        collapsible: false,
        items: [
            {
                label: "Welcome",
                type: "doc",
                id: "learning-center/index"
            },
            {
                label: "envcommon",
                type: "category",
                collapsible: true,
                items: [
                    {
                        label: "What is envcommon?",
                        type: "doc",
                        id: "learning-center/envcommon/index"
                    },
                    {
                        label: "Using envcommon",
                        type: "doc",
                        id: "learning-center/envcommon/usage"
                    }
                ]
            }
        ]
    }
]

module.exports = sidebar
