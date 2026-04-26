# Modal Component Composition

Now that we have the modal working, let's make it it's own component. This is a good idea because it will make our code more modular and easier to read.

Let's think about what we need to pass in as props.

- It uses the `submitted` state to determine if it should be open or closed, so let's create a prop called `isOpen` and set it equal to `submitted`.
- It needs to close the modal when the close button is clicked, so let's create a prop called `onClose` and set it equal to the `closeModal` function.
- It also shows the rating in the message, so let's pass that in

Create a new file at `src/components/Modal.js` and add the following code:

```jsx
const Modal = ({ isOpen, onClose, rating }) => {
  return (  );
}

export default Modal;
```

be sure to destruct the props in the function signature with the curly braces.

Now let's move the modal content from the `Rating` component to the `Modal` component with a few changes to use the props:

```jsx
const Modal = ({ isOpen, onClose, rating }) => {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <h2>Thank You!</h2>
        <p>
          You rated us {rating} star{rating > 1 ? 's' : ''}!
        </p>
        <button className='close-btn' onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
```

The first thing we do is check if the modal is open. If it's not, we return `null` to prevent the modal from rendering. This is a common pattern in React to conditionally render components.

The only other thing we really need to change is setting the `onClick` event handler to the `onClose` prop.

## Embedding The Modal

Now in the `Rating` component, we can import the `Modal` component and use it like this:

```jsx
import Modal from './Modal';
```

And replace the prior code with the following:

```jsx
{
  /* Modal  */
}
<Modal isOpen={submitted} onClose={closeModal} rating={rating} />;
```

Now try it out. The modal should still work as before, but now it's a separate component. This is a good example of how to break down your components into smaller, more manageable pieces.
