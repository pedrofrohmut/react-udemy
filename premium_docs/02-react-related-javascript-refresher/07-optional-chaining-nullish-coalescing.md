# Optional Chaining & Nullish Coalescing Operator

## Optional Chaining

Optional chaining (`?.`) is a modern operator in JavaScript that allows you to safely access nested properties of an object without having to explicitly check if each property exists. It short-circuits the evaluation if a property is `null` or `undefined` and returns `undefined` instead of throwing an error.

Let's look at an example without optional chaining:

```javascript
const user = {
  name: 'John',
  // address is missing
};

// This will throw: "TypeError: Cannot read properties of undefined (reading 'city')"
console.log(user.address.city);
```

There may be times when we try and access a nested property of an object, but the property itself is missing. In such cases, we can use optional chaining to safely access the nested property:

```javascript
const user = {
  name: 'John',
  // address is missing
};

// This will not throw an error and will log "undefined"
console.log(user.address?.city);
```

The optional chaining operator (`?.`) can be used to safely access nested properties, methods, or elements of an object or array. It will simply be `undefined` if the property is missing.

## Nullish Coalescing Operator

The nullish coalescing operator (`??`) is a modern operator in JavaScript that provides a way to handle default values for `null` or `undefined` values. It's similar to the logical OR (`||`) operator, but it only returns the right-hand side operand if the left-hand side operand is `null` or `undefined`. It doesn't return the right-hand side operand for falsy values like `0`, `''`, `false`, or `NaN`.

Let's look at an example:

```javascript
let value = null;
let result = value ?? 'Default Value';

console.log(result); // "Default Value"
```

In the above example, the `result` will be `"Default Value"` because the left-hand side operand `value` is `null`. If the left-hand side operand is not `null` or `undefined`, the nullish coalescing operator will return the left-hand side operand.

```javascript
let value = 0;
let result = value ?? 'Default Value';

console.log(result); // 0
```

In this example, the `result` will be `0` because the left-hand side operand `value` is `0`, which is a falsy value. The nullish coalescing operator only returns the right-hand side operand if the left-hand side operand is `null` or `undefined`, not just falsy.

## Using Optional Chaining & Nullish Coalescing Together

Optional chaining can be used in combination with other operators like the nullish coalescing operator (`??`) to provide default values for missing properties.

```javascript
const user = {
  name: 'John',
  // address is missing
};

// This will log "Unknown" as the default
console.log(user.address?.city ?? 'Unknown');
```
