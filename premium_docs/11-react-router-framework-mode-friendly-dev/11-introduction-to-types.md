# Introduction to Types

I know some of you are not familiar with TypeScript, so throughout the course, I will be explaining certain concepts and features of TypeScript. 

## What Is TypeScript?

TypeScript is a superset of JavaScript that offers optional static typing, type inference, and modern features to help catch errors at compile time and improve code readability. 

## Should You Use TypeScript?

When it comes to the question "should you use TypeScript?", it can be a bit controversial because some people swear by it and use it with every project and some people think it's not worth the extra work. My opinion, like with most of this stuff is project specific. You do write more code with TypeScript, so I think if it's a small project, you can do without it, but for larger projects, it can really help you prevent errors and bugs because you’re defining the shape of your data and making your intent clear. 

TypeScript acts like a second set of eyes on your code — it can warn you when you're passing the wrong type to a function, or when you misspell a property name. This becomes way more valuable as your project grows and more people work on it. It’s especially useful in team environments or when working with APIs, because it gives you instant feedback and better tooling like autocompletion and inline docs.

So while TypeScript isn’t required to build great apps, it can give you a lot more confidence in your code — especially at scale. Also, it's becoming the standard. As you saw, when we selected "React Router" using Vite, it used TypeScript automatically. This is happening more and more so at the very least, you should just use the .ts and .tsx extension and then use TypeScript where you see fit.

## What is a Type?

A type is a label that describes what kind of value something is — like a contract that says, “this variable should only hold this kind of data.”In JavaScript, we have a few different native or primitive data types, such as `string`, `number`, `boolean`, etc. However, you can also create your own types. 

In TypeScipt, we can assign types to different things. In the following example, we set the type of "string" for a regular variable. Some other things types can be added to are function arguments, what a function returns, arrays, objects, classes and tuples.

```ts
let isLoggedIn: boolean = true;
```

In the example above, we are telling TypeScript that the variable `isLoggedin` should always be a boolean. This will help us catch errors early on in the development process.

## Type Inference

Type inference means that TypeScript automatically figures out the type of a variable or expression based on how you use it — you don’t always have to write the type yourself.

For instance, if we did the following while using TypeScript in a .ts or .tsx file:

```ts
let name = "Brad";
```
TypeScript will infer that name is a string. So if you later try:

```ts
name = 42
 ```

You’ll get an error, because TypeScript knows name should stay a string.

This is one of the big reasons to use TypeScript — even if you’re not writing explicit types everywhere, you still get safety and helpful feedback just by using the .ts file extension.

So overall, types in TypeScript help us catch errors early on and make our code more predictable and maintainable.


## Custom Types

We can also define our own types in TypeScript. This is useful when we have an object that has a specific shape. For instance, if we have an object that looks like this:

```ts
type User = {
  name: string;
  email: string;
  age?: number; // optional
};
```

This is an example of a custom type called `User`. It has three properties: `name`, `email`, and `age`. The `age` property is optional, meaning it doesn't have to be present in the object.

Then we can create an object of type `User` like this:

```ts
const user: User = {
  name: 'Jane',
  email: 'jane@example.com',
};
```

If we try to add a property that is not defined in the `User` type, TypeScript will throw an error.

```ts
const user: User = {
  name: 'Jane',
  email: 'jane@example.com',
  city: 'New York', // Error: Property 'city' does not exist on type 'User'.
};
```

## Using Types in Functions

We can also use types in functions. For instance, we can define a function that takes a `User` object as an argument:

```ts
function sendEmail(user: User) {
  console.log(`Sending email to ${user.name} at ${user.email}`);
}
```

This way, we are telling TypeScript that the `sendEmail` function should always take an object of type `User` as an argument.

We can also define the return type of a function. For instance, if we have a function that adds two numbers:

```ts
'function add(a: number, b: number): number {
  return a + b;
}
```

Here we are telling TypeScript that the `add` function should always return a number.

## Arrays

If you have an array and it should be all strings, you can do the following:

```ts
const tags:string[] = ['web dev', 'developer', 'programming'];
```

Another way you can do the same thing is the following:

```ts
const tags: Array<string> = ['web dev', 'developer', 'programming'];
```

## Object Destructuring

If you are destructuring, you can do the following:

```ts
function printUser({ name, age }: { name: string; age: number }) {
  console.log(`${name} is ${age}`);
}
```

## `any` Type

In TypeScript, there’s a special type called `any`, which disables type checking. While it might seem flexible, it defeats the purpose of using TypeScript in the first place.

Here’s an example using any:

```ts
function identity(value: any) {
  return value;
}
```

This works, but TypeScript won’t catch any type-related errors:

```ts
const result = identity("hello");
result.toFixed(); // ❌ No error, but this will crash at runtime
```

## Generics

A generic is like a placeholder for a type.

It lets you write a function or component that works with any type, while still keeping type safety.


We can improve the example above with a generic:

```ts
function identity<T>(value: T): T {
  return value;
}
```

The `T` is a placeholder for the type.

Now, we can do the following:

```ts
const result1 = identity<string>("hello");
result1.toUpperCase(); // ✅ Works

const result2 = identity<number>(123);
result2.toFixed(); // ✅ Works

const result3 = identity<boolean>(true);
result3.toUpperCase(); // ❌ Error: Property 'toUpperCase' does not exist on type 'boolean'
```

