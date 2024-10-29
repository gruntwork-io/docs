# Telemetry

Patcher uses [sentry.io](https://sentry.io) for application performance monitoring and error tracking. This data helps us catch bugs quickly and improve Patcher.

### Anonymous UUID

When you first run Patcher, we generate an anonymous UUID for that Patcher install.

This UUID is stored in `~/.patcher/config.json` and the same UUID will be sent each time you run Patcher.

Example `config.json` file:
```
// NOTE: Changing this file requires a restart of Patcher.
{
	// Unique id used for correlating telemetry sent from this instance.
	// Do not edit this value.
	"telemetry-reporter-id": "a8884e6a-da99-43e3-86d0-f92a3605d731"
}
```

### Opting Out

You can opt out of sending telemetry data by setting the `PATCHER_TELEMETRY_OPT_OUT` environment variable to `true`.
```bash
export PATCHER_TELEMETRY_OPT_OUT=true
```
