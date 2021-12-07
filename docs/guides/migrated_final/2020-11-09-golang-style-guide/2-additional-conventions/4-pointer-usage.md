## Pointer usage

Prefer using value type over pointers, unless necessary. Generally speaking, there are only a few cases where pointer
usage would be justified:

1.  You have very large structs containing lots of data. Instead of copying these around, passing pointers may be more
    efficient.

2.  You need to mutate a variable you passed to a function. Generally speaking, you should avoid this anyway (see the
    section on immutability below), but sometimes it is necessary (think "rename" methods, etc).

3.  You need to return `nil` as the default zero value (the default zero value for pointers is `nil`, as opposed to other data
    types that have non-nil default zero values).



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"3d598f08a2a2a719262f6c5005d9ee27"}
##DOCS-SOURCER-END -->
