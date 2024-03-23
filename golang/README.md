```shell
go generate
tinygo build -target=wasi -o is_odd_or_even.wasm is_odd_or_even.go
wasm-tools component embed --world library ../wit is_odd_or_even.wasm -o is_odd_or_even.embed.wasm
curl -Ls https://github.com/bytecodealliance/wasmtime/releases/download/v17.0.0/wasi_snapshot_preview1.command.wasm -o wasi_snapshot_preview1.command.wasm
wasm-tools component new is_odd_or_even.embed.wasm --adapt wasi_snapshot_preview1.command.wasm -o is_odd_or_even.component.wasm
wasm-tools validate is_odd_or_even.component.wasm --features component-model
```
