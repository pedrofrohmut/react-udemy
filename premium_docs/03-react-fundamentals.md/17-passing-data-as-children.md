# Passing Data As Children

We saw how to pass props to a component as an attribute, but we can also pass a special prop called `children` that allows us to pass data within the component tags.

Let's look at an example by creating a `Button` component.

```jsx
const Button = ({ children }) => {
  return <button>{children}</button>;
};

export default Button;
```

Now import it into the `Rating` component and use it like this:

```jsx
import Button from './Button';
```

And replace the button element with the `Button` component:

```jsx
<Button>Submit</Button>
```

Now of course, this is no longer going to work because the click handler is gone. So is the className and the disabled attribute. We can add those as props for the button component:

```jsx
const Button = ({ children, onClick, className, disabled = false }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};
```

Now add them to the `Button` component in the `Rating` component:

```jsx
<Button className='submit-btn' onClick={handleSubmit} disabled={rating === 0}>
  Submit
</Button>
```

We can also use this component in the Modal component to create a close button:

```jsx
import Button from './Button';

const Modal = ({ isOpen, onClose, rating }) => {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <h2>Thank You!</h2>
        <p>
          You rated us {rating} star{rating > 1 ? 's' : ''}!
        </p>
        <Button className='close-btn' onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default Modal;
```

Now we have a reusable `Button` component that can be used in multiple places.
