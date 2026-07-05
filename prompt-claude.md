# Claude Prompt

## Prompt 1 — Analyze & Split

```
Read the following raw post idea. Determine whether it contains multiple standalone ideas that would each work better as their own short post (a "Spoke"), rather than one long post.

For each standalone idea you identify, list:
- A short working title
- A 1-2 sentence description of what it would cover
- Any concepts it mentions that overlap with, or depend on, one of the other identified ideas (note which one, so I can consider linking them later as "Related Readings" — do not write any links, just flag the relationship in plain text)

If the post genuinely doesn't need splitting, say so plainly and explain why in one sentence.

Raw post:
[PASTE RAW POST HERE]
```

## Prompt 2 — Generate a Spoke

```
Rewrite the following idea as a standalone blog post (a "Spoke") in a casual, conversational tone (like you're chatting with a friend, not writing a formal article). Aim for 3 paragraphs, roughly 250-350 words total — clear, natural, and easy to read.

Prioritize simplicity and clarity over completeness — if an idea can't be explained plainly, the explanation needs to be reworked, not lengthened.

This post should be self-contained. If it needs to reference a concept covered in another Spoke, give only a quick one-sentence definition inline for context — don't explain it in depth here.

Suggest a short, engaging title as a Markdown H1 at the top.

At the end, add this attribution on its own line:

💡 Idea by me, prose by Claude (Anthropic), [Photo by attribution from Unsplash]

Then on the next line, suggest 3-5 relevant hashtags (formatted as #like #this #inline).

Then, suggest 3-5 Unsplash search keyword phrases suitable for this post's header image, each with a brief note on the mood/angle it captures.

Idea to write about:
[PASTE ONE IDEA FROM STEP 1 HERE]
```

## Prompt 3 — Generate Hub

```
I'm building a Hub page — a short index page linking together a set of related Spoke posts. Here are the finished (or planned) Spoke titles and descriptions:

[PASTE LIST OF SPOKE TITLES + 1-LINE DESCRIPTIONS HERE]

Write:
1. A short, engaging Hub title as a Markdown H1
2. A 2-4 sentence description tying the Spokes together, in the same casual tone as the Spokes themselves
3. A list formatted as:
   - [Spoke Title] — one-sentence teaser (link: TBD)

Do not write the Spokes themselves — only the Hub shell.
```
