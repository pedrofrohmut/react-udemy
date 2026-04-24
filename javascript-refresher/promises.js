const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("Promise resolved")
        reject("Promise rejected")
    }, 1000)
})

myPromise
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })

// #############################################################################

// Dot then syntax
fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => response.json())
    .then(post => console.log(post))
    .catch(err => console.log(err))

// #############################################################################

// Async/Await syntax but with the same result then the above
const fetchPost = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1")
        const post = await response.json()
        console.log(post)
    } catch (err) {
        console.log(err)
    }
}

fetchPost()
