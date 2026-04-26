# User Model

We need a user model and collection in our database to store user information.

We also need to use the `jose` library for generating and signing tokens as well as the `bcryptjs` library to hash passwords before saving them to the database.

Run the following command:

```bash
npm install bcryptjs jose
```

## Create User Model

Create a new file called `User.js` in the `models` directory. This file will contain the user schema and model.

```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
```

This is a pretty straightforward schema. It has three fields: `name`, `email`, and `password`. The `timestamps` option will automatically add `createdAt` and `updatedAt` fields to the schema.

## Hash Passwords

We have a few options for hashing passwords. We could to it in the route or controller, if you are using controllers, but it is better to do it in the model. This way, we can ensure that passwords are always hashed before being saved to the database.

Mongoose has a `pre` middleware function that allows us to run some code before saving a document. We can use this to hash the password before saving it to the database.

We can also use the `post` middleware function to remove the password from the document before sending it back to the client

Let's import the `bcryptjs` library and add the middleware functions to the user schema.

```javascript
import bcrypt from 'bcryptjs';
```

Now, under the schema definition, add the following code:

```javascript
// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
```

We are using the `pre` middleware function. which takes a string as the first argument. This string is the name of the event we want to run the middleware on. In this case, we want to run it before saving the document, so we pass in `save`. It also takes in a function as the second argument. This function will be called before the document is saved to the database.

we first check if the password has been modified. If it has not, we call the `next` function to continue with the save operation. The reason that we check this is because we don't want to hash the password every time the document is saved. If the password has not been modified, we can skip the hashing process and just call `next`.

If it has been modified, we generate a salt using `bcrypt.genSalt` and then hash the password using `bcrypt.hash`. A salt is a random string that is added to the password before hashing it. This makes it more secure, as it prevents two identical passwords from having the same hash.

The `next` function is a callback that we need to call when we are done with the middleware. If we don't call it, the document will not be saved.

## Relate The Idea Model To The User Model

Now we need to relate the idea model to the user model. We can do this by adding a `user` field to the idea schema. This field will store the ID of the user who created the idea.

Open the `Idea.js` file in the `models` directoryans under the `tags` field, add the following code:

```javascript
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
```

We are adding a new field called `user` to the idea schema. This field will store the ID of the user who created the idea. We are using `mongoose.Schema.Types.ObjectId` to define the type of the field. This tells Mongoose that this field will store an ObjectId, which is the type used by MongoDB to store IDs.

In the next lesson, we will work on the user registration API route. This route will allow users to create an account and store their information in the database.
