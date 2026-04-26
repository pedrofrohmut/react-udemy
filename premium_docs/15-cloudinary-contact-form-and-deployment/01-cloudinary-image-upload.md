# Cloudinary Image Upload

Our image uploads work locally, however, when you deploy to Render, you will have an issue where the images intially upload but then when the server restarts, they will go away. This is because Render’s file system is read-only and ephemeral. This is a limitation of Render’s free tier.

We have a few solutions to this problem:

- Use a paid plan on Render. This will give you a persistent file system. You then need to mount a disk and it may get a little complicated.
- Use a third-party service like AWS S3 or Cloudinary to store your images. This is the best solution in my opionion, so we'll set that up now.

## Sign Up for Cloudinary

Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account. Once you are signed in, go to the **Dashboard** and copy your **Cloud Name**, **API Key**, and **API Secret**.

Add these to your `.env` file in the root of your Strapi project NOT the frontend. It should look like this:

```bash
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_KEY=your-api-key
CLOUDINARY_SECRET=your-api-secret
```

Your cloud name is up in the top-left corner.

## Install The Cloudinary Provider

We need to install the Cloudinary provider for Strapi. This will allow us to use Cloudinary as our file storage provider. Run the following command in your Strapi project:

Make sure you install this in your BACKEND STRAPI PROJECT, not the frontend.

```bash
npm install @strapi/provider-upload-cloudinary
```

## Enable Plugin

In your Strapi code, go to `config/plugins.js` and add the following code:

```javascript
module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {
          folder: env('CLOUDINARY_FOLDER'),
        },
        uploadStream: {},
        delete: {},
      },
    },
  },
  // ...
});
```

This is from the main NPM page at https://www.npmjs.com/package/@strapi/provider-upload-cloudinary

## Security Middleware Configuretion

If you go to the NPM page, they also say to open the `config/middlewares.js` file and replace the `security` middleware. Here is the entire file:

```javascript
export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'res.cloudinary.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'res.cloudinary.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

Now delete all images in Strapi. Go to the Media Library and select and delete all images. Then re-upload them. I will attach all images to this lesson resources folder.

 Then go through each post and project and select the image for that content.

## Change Image Location In Loader

You need to remove the Strapi URL from the image location in a bunch of files.

Remove the `${import.meta.env.VITE_STRAPI_URL}` in the loader in the following files:

- routes/projects/index.tsx
- routes/projects/details.tsx
- routes/blog/index.tsx
- routes/blog/details.tsx
- routes/home/index.tsx


