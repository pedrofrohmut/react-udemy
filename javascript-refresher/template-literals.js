const name = "John"
const age = 30

const gretting = "Hello, my name is " + name + " and I am " + age + " years old."

const grettingTemplate = `Hello, my name is ${name} and I am ${age} years old.`

console.log(gretting)
console.log(grettingTemplate)

// #############################################################################

const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    //return date.toLocaleDateString() + " at " + date.toLocaleTimeString()
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`
}

const note = {
    title: "Discuss project",
    timestamp: Date.now()
}

console.log(`Last edited ${formatDate(note.timestamp)}`)
