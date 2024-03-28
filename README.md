# learn-wasm-components

## Goal

Create a WASM component function in any language that can be invoked from a host runtime.
This example creates a Golang and Rust component to implement [is-odd-or-even.wit](./wit/is-odd-or-even.wit).
The components are hosted by the [runtime/rust](./runtime/rust) crate.

## Install dependencies

Bytecode Alliance's wasm-tools and wit-bindgen are required to build a WASM component with TinyGo's.

```shell
cargo install wasm-tools
cargo install wit-bindgen-cli

brew tap tinygo-org/tools
brew install tinygo
```

## Build steps

The component/golang and component/rust directories have a README.md files with instructions for building the WASM
component.

[runtime/rust](./runtime/rust) can be run with cargo run with a `COMPONENT_LANGUAGE` env var specifying `golang`
or `rust`. `is-odd-or-even` will be called with the arg to the program.

```shell
COMPONENT_LANGUAGE=golang cargo run -- 42
```

## Inspecting components

```shell
wasm-tools validate is-odd-or-even.wasm --features component-model
```

```shell
wasm-tools component wit is-odd-or-even.wasm
```

## Current state

|         | golang | rust    |
|---------|--------|---------|
| debug   | 107214 | 1750360 |
| release | 107214 | 1640355 |

Rust component is 16.3x larger than Golang component.

`wasm-tools component wit` output for each language's component varies and includes a lot of WASI imports that unused
by the implementation.

### golang component WIT

```wit
package root:component;

world root {
  import wasi:io/error@0.2.0;
  import wasi:io/streams@0.2.0;
  import wasi:cli/stdin@0.2.0;
  import wasi:cli/stdout@0.2.0;
  import wasi:cli/stderr@0.2.0;
  import wasi:clocks/wall-clock@0.2.0;
  import wasi:filesystem/types@0.2.0;
  import wasi:filesystem/preopens@0.2.0;

  export is-odd-or-even: func(number: s32) -> bool;
}
```

### Rust component WIT

```wit
package root:component;

world root {
  import wasi:cli/environment@0.2.0;
  import wasi:cli/exit@0.2.0;
  import wasi:io/error@0.2.0;
  import wasi:io/streams@0.2.0;
  import wasi:cli/stdin@0.2.0;
  import wasi:cli/stdout@0.2.0;
  import wasi:cli/stderr@0.2.0;
  import wasi:clocks/wall-clock@0.2.0;
  import wasi:filesystem/types@0.2.0;
  import wasi:filesystem/preopens@0.2.0;

  export is-odd-or-even: func(number: s32) -> bool;
}
```
