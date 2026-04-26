# Mock REST API

I want to setup a backend to make requests to to get some data. We will use JSON placeholder, which creates a mock REST API for us. This is a great way to test our application without having to set up a real backend. We will be using the following endpoints:

- `GET /ideas` - Get all ideas
- `GET /ideas/:id` - Get a single idea
- `POST /ideas` - Create a new idea
- `PUT /ideas/:id` - Update an idea
- `DELETE /ideas/:id` - Delete an idea

This is a very common structure for what we call a REST API. REST stands for Representational State Transfer. It is an architectural style for designing networked applications. RESTful APIs are stateless, meaning that each request from the client to the server must contain all the information needed to understand and process the request. This allows for scalability and flexibility in web applications.

A REST API is a way to communicate with a server using HTTP requests. It allows us to create, read, update, and delete data on the server, which if you think about it, is what is at the heart of most applications.

In a future section, I will show you how to create your own backend REST API using Node.js, Express and MongoDB and we will turn this into a MERN app. But for now, we will use JSON placeholder to test our application.

Install JSON server by running the following command in the terminal:

```bash
npm install -d json-server
```

Now create a new file called `src/data/db.json` in the root of your project and add the following code:

```json
{
  "ideas": [
    {
      "id": "1",
      "title": "Airbnb for Garages",
      "summary": "Rent out your garage for storage or parking.",
      "description": "This platform allows homeowners to monetize unused garage space by offering it for short- or long-term storage, parking, or even micro-offices. Think Airbnb, but for underutilized residential garages. It could also provide insurance, keyless access, and a rating system for trust and safety.",
      "tags": ["real estate", "marketplace", "sharing economy"],
      "createdAt": "2025-04-27T10:00:00.000Z"
    },
    {
      "id": "2",
      "title": "Local Farm Box Subscription",
      "summary": "Weekly produce delivery from nearby farms.",
      "description": "A subscription box service connecting local farmers with urban dwellers looking for fresh produce. Customers receive a curated box each week containing fruits, vegetables, and artisanal goods sourced directly from nearby growers. It encourages local commerce, healthy eating, and seasonal variety.",
      "tags": ["subscription", "local", "marketplace"],
      "createdAt": "2025-04-28T14:30:00.000Z"
    },
    {
      "id": "3",
      "title": "Micro-SaaS for Freelancers",
      "summary": "A personal dashboard to manage freelance work.",
      "description": "A lightweight SaaS platform that helps freelancers track their clients, invoices, contracts, and income in one place. Built specifically for solopreneurs who don’t need bulky CRM tools but want visibility into their business and finances. Includes tax estimates, recurring invoice reminders, and expense logging.",
      "tags": ["freelance", "saas", "tools"],
      "createdAt": "2025-04-29T09:15:00.000Z"
    },
    {
      "id": "4",
      "title": "Virtual Closet Organizer",
      "summary": "Your wardrobe, digitized and AI-personalized.",
      "description": "An app that lets users take pictures of their clothes and upload them into a virtual closet. The app uses AI to suggest daily outfits based on the weather, calendar events, and style preferences. Features might include travel packing lists, outfit tracking, and a sharing option for friends to browse each other's closets.",
      "tags": ["fashion", "ai", "productivity"],
      "createdAt": "2025-04-25T16:45:00.000Z"
    },
    {
      "id": "5",
      "title": "Pet Sitter Marketplace",
      "summary": "Book trusted sitters and walkers in your area.",
      "description": "A two-sided platform where pet owners can find, book, and review local pet sitters and dog walkers. All providers go through background checks and can create profiles with availability, pricing, and services offered. Includes messaging, GPS walk tracking, and emergency contact sharing.",
      "tags": ["pets", "marketplace", "local"],
      "createdAt": "2025-04-26T11:20:00.000Z"
    },
    {
      "id": "6",
      "title": "Remote Job Recommender",
      "summary": "Smart job matches using your online presence.",
      "description": "An AI-powered platform that analyzes your GitHub, LinkedIn, resume, and public portfolios to find remote jobs that align with your skills and goals. Users receive a daily or weekly feed of tailored listings, and the system learns from their clicks and applications to improve recommendations over time.",
      "tags": ["jobs", "remote", "ai"],
      "createdAt": "2025-04-24T13:10:00.000Z"
    }
  ]
}
```

I will also add this in the resource files for this lesson.

## JSON Server Script

Now we need to create a script to run JSON Server. Open the `package.json` file and add the following script:

```json
"scripts": {
  //...,
  "json-server": "json-server  src/data/db.json --port 5000"
}
```

Now in your terminal, run the following command:

```bash
npm run json-server
```

This will start the JSON Server and you can go to `http://localhost:5000/ideas` to see the data. You can also use Postman or any other API client to test the API. You can also use the browser to test the API.

Leave this running and we will move on to the next step.
