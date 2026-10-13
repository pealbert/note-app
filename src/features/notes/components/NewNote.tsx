import type { NoteData, Tag } from "../types";
import { NoteForm } from "./NoteForm";
import styles from "./NoteForm.module.css";

type NewNoteProps = {
	onSubmit: (data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
};

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
	return (
		<>
			<header className={styles.editorHeader}>
				<h1 className={styles.title}>New note</h1>
			</header>
			<NoteForm
				availableTags={availableTags}
				onAddTag={onAddTag}
				onSubmit={onSubmit}
			/>
		</>
	);
}
