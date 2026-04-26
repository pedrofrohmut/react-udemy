# MongoDB Compass & Importing Data

As we saw in the last lesson, you can see and manage your data in MongoDB Atlas, however, there is a better way to manage your data in MongoDB. You can use MongoDB Compass, which is a GUI (Graphical User Interface) desktop application. It allows you to visualize your data, run queries, and manage your database without writing any code.

This is optional, but it is highly recommended to use MongoDB Compass to manage your data. You can download it from the [MongoDB Compass Download Page](https://www.mongodb.com/try/download/compass).

Once you install it and open it, it will ask for a URI. Go back to your MongoDB Atlas account and click on the "Connect" button. Then click on "Compass". You will see a connection string that looks like this:

```bash
mongodb+srv://<db_username>:<db_password>@cluster0.gwdxwmc.mongodb.net/
```

Add this to Compass and click on "Connect".

You will see your databases on the left side. Click on the ideadrop database and you will see the idea that we just added.

You can also create new ideas from here and manage your data. You can also run queries to find specific data.

## Importing Data

I want to add all the ideas that we were using with JSON Server. You should still have your `idea-drop-ui/src/data/db.jsom` file. We need to edit that a bit. We don't want to have the ids in it because MongoDB will create them for us. So we need to remove the `id` field from each idea. Change the structure to look like the following and add it to a new file called `ideas.json` and save it to your backend folder at `idea-drop-api/data-import/ideas.json`. Do not edit the original `db.json` file.

```json
[
  {
    "title": "Airbnb for Garages",
    "summary": "Rent out your garage for storage or parking.",
    "description": "This platform allows homeowners to monetize unused garage space by offering it for short- or long-term storage, parking, or even micro-offices. Think Airbnb, but for underutilized residential garages. It could also provide insurance, keyless access, and a rating system for trust and safety.",
    "tags": ["real estate", "sharing economy"]
  },
  {
    "title": "Local Farm Box Subscription",
    "summary": "Weekly produce delivery from nearby farms.",
    "description": "A subscription box service connecting local farmers with urban dwellers looking for fresh produce. Customers receive a curated box each week containing fruits, vegetables, and artisanal goods sourced directly from nearby growers. It encourages local commerce, healthy eating, and seasonal variety.",
    "tags": ["subscription", "local", "marketplace"],
    "createdAt": "2025-04-28T14:30:00.000Z"
  },
  {
    "title": "Micro-SaaS for Freelancers1",
    "summary": "A personal dashboard to manage freelance work.",
    "description": "A lightweight SaaS platform that helps freelancers track their clients, invoices, contracts, and income in one place. Built specifically for solopreneurs who don’t need bulky CRM tools but want visibility into their business and finances. Includes tax estimates, recurring invoice reminders, and expense logging.",
    "tags": ["freelance", "saas", "tools"]
  },
  {
    "title": "Virtual Closet Organizer",
    "summary": "Your wardrobe, digitized and AI-personalized.",
    "description": "An app that lets users take pictures of their clothes and upload them into a virtual closet. The app uses AI to suggest daily outfits based on the weather, calendar events, and style preferences. Features might include travel packing lists, outfit tracking, and a sharing option for friends to browse each other's closets.",
    "tags": ["fashion", "ai", "productivity"],
    "createdAt": "2025-04-25T16:45:00.000Z"
  },
  {
    "title": "Pet Sitter Marketplace",
    "summary": "Book trusted sitters and walkers in your area.",
    "description": "A two-sided platform where pet owners can find, book, and review local pet sitters and dog walkers. All providers go through background checks and can create profiles with availability, pricing, and services offered. Includes messaging, GPS walk tracking, and emergency contact sharing.",
    "tags": ["pets", "marketplace", "local"],
    "createdAt": "2025-04-26T11:20:00.000Z"
  },
  {
    "title": "Remote Job Recommender",
    "summary": "Smart job matches using your online presence.",
    "description": "An AI-powered platform that analyzes your GitHub, LinkedIn, resume, and public portfolios to find remote jobs that align with your skills and goals. Users receive a daily or weekly feed of tailored listings, and the system learns from their clicks and applications to improve recommendations over time.",
    "tags": ["jobs", "remote", "ai"],
    "createdAt": "2025-04-24T13:10:00.000Z"
  }
]
```

Now open Compass and select your database. Click on the `ideas` collection and then click on the "Collection-> Import Data" option in the main menu and select the `ideas.json` file. Compass will automatically detect the JSON format and import the data into your collection.
