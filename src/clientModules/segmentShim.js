// Ensures window.analytics exists before @twilio-labs/docusaurus-plugin-segment's
// onRouteDidUpdate handler runs. The plugin (v0.1.0, unmaintained) registers
// its client module in Docusaurus 3 dev mode even though the inline init
// snippet is only injected in production, leaving window.analytics undefined.
// This shim also guards production against ad-blockers/CSP that prevent the
// Segment loader from initializing the queue.
if (typeof window !== 'undefined' && !window.analytics) {
  window.analytics = new Proxy({}, {get: () => () => {}});
}
