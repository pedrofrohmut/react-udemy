# MongoDB Atlas Setup

We will be using MongoDB for a database. MongoDB is a NoSQL database that stores data in JSON-like documents. It is a great choice for our MERN stack application because it is easy to use and scales well.

You can use MongoDB locally, but these days, it is more common to use a cloud-based solution. MongoDB Atlas is a cloud database service that allows you to create and manage your MongoDB databases in the cloud. It has a generous free tier for testing and development, so you can get started without any cost. If you do run a production project, then you will need to scale up to a paid plan.

## Create an Account

Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create an account. You can sign up with your email address or use a Google account.

#### Create a Project

Once you have created an account, you will be taken to the MongoDB Atlas dashboard. From there, create a new project. You can name it whatever you like, but for this tutorial, we will call it `ideadrop`.

#### Create a Cluster

Once you have a project, you will need to create a cluster. A cluster is a group of servers that work together to provide high availability and scalability. Click on "Create".

Select the "Free" tier option. This will allow you to create a free cluster that you can use for development and testing.

You can give it a name. The default is "Cluster0". You can leave the rest of the options as default. Click "Create Deployment".

#### Create a Database User

Now you will add a username and password for your database. Click "Create Database User".

Now select "Choose a connection method".

This is where we get the connection string for our database. Select "Drivers" and copy the connection string. It should look something like this:

```bash
mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

Open your `.env` file and add the following line:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

Replace `<username>` and `<password>` with the username and password you created earlier. Replace `<dbname>` with the name of your database. You can name it whatever you like, but for this tutorial, we will call it `ideadrop-db`.

#### Create a Database

We have a cluster and a database called `test` by default, but I want to create a new database in my cluster. To do this, go to the "Database->Clusters" tab in the left sidebar and click on "Browse Collections".

From here, click on "Create Database". I will name my database `ideadrop-db` and the collection `ideas`. You do not have to create collections from here. You can create them from your code. But You can do it from here as well.

Now, make sure in your `.env` file, you have the following line:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ideadrop-db?retryWrites=true&w=majority
```

In the next lesson, we will connect to our MongoDB database using Mongoose.
