# JSON Server Setup

I want to use and show you another awesome tool for development. Many times, we need some quick data and creating an API from scratch can be a lot of work. JSON Server allows you to create a mock REST API with any data you want. It is a great tool for development and testing purposes. We are going to use it for our shopping cart products. We can use it to fetch the products and display them in our app.

Install JSON Server as a dev dependency by running the following command in your terminal:

```bash
npm install -D json-server
```

We are installing it as a dev dependency because we are not going to use it in production. This is not even a production app, it is just a demo app. So JSON Server is perfect for this. Later on, if you want to create a real API with Express or something, you can.

## Data File

The way that JSON Server works is it looks at a JSON file and creates an API from that. Not just an API to fetch, but also create, read update and delete. So it is a full REST API. You can use it to test your app and see how it works with real data.

Let's create a new file at `src/data/db.json` and add the following data to it:

```json
{
  "products": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "description": "Noise-cancelling headphones with deep bass and Bluetooth 5.0 support.",
      "price": 59.99,
      "quantity": 25,
      "category": "Audio",
      "rating": 4.5,
      "image": "images/product-1.png"
    },
    {
      "id": 2,
      "name": "Bluetooth Speaker",
      "description": "Portable speaker with crisp sound and 12-hour battery life.",
      "price": 39.99,
      "quantity": 40,
      "category": "Audio",
      "rating": 4.2,
      "image": "images/product-2.png"
    },
    {
      "id": 3,
      "name": "Smartwatch",
      "description": "Track fitness, receive notifications, and monitor your health stats.",
      "price": 99.99,
      "quantity": 15,
      "category": "Wearables",
      "rating": 4.7,
      "image": "images/product-3.png"
    },
    {
      "id": 4,
      "name": "Gaming Mouse",
      "description": "Ergonomic mouse with customizable RGB lighting and 6 DPI levels.",
      "price": 29.99,
      "quantity": 50,
      "category": "Accessories",
      "rating": 4.3,
      "image": "images/product-4.png"
    },
    {
      "id": 5,
      "name": "Mechanical Keyboard",
      "description": "Tactile mechanical keys with a sleek aluminum frame.",
      "price": 89.99,
      "quantity": 30,
      "category": "Accessories",
      "rating": 4.8,
      "image": "images/product-5.png"
    },
    {
      "id": 6,
      "name": "USB-C Hub",
      "description": "Multiport adapter with HDMI, USB 3.0, and SD card support.",
      "price": 24.99,
      "quantity": 100,
      "category": "Adapters",
      "rating": 4.1,
      "image": "images/product-6.png"
    }
  ]
}

```

I will have this JSON file in the downloads for this lesson along with the product images.

Put the images in a folder at `public/images`.

## JSON Server Script

Now we need to create a script to run JSON Server. Open the `package.json` file and add the following script:

```json
"scripts": {
  //...,
  "json-server": "json-server src/data/db.json --port 5000"
}
```

Now in your terminal, run the following command:

```bash
npm run json-server
```

This will start the JSON Server and you can go to `http://localhost:5000/products` to see the data. You can also use Postman or any other API client to test the API. You can also use the browser to test the API.

Leave this running and we will move on to the next step.
