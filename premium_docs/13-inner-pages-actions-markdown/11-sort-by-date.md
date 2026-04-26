# Sort By Date

Let's sort our posts by date. There is one thing that needs to be addressed though. You may notice that the date in your JSON and the date on the page are one day off. This has to do with timezones.

To fix this, we need to make sure the date is in proper ISO format with a full timestamp. Right now, your dates look like this:

```
"date": "2025-01-28"
```

When JavaScript parses that with `new Date("2025-01-28")`, it assumes midnight UTC. So depending on your local timezone, it may display as the previous day. For example, if you're in EST (UTC-5), it gets shifted back to `2025-01-27 19:00`, and the date renders as January 27.
✅ Fixing the Date Format

To avoid this timezone issue, update your JSON dates to include a full ISO timestamp, like this:

"date": "2025-01-28T00:00:00"

This tells JavaScript to treat it as local midnight, so it won’t shift the date based on UTC.

Alternatively, if you don’t want to update the JSON file, you can append "T00:00:00Z" when you create the date in your code to explicitly treat it as UTC:

new Date(post.date + "T00:00:00Z")

## Sorting the Posts

Once the date format is handled, you can sort the posts by newest first in your loader in the `app/routes/blog/index.tsx` file:

data.sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

This compares timestamps and puts the most recent posts first.