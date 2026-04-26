# React vs Vanilla JS

Now that we know what React and Single Page Applications are, let's compare React with Vanilla JS. Vanilla just means JavaScript without any additional libraries or frameworks.

Learning JavaScript is a must if you want to become a web developer. In order to start learning React, you should know the fundamentals of JavaScript and how to manipulate the DOM. Obviously you should know about functions, loops, arrays, objects, and so on. In addition to that, you should know the popular more modern features of JavaScript like arrow functions, destructuring, and the spread operator. In fact in the section, we'll be going over all these features before we even touch React. Of course you can skip that stuff if you already know it front to back.

I want to give you a quick example of a simple project done in both vanilla JavaScript and React and show you how much cleaner the React version is, but first let's look at some of the advantages React has over JS:

#### Component-Based Architecture

We already talked about this but in reference to vanilla JS, this gives us a way to break up the UI into reusable, scalable pieces. So right off the bat, React is more organized and easier to manage. With vanilla JS, you're often repeating markup and logic and reusability typically requires copying code or creating DOM templates manually.


#### State Management

We can manage our components state with hooks like `useState`. We'll get into hooks soon. When the state changes, the UI re-renders automatically. With vanilla JS, we have to manually select elements and update the DOM and track where and when to re-render if something changes. So with React, we can focus on logic and with vanilla, we focus on DOM manipulation.

#### Declarative Syntax

React code is shorter and more expressive. You describe what you want, not how to do it. Vanilla JS is much more low-level and you need to manage everything.

#### Reactivity / UI Sync

The reason this library is called "React" is because of it's reactivity. You change something, a piece of state, and anything that depends on that piece of state will react and re-render. Again, with vanilla JS, you need to do this manually. With React, it just works.

#### Ecosystem & Tooling

React has tons of dev tools like routers, state management libraries and many different packages that you can basically just plug in. With Vanilla JS, you often have to build everything from scratch or glue tools together yourself.


## Project Comparison

I want to take a look at a simple project and show you how it would be built with Vanilla JS and React. We won't build the project out but we'll look at the code and compare the two. We'll see how much easier it is to build with React.

This is a multi-step form. You enter your name, click next, email, click next, and then it shows your details. It's a simple form but it's a good example to show the differences between Vanilla JS and React.

### Vanilla JS

Here is the html for the vanilla JS version:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Multi-Step Form (Vanilla JS)</title>
    <style>
      .hidden {
        display: none;
      }
    </style>
  </head>
  <body>
    <div id="step1" class="step">
      <h2>Step 1: Enter Your Name</h2>
      <input type="text" id="name" placeholder="Enter name" />
      <button id="next1">Next</button>
    </div>

    <div id="step2" class="step hidden">
      <h2>Step 2: Enter Your Email</h2>
      <input type="email" id="email" placeholder="Enter email" />
      <button id="prev2">Back</button>
      <button id="next2">Next</button>
    </div>

    <div id="step3" class="step hidden">
      <h2>Review Your Details</h2>
      <p>Name: <span id="reviewName"></span></p>
      <p>Email: <span id="reviewEmail"></span></p>
      <button id="prev3">Back</button>
      <button id="submit">Submit</button>
    </div>

    <script src="script.js"></script>
  </body>
</html>

```

Here is the JavaScript for the vanilla JS version:

```javascript
// State object to store form data
const formData = {
  name: '',
  email: '',
};

// Selecting elements
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

const reviewName = document.getElementById('reviewName');
const reviewEmail = document.getElementById('reviewEmail');

const next1 = document.getElementById('next1');
const prev2 = document.getElementById('prev2');
const next2 = document.getElementById('next2');
const prev3 = document.getElementById('prev3');
const submit = document.getElementById('submit');

// Function to show/hide steps
function showStep(stepToShow) {
  step1.classList.add('hidden');
  step2.classList.add('hidden');
  step3.classList.add('hidden');

  if (stepToShow === 1) step1.classList.remove('hidden');
  if (stepToShow === 2) step2.classList.remove('hidden');
  if (stepToShow === 3) step3.classList.remove('hidden');
}

