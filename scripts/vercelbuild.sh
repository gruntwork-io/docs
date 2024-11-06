#!/bin/bash


# Read the entire contents of package.json into a variable
package_json=$(cat package.json)

# We remove the optional dependencies in our package script because we don't need them when built in vercel
# Vercel's build environment doesn't have auth to download our private packages, and all the techniques
# we've considered to give it that auth have non-trivial security implications we're uncomfortable with,
# so simply removing them should be

sed 's/optionalDependencies/unusedOptionalDependencies/' package.json > temp.json
mv temp.json package.json

yarn install