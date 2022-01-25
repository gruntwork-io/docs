# Key Automatic Updates features

## Works with multiple environments

The auto-update solution must know how to update each environment (e.g., dev, stage, prod) separately. You don't want a single PR updating all your environments at the same time, as that defeats the point of having separate environments in the first place! Instead, you must set up auto update to update one environment at a time, and when that update deployed and tested, move on to the next environment, and so on down the line: e.g., first update dev, test, and if everything is working, automatically update stage, test some more, and when that's working, automatically update prod. If at any point, you hit an issue, the updates should be automatically rolled back across all environments that were affected.

## Allows configuring the update cadence

Some updates you'll want as soon as they are available: e.g., a fix for a critical security vulnerability. Other updates, you may want on a less frequent schedule: e.g., you might only pull in non-critical updates to the app libraries or web frameworks you depend on once per month. Some updates, you may want to pull in only when they are "stable": e.g., for some tools, you may wish to skip the `.0` release and wait until the major issues have been flushed out in a `.3` or `.4` release. Your auto-update system should allow you to configure the update cadence for each type of dependency and each type of update.

## Supports auto merge

For some dependencies, you may want to automatically merge the update pull request as soon as tests pass, without any human having to be involved at all. This is especially useful for minor and patch releases (but not major releases) of reasonably stable dependencies.

## Scans for security and license issues

Your auto update solution should automatically check that none of your dependencies have known security vulnerabilities, and if they do, update your code automatically to fix them. Similarly, it should flag any license issues in your dependencies: e.g., if you accidentally pulled in an open source license that is not allowed at your company.



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"9e7dfaaa99b9a027ed3e3f05ffad33e0"}
##DOCS-SOURCER-END -->
