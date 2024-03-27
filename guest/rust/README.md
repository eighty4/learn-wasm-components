```shell
rustup target add wasm32-wasi
cargo build --target wasm32-wasi
curl -Ls https://github.com/bytecodealliance/wasmtime/releases/download/v19.0.0/wasi_snapshot_preview1.reactor.wasm -o wasi_snapshot_preview1.reactor.wasm
wasm-tools component new ./target/wasm32-wasi/debug/rust.wasm \
    -o is-odd-or-even.wasm --adapt ./wasi_snapshot_preview1.reactor.wasm
```