// Event Listeners
next1.addEventListener('click', () => {
  console.log(123);
  formData.name = nameInput.value.trim();
  if (!formData.name) {
    alert('Please enter your name.');
    return;
  }
  showStep(2);
});

prev2.addEventListener('click', () => showStep(1));

next2.addEventListener('click', () => {
  formData.email = emailInput.value.trim();
  if (!formData.email) {
    alert('Please enter your email.');
    return;
  }
  reviewName.textContent = formData.name;
  reviewEmail.textContent = formData.email;
  showStep(3);
});

prev3.addEventListener('click', () => showStep(2));

submit.addEventListener('click', () => {
  alert(`Submitted!\nName: ${formData.name}\nEmail: ${formData.email}`);
});

// Initialize the first step
showStep(1);
```

As you can see, we need to manually select everything in the DOM and write a lot of code to keep the DOM in sync with our data. We use event listeners because it's not good practice to use inline event handlers in HTML. We have to manually show and hide the steps and update the DOM with the form data. With vanilla JS, you have to account for literally everything. React abstracts a lot of this away and makes it easier to build and manage your UI. With that said, I think you should know how to build things like this with vanilla JS before you start using React. It's important to understand what's going on under the hood.

### React

Let's look at the React version of the same project:

```jsx
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>React Multi-Step Form</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- React & ReactDOM from CDN -->
    <script
      src="https://unpkg.com/react@18/umd/react.development.js"
      crossorigin
    ></script>
    <script
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
      crossorigin
    ></script>
    <!-- Babel to compile JSX in the browser -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <!-- Your React code -->
    <script type="text/babel">
      const { useState } = React;

      function MultiStepForm() {
        const [step, setStep] = useState(1);
        const [formData, setFormData] = useState({ name: '', email: '' });

        const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        return (
          <div>
            {step === 1 && (
              <>
                <h2>Step 1: Enter Your Name</h2>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Enter name'
                />
                <button onClick={() => setStep(2)}>Next</button>
              </>
            )}

            {step === 2 && (
              <>
                <h2>Step 2: Enter Your Email</h2>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter email'
                />
                <button onClick={() => setStep(1)}>Back</button>
                <button onClick={() => setStep(3)}>Next</button>
              </>
            )}

            {step === 3 && (
              <>
                <h2>Review Your Details</h2>
                <p>Name: {formData.name}</p>
                <p>Email: {formData.email}</p>
                <button onClick={() => setStep(2)}>Back</button>
                <button
                  onClick={() =>
                    alert(`Submitted: ${JSON.stringify(formData)}`)
                  }
                >
                  Submit
                </button>
              </>
            )}
          </div>
        );
      }

      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<MultiStepForm />);
    </script>
  </body>
</html>

```

As you can see, the React version is much cleaner and easier to read. We don't have to manually select elements in the DOM or write a lot of code to keep the DOM in sync with our data. We use state and the useState hook to manage our form data and the step. Hooks are a feature in React that allow you to use state and other React features without writing a class. In the past, you would have to write a class component to use state in React. Now with hooks, you can use state in functional components. This whole thing is a single React component and it is completely self-contained andr re-usable. Picture a much larger app with many steps and more data. The vanilla version would become an absolute nightmare to manage. The React version would just separate out the steps into their own components and pass the data down as props. It's much easier to manage and keep organized.

What's being returned from this component is JSX. JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML in React. It's not required but it's recommended because it makes your components easier to read and write. JSX gets transpiled to JavaScript before it gets sent to the browser. This is what allows you to write HTML in your JavaScript files. You can almost think of JSX as what HTML would be if it were a programming language and not a markup language.

I know with a lot of you not knowing React, this may look confusing. But don't worry, we'll be going over all of this in detail and you'll be building projects much bigger than this in no time.
