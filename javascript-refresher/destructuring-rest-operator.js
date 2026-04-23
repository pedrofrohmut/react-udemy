const notes = [
    { title: "Meeting Notes", content: "Discuss project roadmap" },
    { title: "Grocery List", content: "Buy milk, eggs and bread" },
    { title: "Workout plan", content: "Push day: Bench, Shoulder press" },
    { title: "Recipe ideas", content: "Pasta, salad and tacos" },
]

// Destructing an array
// Using destructing operator to get the first and second note and the rest operator
// to get the rest of the notes in the variable otherNotes
const [firstNote, secondNote, ...otherNotes] = notes

console.log(firstNote)
console.log(secondNote.title)

console.log(otherNotes)

// #############################################################################

// Destructing an object
// Using destructing to get the title and content from the note object
// Renames the firstNote.title to firstTitle
const { title: firstTitle, content } = firstNote

console.log(`First note: title = '${firstTitle}', content = '${content}'`)

// #############################################################################

const user = {
    name: "Ben",
    address: {
        city: "Boston",
        state: "MA"
    }
}

// Nesting destructing: You can destruct nested object in an single destruct statement
const { name: userName, address: { city: userCity, state } } = user

console.log(`User: name='${userName}', city='${userCity}, state='${state}'`)
