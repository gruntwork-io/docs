# Pipelines Ignore Filter

Pipelines supports ignoring files by setting the `PIPELINES_IGNORE_FILTER` environment variable within your [HCL](/2.0/reference/pipelines/configurations-as-code/api#env-block) or [YAML](/2.0/reference/pipelines/configurations#env) configuration files.

## Syntax

The Ignore Filter can contain multiple patterns separated by the `:` character.

- `:` Is used as a separator between filters
- `*` Matches any character except `/`, for matches within a specific directory.
- `**` Matches any character, for matches across multiple directories.

## Common Examples

### Ignore specific files

`myfile.yml` - Matches the exact path to this file at the root level.

`myfile.yml:a/b/c/myfile.yml` - Matches both of these specific paths. Multiple patterns can be specified by separating them with `:`.

### Ignore all files with extension .md

`**.md` - Matches all paths ending in .md, regardless of directory depth.

### Ignore README.md everywhere

`README.md:**/README.md` - Matches the root README.md as well as any README.md in any directory.

### Ignore all files in a directory

`a/**` - Matches any file in `a` or a subdirectory of `a`. For example, both `a/myfile.yml` and `a/b/c/myfile.yml` will be ignored.

### Ignore all files with extension .md in a directory

`docs/**.md` - Matches all .md files in the docs directory and its subdirectories. For example, `docs/file.md` will be ignored, but not `docs/file.yml`.

### Ignore all files only in a specific directory, but not subdirectories

`a/*` - Matches any file directly in the `a` directory, but not in subdirectories. For example, `a/myfile.yml` is ignored, but `a/b/c/myfile.yml` is not.

