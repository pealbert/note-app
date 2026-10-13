import type { NoteData, Tag } from "../types";
import { NoteForm } from "./NoteForm";
import styles from "./NoteForm.module.css";
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
			<header className={styles.editorHeader}>
				<h1 className={styles.title}>Edit note</h1>
			</header>
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
