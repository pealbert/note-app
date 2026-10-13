export type Tag = {
	id: string;
	label: string;
};

export type NoteData = {
	title: string;
	markdown: string;
	tags: Tag[];
};

export type Note = NoteData & {
	id: string;
};

export type RawNoteData = {
	title: string;
	markdown: string;
	tagsIds: string[];
};

export type RawNote = RawNoteData & {
	id: string;
};
