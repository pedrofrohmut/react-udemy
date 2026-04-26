# Conditional Rendering Challenge

Let's do a simple challenge. And this is really for the beginners. Those of you that have worked with React will get this no problem.

I want you to make the left border on the note a certain color based on the priority.  If the priority is 'High', the color will be red. If the priority is 'Medium', the color will be orange. If the priority is 'Low', the color will be green.

Hint: You can use inline styling with the `borderLeftColor` property.

Pause the video and give it a shot:

## Solution

Open your 'NoteList.jsx' file and replace the `div` within the `map` method with the following:

```jsx
<div
  key={note.id}
  className='p-4 bg-white rounded-lg shadow-md border-l-4'
  style={{
    borderLeftColor:
      note.priority === 'High'
        ? 'red'
        : note.priority === 'Medium'
        ? 'orange'
        : 'green',
  }}
></div>
```

