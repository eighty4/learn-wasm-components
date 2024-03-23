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

## Current state

```shell
2024/03/23 14:00:34 new module failed to parse WebAssembly module

Caused by:
    Invalid input WebAssembly code at offset 4: unknown binary version
```
