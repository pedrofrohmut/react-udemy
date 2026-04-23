const notes = [
    { title: "Meeting Notes", content: "Discuss project roadmap", isPinned: true },
    { title: "Grocery List", content: "Buy milk, eggs and bread", isPinned: false },
    { title: "Workout plan", content: "Push day: Bench, Shoulder press", isPinned: false },
    { title: "Recipe ideas", content: "Pasta, salad and tacos", isPinned: false },
]

const noteTitles = notes.map((x, index) => `${index}. ${x.title}`)
console.log("> Note Titles")
console.log(noteTitles)

const pinnedNotes = notes.filter(x => x.isPinned)
console.log("> Pinned Notes")
console.log(pinnedNotes)

const notPinnedNotes = notes.filter(x => !x.isPinned)
console.log("> Regular Notes")
console.log(notPinnedNotes)

const pinnedNotesTitles = notes
      .filter(x => x.isPinned)
      .map(x => x.title)
console.log("> Pinned Notes Titles")
console.log(pinnedNotesTitles)

const regularNotesTitles = notes
      .filter(x => !x.isPinned)
      .map(x => x.title)
console.log("> Regular Notes Titles")
console.log(regularNotesTitles)

// #############################################################################
const numbers = [1, 2, 3, 4, 5, 6]

// Reduce will assign the return of the function to the accumulator on every iteration
// It takes the callback to execute and the initial value of the accumulator
const sum = numbers.reduce((acc, n) => acc + n, 0)
console.log(`Numbers: [${numbers}]`)
console.log(`The sum of the numbers is: ${sum}`)

// #############################################################################

// String join functionality using array reduce
const lastTitle = notes[notes.length - 1].title
const titleWithCommas = notes.slice(0, -1).reduce((acc, note) => acc + `${note.title}, `, "") + lastTitle
console.log("Titles with commas: " + titleWithCommas)

// Second way to do it
const firstTitle = notes[0].title
const titleWithCommas2 = firstTitle + notes.slice(1).reduce((acc, note) => acc + `, ${note.title}`, "")
console.log("Titles with commas 2: " + titleWithCommas2)
