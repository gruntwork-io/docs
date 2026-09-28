/**
 * The fields a hook page reads from its _hook.json. Every one is optional: a page frozen under
 * previous/ was written by an older grreleaser and is never rewritten.
 */
export type HookInput = {
  name?: string
  help?: string
  default?: string
  enum?: string[]
  since?: string
  env?: string[]
  required?: boolean
}

export type Hook = {
  name?: string
  description?: string
  version?: string
  line?: string
  release?: string
  phase?: string
  commands?: string[]
  flags?: HookInput[]
  env?: HookInput[]
}

/**
 * A hook's inputs in declaration order, flags first, as the environment variables a customer sets.
 * An input with no variable cannot be set at all, so it is dropped. `secret` marks an env-only
 * input, which is never written into an `env` block.
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
