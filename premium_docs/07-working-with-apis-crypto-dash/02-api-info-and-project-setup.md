# API Info & Project Setup

We are going to be building a crypto pricing dashboard and we're using Coingecko, which is one of the most comprehensive APIs available to the public. Now if you were building a production application with this API, you would have to pay for it and it's not cheap. However, they do have a free demo plan with a small rate limit. Meaning you can only hit the endpoint a certain amount of times per hour. This is how most public APIs work. They're free for development and testing but if you want to use them in a real product, then they charge you for it. Which is understandable, you're using their data and infrustructure. But you don't need to pay anything or sign up to do what we're doing.

If you goto the docs and click on "Endpoint Overview" it gives you a list of all the different endpoints that you can hit to get specific data. What we'll be working with is the `coins/markets` endpoint. This lets us query all the supported coins with price, market cap, volume and market related data. That's what we need for our project. But there is so much more you can do with this API. You can build enterprise-level apps with it.

If you click on https://docs.coingecko.com/reference/coins-markets you'll see an example of what we get. We get things like the coin name, price, market cap, 24h low and high, total supply and much much more. So if you want to expand this app and add more stuff to it, you certainly can.

## Spin Up A Project

Let's go ahead and scaffold our project using Vite. We are going to use a custom global CSS file for styling.

Run the following command:

```bash
npx create-vite@latest crypto-dash
```

Open the `index.css` file and add the following:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #0e1117;
  color: #f0f0f0;
  line-height: 1.6;
  padding: 2rem;
}

h1 {
  margin-bottom: 2rem;
  font-size: 2rem;
}

a {
  color: #fff;
  text-decoration: none;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.coin-card {
  background-color: #161b22;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}

.coin-card:hover {
  transform: translateY(-5px);
}

.coin-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.coin-image {
  width: 40px;
  height: 40px;
}

.symbol {
  font-size: 0.9rem;
  color: #aaa;
}

.positive {
  color: #4caf50;
}

.negative {
  color: #f44336;
}

/* Top Controls */
.top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.top-controls .filter {
  flex: 1;
}

.top-controls .controls {
  flex-shrink: 0;
}

/* Limit Select */
.controls {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.75rem;
}

.controls label {
  font-weight: bold;
}

.controls select {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: #1c1f26;
  color: white;
  border: none;
}

/* Filter Input */
.filter {
  margin-bottom: 2rem;
}

.filter input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: none;
  background: #1c1f26;
  color: #fff;
  font-size: 1rem;
}

/* Top Nav */
.top-nav {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 1rem;
}

.top-nav a {
  color: #58a6ff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.2s ease;
}

.top-nav a:hover {
  color: #4090db;
}

/* About Page */
.about {
  max-width: 600px;
  margin: 0 auto;
  background-color: #161b22;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.about h1 {
  margin-bottom: 1rem;
}

.about p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

/* Coin Details */
.coin-details-container {
  max-width: 700px;
  margin: 40px auto;
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.coin-details-container a {
  display: inline-block;
  margin-bottom: 20px;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  transition: color 0.3s;
}

.coin-details-container a:hover {
  color: #0056b3;
}

.coin-details-title {
  font-size: 36px;
  margin-bottom: 10px;
}

.coin-details-image {
  width: 100px;
  margin-bottom: 20px;
}

.coin-details-description {
  font-size: 16px;
  margin-bottom: 20px;
  color: #555;
}

.coin-details-info h3,
.coin-details-info h4 {
  margin: 10px 0;
  color: #222;
}

.coin-details-info h3 {
  font-size: 22px;
}

.coin-details-info h4 {
  font-size: 16px;
}

.coin-details-links {
  margin-top: 20px;
}

.coin-details-links a {
  color: #007bff;
  text-decoration: none;
}

.coin-details-links a:hover {
  text-decoration: underline;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

Delete the `App.css` file and update the `App.jsx` file as follows:

```jsx
const App = () => {
  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
    </div>
  );
};

export default App;
```

## Page Title & Favicon

You can set the page title. Open the `index.html` file and update the `<title>` tag:

```html
<title>Crypto Dash</title>
```

You can get the `favicon.ico` file from the download link for this lesson or in the final code repo. Place it in the `public` folder then change the `<link>` tag in the `index.html` file to:

```html
<link rel="icon" type="image/ico" href="/favicon.ico" />
```

Now run the server with `npm run dev` and you should see "My App" on the screen.
