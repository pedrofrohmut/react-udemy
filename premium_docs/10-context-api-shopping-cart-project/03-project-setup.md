# Project Setup

We are going to setup our project. The main focus here is the context API. Keep that in mind. So I am not installing any fancy packages. We will use Vite to scaffold the app and I am going to use TypeScript as well. This is optional for you.

Run the following command in the terminal to create a new Vite project:

```bash
npm create vite@latest shopping-cart-ui
```

Select "React" and select either "JavaScript" or "TypeScript" when prompted. I am going to use JavaScript. We will get into TypeScript later though.

## Tailwind CSS

Let's also install Tailwind and the vite plugin for Tailwind CSS.

```bash
npm install tailwindcss @tailwindcss/vite
```

Add the following to your `vite.config.js` file:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Open the `index.css` file and add the following:

```css
@import 'tailwindcss';
```

Delete the `App.css` file and update the `App.jsx` file as follows:

```jsx
const App = () => {
  return <>My App</>;
};

export default App;
```

Now run the server with `npm run dev` and you should see "My App" on the screen.

## Product Data and Images

We are going to have a JSON file with the product data. You can download this in the lesson resources along with the product images.

Here is the JSON data:

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

Put the JSON data in a file at `src/data/db.json` and the images in a folder at `src/public/images/`.
