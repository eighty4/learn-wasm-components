use wasmtime::{Config, Engine, Store};
use wasmtime::component::{Component, Linker};

wasmtime::component::bindgen!({
    path: "../../wit",
});

struct RuntimeState;

fn main() -> wasmtime::Result<()> {
    let mut config = Config::new();
    config.wasm_component_model(true);
    let engine = Engine::new(&config)?;
    let component = Component::from_file(&engine, "../../guest/golang/build/is_odd_or_even.component.wasm")?;

    let mut linker = Linker::new(&engine);

    let mut store = Store::new(&engine, RuntimeState {});

    let (bindings, instance) = Lib::instantiate(&mut store, &component, &linker)?;

    if bindings.call_is_odd_or_even(&mut store, 26)? {
        println!("26 is even")
    } else {
        println!("26 is odd")
    }

    Ok(())
}
