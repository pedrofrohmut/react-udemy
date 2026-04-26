# Full Stack Folder Structure

The way we are going to set this up may be a bit strange to some of you that have worked with platforms like Wordpress or anything where your frontend and backend are tightly coupled. Strapi is a headless CMS, which means that it is designed to be used as a backend only. It does not come with a frontend out of the box. So we are going to have our frontend and backend be completely separate sibling folders.

This will be our structure:

- friendly-dev
  - friendly-dev-backend
  - friendly-dev-frontend

## Terminal Commands 

Here are the steps to create the file structure via terminal:

1. Navigate to the parent dir of `friendly-dev`

```bash
cd ..
```

2. Make a new directory called `friendly-dev-new`:

```bash
mkdir friendly-dev-new
```

3. Copy your entire React project (including .git) to the new structure:

```bash
cp -R friendly-dev/ friendly-dev-new/friendly-dev-frontend/

# Windows CMD
xcopy friendly-dev friendly-dev-new\friendly-dev-frontend /E /I /H
```

4. Remove the original

```bash
rm -rf friendly-dev/
# Windows CMD
rmdir /S /Q friendly-dev

```

5. Rename the new directory

```bash
mv friendly-dev-new/ friendly-dev/

# Windows CMD
rename friendly-dev-new friendly-dev
```

Now navigate to the `friendly-dev` folder. In the next lesson, we will generate our Strapi project in the backend folder.

## Peacock Extension

I want it to be very clear on when I am working in the frontend React app and when I am in the backend Strapi app. So I will be using the [Peacock](https://marketplace.visualstudio.com/items?itemName=JohnPapa.vscode-peacock) extension to change the color of my VSCode window. This is not required, but I find it very helpful.

I will open the `friendly-dev-frontend` folder in a new VSCode window and open the command pallete with `CTRL + SHIFT + P` and type "Peacock" and select "Peacock: Change color and enter `#61DAFB`, which is the React branding color.

