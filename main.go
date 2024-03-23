package main

import (
	"github.com/bytecodealliance/wasmtime-go"
	"log"
)

func main() {
	engine := wasmtime.NewEngine()
	store := wasmtime.NewStore(engine)
	module, err := wasmtime.NewModuleFromFile(engine, "./golang/is_odd_or_even.component.wasm")
	if err != nil {
		log.Fatalln("new module", err)
	}
	instance, err := wasmtime.NewInstance(store, module, nil)
	if err != nil {
		log.Fatalln("new instance", err)
	}
	isOddOrEven := instance.GetFunc(store, "is-odd-or-even")
	if isOddOrEven == nil {
		log.Fatalln("did not find is-odd-or-even")
	}
	result, err := isOddOrEven.Call(store, 2)
	if err != nil {
		log.Fatalln("call", err)
	}
	log.Println(result)
}
