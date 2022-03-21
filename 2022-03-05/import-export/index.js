import controller from './controllers/controller.js'
import { add, deduct, multiply, divide } from './methods/calculator.js'

function randomSkaicius(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let pirmas = randomSkaicius(1, 500)
let antras = randomSkaicius(1, 500)

console.log('Pirmas skaicius: ', pirmas, 'Antras skaicius', antras)

console.log('Sudetis:', add(pirmas, antras))
console.log('Atimtis:', deduct(pirmas, antras))
console.log('Daugyba:', multiply(pirmas, antras))
console.log('Dalyba:', divide(pirmas, antras))

// Index.js faile sugeneruokite du atsitiktinius skaičius nuo 1 iki 500.
// Direktorijoje "methods" sukurkite modulį pavadinimu "calculator" ir jame aprašykite keturias funkcijas priimančias du parametrus.
//     add(a, b) - Grąžinamas rezultatas turi būti dviejų gautų parametrų suma.
//         deduct(a, b) - Grąžinamas rezultatas, skaičius kurį gaunate atėmus antrajį skaičių iš pirmojo.
//             multiply(a, b) - Grąžinamas rezultatas, padauginus pirmajį skaičių iš antrojo
// divide(a, b) - Grąžinamas rezultatas, padalinus pirmajį skaičių iš antrojo.
// Importuokite modulį į index.js failą ir pasinaudokite savo aprašytomis funkcijos.Rezultatus atspausdinkite terminale.