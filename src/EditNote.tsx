import type { NoteData, Tag } from "./App";
import { NoteForm } from "./NoteForm";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
	onSubmit: (id: string, data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
};

export function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
	const note = useNote();

	return (
		<>
			<h1 className="mb-4">Edit Note</h1>
			<NoteForm
				availableTags={availableTags}
				markdown={note.markdown}
				onAddTag={onAddTag}
				onSubmit={(data) => onSubmit(note.id, data)}
				tags={note.tags}
				title={note.title}
			/>
		</>
	);
}
