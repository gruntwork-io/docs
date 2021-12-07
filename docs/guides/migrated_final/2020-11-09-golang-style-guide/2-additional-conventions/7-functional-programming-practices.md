## Functional programming practices

### Immutability

Prefer returning a new value rather than mutating an existing one.

```go
// Don't do this
var result int = 0

func main() {
    add(1, 1, &result)
    fmt.Println(result)
}

func add(a, b int, result *int) {
    *result = a + b
}
```

```go
// Do this instead
func main() {
    fmt.Println(add(1, 1))
}

func add(a, b int) int {
    return a + b
}
```

### Pure functions

Prefer functions that take all their inputs as function parameters, instead of reading those inputs via side effects
(e.g., reading from disk or the network or global vars), and whose entire behavior is to return values
(note: errors are values too!), rather than performing side effects (e.g. by writing to disk or the network or global
vars). Of course, you can’t avoid side effects forever if you want your code to do something useful, but try to do as
much of your logic with pure functions as you can, try to pass everything around as explicit parameters and return
everything as explicit values, and centralize the side effecting code to a few isolated places.

### Composition

Build your code out of small, reusable, named functions, that you compose together.

```go
// Don't do this
func main() {
    fmt.Println(mulOfSums(1, 1))
}

func mulOfSums(a, b int) int {
    return (a + b) * (a + b)
}
```

```go
// Do this instead
func main() {
    fmt.Println(mul(add(1, 1), add(1, 1)))
}

func add(a, b int) int {
    return a + b
}

func mul(a, b int) int {
    return a * b
}
```



<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Service Catalog Reference","hash":"f39d7672cbdf71aca7628dba2f7246c7"}
##DOCS-SOURCER-END -->
