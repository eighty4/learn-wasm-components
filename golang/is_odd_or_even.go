// my-component.go
package main

import (
	"github.com/eighty4/learn-wasm-components/golang/library"
)

func init() {
	a := LibraryImpl{}
	library.SetLibrary(a)
}

type LibraryImpl struct {
}

func (e LibraryImpl) IsOddOrEven(number int32) bool {
	return true
}

//go:generate wit-bindgen tiny-go ../wit --out-dir=library
func main() {}
