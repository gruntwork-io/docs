
export const redirects = [
    {
        to: '/foundations/network-topology',
        from: '/2.0/docs/accountfactory/architecture/network-topology',
    },
    {
        to: '/2.0/docs/pipelines/architecture/audit-logs',
        from: '/pipelines/security/audit-log'
    },
    {
        from: '/pipelines/security/controls',
        to: '/2.0/docs/pipelines/architecture/security-controls',
    },
    // Redirect from multiple old paths to the new path
    {
        to: '/docs/newDoc2',
        from: ['/docs/oldDocFrom2019', '/docs/legacyDocFrom2016'],
    },
    {
        from: '/2.0/reference',
        to: '/docs/reference2',
    }
]