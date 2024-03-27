// my-component.go
package main

import (
	"github.com/eighty4/learn-wasm-components/component/golang/lib"
)

func init() {
	a := LibraryImpl{}
	lib.SetLib(a)
}

type LibraryImpl struct {
}

func (e LibraryImpl) IsOddOrEven(number int32) bool {
	return number%2 == 0
}

//go:generate wit-bindgen tiny-go ../../wit --out-dir=lib
func main() {}
