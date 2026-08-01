# Queen Najma's Birthday Adventure — Release Candidate 1

A mobile-first “Choose Your Own Adventure” birthday storybook with nine family chapters, real photographs, family recordings, memory tokens, achievements, a cinematic montage, personalized results, and an unlocked gallery.

RC1 is a static, installable Progressive Web App prepared for GitHub Pages. It uses no framework, backend, database, tracking, build tool, or external runtime dependency. After the first successful hosted visit, the complete adventure is cached for offline use.

## Open the website

1. Open the `Birthday Quest - Queen Najma` folder.
2. Double-click `index.html`.
3. The site opens in the default browser.

Direct file opening remains useful for story testing, but PWA installation and offline caching require GitHub Pages, HTTPS hosting, or `localhost`. Background music begins only after **Begin the Adventure**, which satisfies mobile browser playback rules.

## Folder structure

```text
birthday-quest/
├── index.html                  Page structure and accessible dialogs
├── styles.css                 Design system, layout, and animations
├── script.js                  Story data, rendering, state, and scoring
├── manifest.webmanifest       Installable app identity and icons
├── service-worker.js          Versioned offline cache
├── .nojekyll                  GitHub Pages compatibility
├── .github/workflows/         Automatic GitHub Pages deployment
├── README.md                  Setup and extension instructions
├── assets/
│   ├── photos/                Chapter, montage, and gallery photographs
│   ├── audio/                 Background music, family voices, and optional effects
│   └── icons/                 PWA, maskable, Apple, and favicon artwork
└── docs/
    └── content-guide.md       Chapter-writing template and reference
```

## Add photos

Place photographs in `assets/photos/`. The current gallery uses descriptive filenames such as:

- `assets/photos/family-mountain.jpg`
- `assets/photos/hawaii-ali-najma.jpg`
- `assets/photos/umrah-ali-najma.jpg`
- `assets/photos/grandkids-couch.jpg`

Three future drop-in gallery slots are already configured. Add photographs using these exact names and they appear automatically without a code change:

- `assets/photos/family-extra-01.jpg`
- `assets/photos/family-extra-02.jpg`
- `assets/photos/family-extra-03.jpg`

Missing photos intentionally display a styled placeholder. To connect a photograph to a specific chapter, update that chapter's `photo` object in `script.js`:

```js
photo: {
  path: "assets/photos/najma-03.jpg",
  alt: "Najma laughing with her family at dinner",
  caption: "A legendary family dinner.",
  fit: "cover"
}
```

Use `fit: "cover"` for an edge-to-edge crop or `fit: "contain"` when the whole image should remain visible. Always write alt text that describes the meaningful content of the photo.

## Add music

The RC1 primary violin soundtrack is stored at:

```text
assets/audio/birthday-background.mp3
```

Audio volume defaults to 20%. There is no autoplay: music begins with a two-second fade only after the reader starts the story. It softens during the cookie, volcano, and shopping scenes; ducks further beneath family messages; rises slightly on Memory Mountain; becomes more prominent during the montage; and settles into the birthday letter without stopping abruptly. Mute and volume preferences are remembered. If the background track is absent, the story remains silent while family recordings and any available effects continue normally.

### Family voice messages

Drop optional recordings into `assets/audio/family/`. These filenames are preconfigured and require no code changes:

```text
ali.mp3
abubakr.mp3
fatima.mp3
khalid.mp3
yusuf.mp3
zaynab.mp3
```

Available recordings appear as a chapter button. Missing recordings remain invisible and the story continues silently.

### Optional scene sounds

Drop short, licensed effects into `assets/audio/effects/` using these preconfigured filenames:

```text
page-turn.mp3
volcano.mp3
cookies.mp3
chai.mp3
crochet.mp3
shopping.mp3
boing.mp3
treasure.mp3
fireworks.mp3
```

The sound preference and volume slider apply to background music and effects. Missing effects fail silently.

Only use music you own or have permission to use.

## How chapters are defined

All chapter content lives in the `chapters` array near the top of `script.js`. HTML is generated from that trusted data. Each chapter contains identifiers, headings, paragraph templates, optional media, interactive blanks, answer choices, score mappings, reactions, and the ID of the next chapter.

Paragraphs insert an interactive choice using a token such as `{{firstMove}}`. The chapter must contain a blank whose `id` is exactly `firstMove`.

See `docs/content-guide.md` for a complete template.

## How scoring works

Each choice may add points to one or more categories.

