/**
 * What the components below read out of a Gruntwork-provided hook's _hook.json, which grreleaser
 * writes from the hook's released API artifact. The file carries more; this is what a page uses.
 *
 * Every field is optional. A page frozen under previous/ was written by an older grreleaser and
 * is never rewritten, so a missing field must render as absent rather than throw.
 */
export type HookInput = {
  name?: string
  help?: string
  default?: string
  since?: string
  env?: string[]
  required?: boolean
}

export type Hook = {
  name?: string
  version?: string
  line?: string
  release?: string
  phase?: string
  commands?: string[]
  flags?: HookInput[]
  env?: HookInput[]
}

/**
 * A hook's inputs in the order it declares them, flags first.
 *
 * `variable` is the environment variable a customer sets. A hook is run as `pipelines hook
 * <name>@<version>` and takes no arguments of its own, so the environment is the only way to
 * configure one. A flag carries the variable its hook derives for it; an env-only input already
 * is one. An input with neither cannot be set at all, so the page leaves it out rather than
 * naming it as something that would not work.
 *
 * `secret` marks an input the hook reads only from the environment. Those are never written into
 * an `env` block: a literal there reaches ps output and CI logs.
 */
export const hookInputs = (hook: Hook, required: boolean) =>
  [
    ...(hook.flags ?? [])
      .filter((flag) => !!flag.required === required)
      .map((flag) => ({
        input: flag,
        variable: flag.env?.[0] ?? "",
        secret: false,
      })),
    ...(hook.env ?? [])
      .filter((entry) => !!entry.required === required)
      .map((entry) => ({
        input: entry,
        variable: entry.name ?? "",
        secret: true,
      })),
  ].filter(({ variable }) => variable !== "")
