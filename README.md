# Note App

A browser-based React and TypeScript note app with Markdown content, tags,
search, and local persistence.

## Getting started

```sh
npm install
npm run dev
```

The app adds four editable template notes the first time it runs. Existing users
and users who intentionally delete every note keep their current state.

## Project structure

```text
src/
├── app/                    # Application shell and route composition
│   └── App.tsx
├── features/
│   └── notes/              # Note-specific UI, data, and domain types
│       ├── components/
│       ├── data/
│       └── types.ts
├── shared/
│   └── hooks/              # Reusable, feature-independent hooks
├── index.css               # Global styles
└── main.tsx                # Browser entry point
```

This feature-first layout keeps note behavior together and leaves `shared` for
code that is genuinely reusable. If another feature is added later, it can get
its own directory under `features` without making the source root crowded.

## Checks

```sh
npm run check
npm run build
```
