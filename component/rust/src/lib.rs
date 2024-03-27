use wit_bindgen::generate;

generate!({
    path: "../../wit/is-odd-or-even.wit",
    world: "lib",
});

struct IsOddOrEvenLib;

impl Guest for IsOddOrEvenLib {
    fn is_odd_or_even(number: i32) -> bool {
        number % 2 == 0
    }
}

export!(IsOddOrEvenLib);
