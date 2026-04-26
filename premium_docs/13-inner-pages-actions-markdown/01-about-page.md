# About Page

We are now going to do the about page. This is a simple page that will have some more information about the developer.

The `profile.jpg` image can be found in the final code. I will also provide it in the download link for this lesson.

Add the following code to the `app/routes/about/index.tsx` file:

```jsx
const AboutPage = () => {
  return (
    <div className='max-w-5xl mx-auto px-6 py-16 bg-gray-900'>
      {/* Intro */}
      <div className='flex flex-col md:flex-row items-center md:items-start gap-10 mb-12'>
        <img
          src='/images/profile.jpg'
          alt='Profile'
          className='w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md'
        />
        <div>
          <h1 className='text-3xl font-bold text-white mb-2'>
            Hey, I'm John 👋
          </h1>
          <p className='text-gray-300 text-lg'>
            I'm a passionate web developer and content creator who loves
            building friendly digital experiences and helping others grow into
            confident, modern developers.
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <div className='mb-12'>
        <h2 className='text-2xl font-semibold text-white mb-4'>My Mission</h2>
        <p className='text-gray-300 leading-relaxed'>
          After turning my life around, I made it my mission to share what I’ve
          learned with others — not just about code, but about building a life
          you’re proud of. Through tutorials, courses, and real-world projects,
          I aim to make development accessible, friendly, and something you look
          forward to each day.
        </p>
      </div>

      {/* Tech Stack */}
      <div>
        <h2 className='text-2xl font-semibold text-white mb-4'>
          🚀 Tech I Use
        </h2>
        <ul className='flex flex-wrap gap-4 text-sm text-gray-300'>
          {[
            'React',
            'Next.js',
            'Vue',
            'Tailwind CSS',
            'Node.js',
            'Laravel',
            'Prisma',
            'MongoDB',
            'PostgreSQL',
            'Appwrite',
            'Docker',
          ].map((tech) => (
            <li
              key={tech}
              className='bg-gray-200 bg-gray-700 px-3 py-1 rounded-md'
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
```

We are just outputting some information about the developer. We have an image, a bio, a mission statement, and a list of technologies that the developer uses.

## About Homepage Component

Let's add a little blurb about the developer to the homepage.

Create a new file at `app/components/about-preview.jsx` and add the following code:

```jsx
import { Link } from 'react-router';

const AboutPreview = () => {
  return (
    <section className='mt-12 p-10 flex flex-col md:flex-row items-center gap-8 bg-gray-900'>
      <img
        src='/images/profile.jpg'
        alt='profile'
        className='w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-500 shadow-md'
      />
      <div>
        <h2 className='text-2xl font-bold text-white mb-2'>👋 About Me</h2>
        <p className='text-gray-300 mb-4 max-w-xl'>
          I’m John — a self-taught developer and educator passionate about
          building friendly digital experiences and helping others grow into
          confident modern devs.
        </p>
        <Link
          to='/about'
          className='inline-block text-blue-400 hover:underline text-sm'
        >
          Learn more about me →
        </Link>
      </div>
    </section>
  );
};

export default AboutPreview;
```

Open the `app/routes/home/index.tsx` file and import the `AboutPreview` component at the top:

```jsx
import AboutPreview from '~/components/about-preview';
```

Then, add the `AboutPreview` component to the `Home` component:

```jsx

```

Then, add the following code to the `Homepage` component:

```jsx
<>
  <FeaturedProjects />
  <AboutPreview /> {/* Add this line */}
</>
```
