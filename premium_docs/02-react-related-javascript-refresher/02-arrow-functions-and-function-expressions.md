# Arrow Functions and Function Expressions

Arrow functions are very common in React. They are a more concise way to write functions and are used to define functional components, event handlers, and other functions that are passed as props.

Let's look at a simple example. We will start with a regular function declaration:

```javascript
function getRectangleArea(width, height) {
  return width * height;
}
```

Let's write it as an arrow function:


```javascript
const getRectangleArea = (width, height) => {
  return width * height;
};
```

Since the function body is a single expression, you can omit the curly braces and the `return` keyword:

```javascript
const getRectangleArea = (width, height) => width * height;
```

Here is another example:

```javascript
const sayHello = () => console.log('Hello!');
```

You can also use arrow functions as callbacks:

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
```

If you are not familiar with the `map` method, it is used to create a new array by calling a function on each element of the original array. In this case, we are doubling each number in the array. I'll do a lesson on array methods in a little bit.

Arrow functions can not be accessed befor initialization either.

Let's add the following:

```javascript
regular();
arrow();

function regular() {
	console.log('Regular');
}

const arrow = () => console.log('arrow');
```
 Run the code and you will see "Regular" printed fine but you will get an error for the arrow function, because we are trying to access it before it was initialized.

## `this` Keyword Differences


With normal functions, the `this` variable is created which references the objects that call them. Arrow functions do not create their own `this` binding.

Let's look at this example:


```javascript
const person = {
  name: 'Brad',
  sayHelloRegular: function () {
    console.log('Regular:', this.name);
  },
  sayHelloArrow: () => {
    console.log('Arrow:', this.name);
  },
};

````

The regular function points to the `person` object. The arrow function will give you undefined.

Let's just log `this`:


```javascript
const person = {
  name: 'Brad',
  sayHelloRegular: function () {
    // console.log('Regular:', this.name);
    console.log(this);
  },
  sayHelloArrow: () => {
    // console.log('Arrow:', this.name);
    console.log(this);
  },
};

````

Run the code and you get the person object for the regular function and either an empty object (Node.js) or the `window` object (Browser). This is because the arrow function does not automatically create a `this` variable. As a result, any reference to this would point to what this was before the function was created. In Node with ES Modules, it's an empty object, in the browser, it's the `window` object.