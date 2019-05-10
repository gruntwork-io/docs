# Doc Sourcer

- `doc-sourcer` utility that will generate and copy in docs from child repos
- Idea:
    - clone repo
    - generate docs based on config
    - copy artifact into `content` dir
    - let gatsby render the artifacts

- Config format:

    ```yaml
    # gruntydocs.yml
    # What command to run to generate the docs.
    builder: ./build.sh
    # Where the target files live. These will be pulled in verbatim to /content in the docs repo.
    targets:
      - ./generated/final
    ```

- Repos config format:

    ```yaml
    ---
    repos:
      - url: "git@github.com:gruntwork-io/prototypes.git"
        branch: "yori-quickstarts"
        gruntyDocsRoot: "quickstarts"
    ```
