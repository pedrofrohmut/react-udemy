function getRectangleArea(width, height) {
    return width * height
}

const getRectangleArea2 = (width, height) => width * height

console.log(getRectangleArea(10, 5))
console.log(getRectangleArea2(10, 5))

// #############################################################################

const numbers = [1, 2, 3, 4, 5, 6]

const double = numbers.map(function(x) {
    return x * 2
})
const double2 = numbers.map(x => x * 2)

console.log(double)
console.log(double2)

// #############################################################################

// When functions are declared using the const variables they must always be
// defined before they are called

const regular = function() {
    console.log("Regular")
}
const arrow = () => console.log("Arrow")

regular()
arrow()

// #############################################################################

// In regular functions this will reference the object the function is in. Like a object method
// In arrow functions this will be an empty object just a function without any relations (lightweigth)

const person = {
    name: "John",
    sayHelloRegular: function () {
        console.log("Regular: Hello, " + this.name)
    },
    sayHelloArrow: () => console.log("Arrow: Hello, " + this.name),
    checkThisRegular: function() {
        console.log(this)
    },
    checkThisArrow: () => console.log(this)
}

person.sayHelloRegular()
person.sayHelloArrow()
person.checkThisRegular()
person.checkThisArrow()
