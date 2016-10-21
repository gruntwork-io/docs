# docs-preprocessor

The purpose of docs-preprocessor is to prepare a single folder to be used to convert markdown to HTML.

In particular, docs-preprocessor starts with a folder structure that looks like this:

```
├── introduction
|   └── overview.md
|   └── setup.md
├── module-vpc
|   └── docs
|       └── core-concepts.md
|   └── examples
|       └── vpc-app
|           └── ...
|           └── README.md
|       └── ...
|   └── modules
|       └── vpc-app
|           └── ...
|           └── README.md
|       └── ...
|   └── README.md
```

to this:

```
├── introduction
|   └── overview.md
|   └── setup.md
├── packages
|   └── module-vpc
|       └── modules
|           └── vpc-app
|               └── overview.md
|               └── example.md
|           └── ...
|       └── overview.md
|       └── core-concepts.md
```

The tool is written in Go (as opposed to bash) to support more exotic mapping logic in the future if needed.