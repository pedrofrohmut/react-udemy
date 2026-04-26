# Connect with Mongoose

Now that we have our MongoDB database set up, we need to connect to it using Mongoose. Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides a schema-based solution to model your application data. We will get to models soon, but first, we need to set up the connection.

Create a new file at `config/db.js` and add the following code:

```javascript
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
```

We are getting our MongoDB URI from the `.env` file. Make sure you have the following line in your `.env` file and it is correct. Then we create a function to connect to the database. We use `mongoose.connect()` to connect to the database and log a message to the console if the connection is successful. If there is an error, we log the error message and exit the process with a failure code.

Now we need to import this function into our `server.js` file and call it. Add the following code to the top of your `server.js` file:

```javascript
import connectDB from './config/db.js';
```

Then call the function right after you set up your middleware:

```javascript
// Connect to MongoDB
connectDB();
```

If it does not connect, be sure to check the message in the console. It is most likety a problem with your MongoDB URI.
