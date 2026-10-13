import type { RawNote, Tag } from "../types";

export const templateTags: Tag[] = [
	{ id: "template-getting-started", label: "Getting started" },
	{ id: "template-productivity", label: "Productivity" },
	{ id: "template-personal", label: "Personal" },
];

export const templateNotes: RawNote[] = [
	{
		id: "template-welcome",
		title: "Welcome to your notes",
		markdown: `# Welcome!

This app keeps your notes in this browser, so you can start writing right away.

- Select **Create** to add a note.
- Use **Edit** to update a note.
- Add tags to group related ideas.
- Filter the note list by title or tag.

You can edit or delete this example whenever you are ready.`,
		tagsIds: ["template-getting-started"],
	},
	{
		id: "template-markdown",
		title: "Markdown quick reference",
		markdown: `# Markdown quick reference

## Text

Use **bold** and *italic* text to highlight ideas.

## Lists

1. Write the first step
2. Add the next step
3. Mark it complete

## Links and quotes

> Capture the idea now; refine it later.

[Learn more about Markdown](https://www.markdownguide.org/basic-syntax/)`,
		tagsIds: ["template-getting-started"],
	},
	{
		id: "template-weekly-plan",
		title: "Weekly plan",
		markdown: `# This week

## Priorities

- TODO: Choose the three most important outcomes
- TODO: Reserve focused work time
- TODO: Review progress on Friday

## Notes

Add decisions, blockers, and follow-ups here.`,
		tagsIds: ["template-productivity"],
	},
	{
		id: "template-reading-list",
		title: "Reading list",
		markdown: `# Reading list

## Up next

- TODO: A book I have been meaning to read
- TODO: An article worth revisiting
- TODO: Documentation for something I want to learn

## Takeaways

Write one useful idea from each item so it is easy to find later.`,
		tagsIds: ["template-personal"],
	},
];
