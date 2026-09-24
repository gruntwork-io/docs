# Pipelines Ignore List

Pipelines supports ignoring files by setting the Ignore List [HCL](/2.0/reference/pipelines/configurations-as-code/api#ignore_list) or [YAML](/2.0/reference/pipelines/configurations#ignore-list) configuration value.

## Syntax

Each entry in the Ignore List is a glob pattern, matched against paths relative to the repository root.

- `*` Matches any character except `/`, for matches within a specific directory.
- `**` Matches any character, for matches across multiple directories.
- `{a,b}` Matches either `a` or `b`. Alternatives are separated by `,` and can be nested.

The Ignore List is a list of patterns.

```hcl
repository {
  ignore_list = ["README.md", ".github/**"]
}
```

```yaml
pipelines:
  ignore-list:
    - README.md
    - .github/**
```

Brace alternation lets one pattern cover several paths. `{catalog,.github}/**` matches every file under `catalog` and every file under `.github`.

```hcl
repository {
  ignore_list = ["README.md", "{catalog,.github}/**"]
}
```

```yaml
pipelines:
  ignore-list:
    - README.md
    - "{catalog,.github}/**"
```

### Pre-v4.29.0

Before [`pipelines-workflows` v4.29.0](https://github.com/gruntwork-io/pipelines-workflows/releases/tag/v4.29.0), the Ignore List is a single string with `,` separating one pattern from the next. This is still supported for backwards compatibility.

```hcl
repository {
  ignore_list = "README.md,.github/**"
}
```

```yaml
pipelines:
  ignore-list: "README.md,.github/**"
```

Brace alternation is not supported in the string form.

## Common Examples

### Ignore specific files

`["myfile.yml"]` - Matches the exact path to this file at the root level.

`["myfile.yml", "a/b/c/myfile.yml"]` - Matches both of these specific paths.

### Ignore all files with extension .md

`["**.md"]` - Matches all paths ending in .md, regardless of directory depth.

### Ignore README.md everywhere

`["README.md", "**/README.md"]` - Matches the root README.md as well as any README.md in any directory.

### Ignore all files in a directory

`["a/**"]` - Matches any file in `a` or a subdirectory of `a`. For example, both `a/myfile.yml` and `a/b/c/myfile.yml` will be ignored.

### Ignore all files in several directories

`["{docs,examples,test}/**"]` - Matches any file under `docs`, `examples`, or `test`.

### Ignore all files with extension .md in a directory

`["docs/**.md"]` - Matches all .md files in the docs directory and its subdirectories. For example, `docs/file.md` will be ignored, but not `docs/file.yml`.

### Ignore all files only in a specific directory, but not subdirectories

`["a/*"]` - Matches any file directly in the `a` directory, but not in subdirectories. For example, `a/myfile.yml` is ignored, but `a/b/c/myfile.yml` is not.
