# learn-wasm-components

## Goal

Create a WASM component function in any language that can be invoked from a host runtime.
This example uses a Golang component and the Golang host runtime wasmtime-go. 

## Install dependencies

Bytecode Alliance's wasm-tools and wit-bindgen are required to build a WASM component with TinyGo's 

```shell
cargo install wasm-tools
cargo install wit-bindgen-cli

brew tap tinygo-org/tools
brew install tinygo
```

## Build steps

The golang directory has a README.md with instructions for building the WASM component.

## Inspecting components

```shell
wasm-tools validate is-odd-or-even.wasm --features component-model
```

```shell
wasm-tools component wit is-odd-or-even.wasm
```
