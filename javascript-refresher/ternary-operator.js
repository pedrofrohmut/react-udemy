const number = 5
let message = ""

if (number % 2 == 0) {
    message = "Even number"
} else {
    message = "Odd number"
}

console.log(message)

// #############################################################################

const isEven = x => x % 2 == 0 ? true : false
const isOdd = x => x % 2 == 1 ? true : false

const isEvenMessage = x => x % 2 == 0 ? `${x} is even` : `${x} is odd`
const isOddMessage = x => x % 2 == 1 ? `${x} is odd` : `${x} is even`

let x = 13
console.log(`Is ${x} even? ` + isEven(x))
console.log(`Is ${x} odd? ` + isOdd(x))
console.log(isEvenMessage(x))
console.log(isOddMessage(x))

// #############################################################################

const note = {
    title: "Meeting notes",
    content: "Discuss product roadmap",
    timestamp: Date.now(),
    isPinned: true
}

const noteText = `
    Title: ${note.title}
    Status: ${note.isPinned ? "Pinned note" : "Regular note"}
    Last edited: ${Date.now().toLocaleString()}
`

console.log(noteText)

// #############################################################################

// Short circuit: if the first codition is true them output the thing to the right side of the && operator
// Works with true, false, truthy and falsy

console.log(2 > 1 && "foo")

console.log(3 < 1 && "bar")

console.log(3 > 1 && "baz")

// #############################################################################

const isLoggedIn = true
const showWelcome = () => isLoggedIn && "Welcome, user"
console.log(showWelcome())
