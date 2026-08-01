# Content Guide for Future Chapters

Use this guide in Part 2 when replacing the short sample story with the full Najma family adventure. The engine reads chapter objects from the `chapters` array in `script.js`.

## Chapter object template

```js
{
  id: "garden-of-secrets",
  number: 5,
  title: "The Garden of Secrets",
  subtitle: "Where the roses know more than they are saying.",
  theme: "garden",
  voice: {
    path: "assets/audio/family/ali.mp3",
    speaker: "Ali"
  },
  photo: {
    path: "assets/photos/najma-05.jpg",
    alt: "Najma smiling with her children in a sunny garden",
    caption: "A sunny afternoon with the royal family.",
    fit: "cover"
  },
  paragraphs: [
    "Queen Najma followed the golden path until she found {{gardenClue}}.",
    "The family gathered close. Their next move would be {{nextMove}}."
  ],
  blanks: [
    {
      id: "gardenClue",
      prompt: "What clue did she find?",
      choices: [
        {
          id: "photo-note",
          label: "a photograph with a loving note",
          scores: {
            wordsOfAffirmation: 3,
            handmadeGift: 2
          },
          reaction: "The handwriting is familiar, and the message makes everyone smile."
        },
        {
          id: "picnic-map",
          label: "a map to a family picnic",
          scores: {
            qualityTime: 3,
            familyTime: 4
          },
          reaction: "The route appears to pass every excellent snack in the kingdom."
        },
        {
          id: "helping-list",
          label: "a list of chores already completed",
          scores: {
            actsOfService: 4,
            familyTime: 1
          },
          reaction: "For once, there is absolutely nothing left for Queen Najma to organize."
        },
        {
          id: "wrapped-key",
          label: "a beautifully wrapped golden key",
          scores: {
            receivingGifts: 3,
            amazonGift: 2
          },
          reaction: "Even the wrapping paper looks important. No one wants to tear it."
        }
      ]
    },
    {
      id: "nextMove",
      prompt: "What should the family do next?",
      choices: [
        {
          id: "walk-together",
          label: "walk through the garden together",
          scores: { qualityTime: 4, familyTime: 3 },
          reaction: "The quest slows down just enough for everyone to enjoy it."
        },
        {
          id: "group-hug",
          label: "begin with a royal group hug",
          scores: { physicalTouch: 4, familyTime: 2 },
          reaction: "The roses politely pretend not to be emotional."
        },
        {
          id: "record-message",
          label: "record a birthday message",
          scores: { wordsOfAffirmation: 3, digitalGift: 4 },
          reaction: "Take three is perfect, except for the mysterious sneeze."
        },
        {
          id: "carry-basket",
          label: "carry her basket for her",
          scores: { actsOfService: 4, handmadeGift: 1 },
          reaction: "Her Majesty accepts this practical act of royal devotion."
        }
      ]
    }
  ],
  nextChapterId: "the-next-chapter-id"
}
```

## Field reference

### `id`

A permanent, unique machine-readable ID. Use lowercase words separated by hyphens. Saved progress refers to this ID, so avoid changing it after readers have begun the story.

### `number`

The chapter number shown to readers. Keep numbers sequential and ensure the object's position in the `chapters` array matches the intended reading order.

### `title` and `subtitle`

The title should be memorable and short. The subtitle can add humor or set the scene. Both are plain text.

### `theme`

An optional visual theme name. The engine adds this value as `data-theme` on the story card. Add a matching CSS rule when a distinct border or atmosphere is desired. The story works without a custom rule.

### `paragraphs`

An array of story paragraphs. Insert a blank with a double-brace token:

```text
The family discovered {{gardenClue}} beneath the tree.
```

The token must exactly match a blank `id` in the same chapter. Write the sentence so every choice is grammatically sensible when inserted.

### `blanks`

Each blank defines one required story pause:

- `id`: unique across the whole adventure, not just the chapter
- `prompt`: the accessible question shown in the choice selector
- `choices`: four selectable answer objects

The Continue button remains disabled until all of the current chapter's blanks have saved answers.

### `choices`

Each choice contains:

- `id`: unique within its blank and stable after publication
- `label`: the phrase inserted directly into the story sentence
- `scores`: points awarded to one or more supported categories
- `reaction`: a short, family-friendly response shown after selection

Keep labels concise enough to read comfortably inside a sentence and on a phone. Keep reactions to one or two short sentences.

### Score mappings

Valid love-language keys:

```text
qualityTime
wordsOfAffirmation
actsOfService
receivingGifts
physicalTouch
```

Valid gift-type keys:

```text
familyTime
handmadeGift
digitalGift
amazonGift
```

A choice can award multiple categories from either group:

```js
scores: {
  qualityTime: 3,
  physicalTouch: 1,
  familyTime: 4
}
```

Use small whole numbers and apply them consistently. The current samples use roughly 1–5 points. Changing an answer is safe because the engine rebuilds all totals from the currently selected answers rather than adding points incrementally.

Tied categories follow the defined category order, making results predictable. Percentages are rounded shares of earned points within each result group.

### `reaction`

The reaction appears in a live status area and story card. It should acknowledge the exact choice, reward curiosity, and maintain the warm, elegant, family-comedy voice.

### `photo`

Set `photo` to `null` for no photo, or provide:

- `path`: local path beginning with `assets/photos/`
- `alt`: a useful description for someone who cannot see the image
- `caption`: optional visible context
- `fit`: `cover` for a crop or `contain` for the entire image

If a file is missing, the engine automatically replaces it with a styled placeholder. Never use a remote placeholder URL.

### `voice`

Set `voice` to `null` for no recording, or provide a local `path` and the visible `speaker` name. The player appears only when the audio file can be loaded, so missing family recordings never interrupt a chapter.

### `nextChapterId`

Set this to the exact `id` of the next chapter. Set it to `null` on the final chapter; the Continue button then becomes **Reveal Results**.

## Future chapter checklist

- Keep Najma at the center of every chapter.
- Balance warmth, elegance, family humor, and specific memories.
- Confirm names, spellings, dates, and sensitive details with the family.
- Make all four options enjoyable; avoid one obvious “correct” answer.
- Ensure every option fits naturally into its paragraph sentence.
- Vary scoring so the ending can reflect genuine patterns.
- Give every photograph specific alt text and an approved caption.
- Point every `nextChapterId` to a real chapter.
- Test changing every answer and confirm the visible reaction updates.
- Complete the full story once, refresh, resume, inspect results, and restart.
