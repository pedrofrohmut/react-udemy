const user = {
    name: "Brad"
}

console.log("User city: " + user.address?.city)

let value = "Hello"
let result = value ?? "Default value"

console.log(result)

console.log("User city: " + user.address?.city ?? "Unknown")
