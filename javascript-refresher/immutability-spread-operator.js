const notes = [ "Meeting Notes", "Grocery List"]
// It modifies the array notes
notes.push("Workout Plan")
console.log(notes)

const notes2 = [ "Meeting Notes", "Grocery List"]
// It does not modify the array, make a new one copying the values
const newNotes = [...notes2, "Workout Plan"] // same as notes2.concat("Workout Plan")
console.log(newNotes)
console.log(notes2)

// #############################################################################

const user = { name: "John Doe", age: 30 }
// That copies the user data (shallow) and overrides the age field
const newUser = { ...user, age: 25 }

console.log(user)
console.log(newUser)
