use wasmtime::{Config, Engine, Store};
use wasmtime::component::{Component, Linker};
use wasmtime_wasi::{WasiCtxBuilder, WasiP1Ctx};

wasmtime::component::bindgen!({
    path: "../../wit",
});

fn main() -> wasmtime::Result<()> {
    let input: i32 = std::env::args().last().unwrap().parse()?;

    let mut config = Config::new();
    config.wasm_component_model(true);
    let engine = Engine::new(&config)?;
    let component = Component::from_file(&engine, "../../guest/golang/build/is_odd_or_even.component.wasm")?;

    let mut linker: Linker<WasiP1Ctx> = Linker::new(&engine);
    wasmtime_wasi::command::sync::add_to_linker(&mut linker)?;
    let wasi = WasiCtxBuilder::new().build_p1();
    let mut store = Store::new(&engine, wasi);

    let (bindings, _) = Lib::instantiate(&mut store, &component, &linker)?;

    if bindings.call_is_odd_or_even(&mut store, input)? {
        println!("{} is even", input)
    } else {
        println!("{} is odd", input)
    }

    Ok(())
}
