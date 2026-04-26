# Bonus: Animating Category Select With Framer Motion

I figured this would be a cool little addon. Right now we can select a category for the projects to filter. I want to make so that when we do that, it shows a cool animation to move them into place. We can do this with a library called Framer Motion.

Let's install it:

```bash
npm install framer-motion
```

Open the `app/routes/projects/index.tsx` file and wrap the main content with the `AnimatePresence` component from Framer Motion.

First, import it:

```jsx
import {AnimatePresence, motion} from 'framer-motion'
```

Now replace this:

```jsx
<div className='grid gap-6 sm:grid-cols-2'>
  {currentProjects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ))}
</div>
```

With this:

```jsx
<AnimatePresence mode='wait'>
  <motion.div layout className='grid gap-6 sm:grid-cols-2'>
    {currentProjects.map((project) => (
      <motion.div key={project.id} layout>
        <ProjectCard project={project} />
      </motion.div>
    ))}
  </motion.div>
</AnimatePresence>
```

The `AnimatePresence` component will animate the children when they are added or removed. The `motion.div` component will animate the layout of the children.