Love-language categories:

- `qualityTime`
- `wordsOfAffirmation`
- `actsOfService`
- `receivingGifts`
- `physicalTouch`

Gift-type categories:

- `familyTime`
- `handmadeGift`
- `digitalGift`
- `amazonGift`

Example:

```js
scores: {
  qualityTime: 3,
  familyTime: 4
}
```

Scores are recalculated from saved answers every time a choice changes, so an earlier choice is never double-counted. Rankings sort by score from highest to lowest. A tie follows the stable category order listed above. Result percentages show each category's rounded share of points earned within its group; they are a playful guide, not scientific precision.

## Add a chapter

1. Copy an existing chapter object in the `chapters` array.
2. Give it a unique `id` and sequential `number`.
3. Replace its title, subtitle, paragraphs, blanks, and choices.
4. Point the preceding chapter's `nextChapterId` to the new ID.
5. Set the final chapter's `nextChapterId` to `null`.
6. Open the page and test forward navigation, previous navigation, refresh, answer changes, and results.

Chapter progress automatically uses the number of objects in the `chapters` array.

## Add a choice option

Each blank should keep four choices for the current design. Add an object with a unique ID, visible label, one or more valid score categories, and a custom reaction:

```js
{
  id: "garden-picnic",
  label: "a family picnic in the garden",
  scores: { qualityTime: 3, familyTime: 4 },
  reaction: "The royal picnic blanket appears right on cue."
}
```

Do not put private or user-entered content into the chapter data. All current content is developer-authored and rendered with safe DOM text nodes.

## Customize colors and motion

The design tokens are at the top of `styles.css` inside `:root`. Change variables such as `--plum-800`, `--gold-500`, `--coral-500`, and `--teal-600` to update the palette consistently.

Spacing, corner radii, shadows, typography, and animation speeds are tokens in the same section. The site respects the operating system's reduced-motion preference and also provides its own saved reduced-motion toggle.

## Test on a phone

The simplest check is to copy the entire `birthday-quest` folder to the phone and open `index.html` in a browser or local-file viewer.

For broader testing on a home network, a lightweight local server can be used if Python is already installed:

```sh
cd "birthday-quest"
python3 -m http.server 8000
```

Then find the computer's local network address and visit `http://YOUR-COMPUTER-IP:8000` from a phone on the same Wi-Fi network. Stop the server with `Control-C`. This server is optional; double-clicking `index.html` remains the supported primary workflow.

Test at minimum:

- portrait and landscape phone orientations
- touch selection and changing an answer
- disabled Continue button before all blanks are filled
- refresh and **Continue Adventure**
- reduced motion
- missing photos and missing music
- final results, replay, and print/save as PDF
- montage skip, gallery arrows, keyboard navigation, grid view, fullscreen, and touch swipe
- family voice messages and silent fallback for missing recordings

## Deploy to GitHub Pages

1. Create an empty GitHub repository.
2. Add this folder's contents, commit them, and push the branch as `main`.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions** as the source.
5. Run or wait for the included **Deploy Queen Najma Birthday Adventure** workflow.
6. Open the URL reported by the deployment job, usually `https://USERNAME.github.io/REPOSITORY/`.

All application references are relative, so GitHub project subpaths work without editing. The `.nojekyll` file prevents unwanted Jekyll processing, and the included workflow publishes the unchanged static files.

### Publish future versions

1. Update content or media locally and test it.
2. Change `CACHE_VERSION` near the top of `service-worker.js`, for example from `queen-najma-rc1-v2` to `queen-najma-rc1-v3`.
3. Add any new required offline files to `APP_SHELL` in the same file.
4. Commit and push to `main`.
5. GitHub Actions deploys the new version. Existing installations receive a graceful update notice and use the new edition after reopening.

### Install on a phone

- **iPhone/iPad Safari:** open the deployed site, tap **Share**, then **Add to Home Screen**.
- **Android Chrome/Edge:** use the in-app **Install App** button when shown, or choose **Install app** from the browser menu.
- **Desktop Chrome/Edge:** use **Install App** when the browser reports the PWA as installable.

Before public deployment, confirm that every photo, music track, and story detail is approved for sharing.

## Privacy and saved progress

The site sends no data anywhere. Progress, memory tokens, achievements, volume, and preferences are stored only in the current browser using `localStorage` under `queenNajmaBirthdayQuest.v2`. **Restart Adventure** clears story progress after confirmation while preserving accessibility and audio preferences.
