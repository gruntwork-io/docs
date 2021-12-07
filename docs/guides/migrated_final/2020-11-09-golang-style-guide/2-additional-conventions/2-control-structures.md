## Control structures

When possible, avoid nesting `if`/`else` statements. (Of course, a single, non-nested `if`/`else` is perfectly fine.)
Prefer multiple `return` statements over nested code. This makes the code more readable and avoids complexity.

E.g:

```go
// Do this
if something {
        doThis()
        return this
}
if orOther {
        return that
}
return theOther
```

```go
// Don't do this
if something {
        doThis()
} else {
        if orOther {
                return that
        }
}
```



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"2cf45bf102b79290d38cbc28876cbe40"}
##DOCS-SOURCER-END -->
