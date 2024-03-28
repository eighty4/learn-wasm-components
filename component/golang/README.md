```shell
go generate
mkdir build
tinygo build -target=wasi -o build/is_odd_or_even.wasm is_odd_or_even.go
wasm-tools component embed --world lib ../../wit build/is_odd_or_even.wasm -o build/is_odd_or_even.embed.wasm
curl -Ls https://github.com/bytecodealliance/wasmtime/releases/download/v17.0.0/wasi_snapshot_preview1.reactor.wasm -o build/wasi_snapshot_preview1.reactor.wasm
wasm-tools component new build/is_odd_or_even.embed.wasm --adapt build/wasi_snapshot_preview1.reactor.wasm -o build/is_odd_or_even.component.wasm
```
