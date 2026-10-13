import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { EditNote } from "../features/notes/components/EditNote";
import { NewNote } from "../features/notes/components/NewNote";
import { NoteLayout } from "../features/notes/components/NoteLayout";
import { NoteList } from "../features/notes/components/NoteList";
import { NotePage } from "../features/notes/components/NotePage";
import {
	templateNotes,
	templateTags,
} from "../features/notes/data/templateNotes";
import type { NoteData, RawNote, Tag } from "../features/notes/types";
import { useLocalStorage } from "../shared/hooks/useLocalStorage";

export default function App() {
	const [isFirstRun] = useState(() => {
		try {
			return localStorage.getItem("NOTES") === null;
		} catch {
			return true;
		}
	});
	const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", () =>
		isFirstRun ? templateNotes : [],
	);
	const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", () =>
		isFirstRun ? templateTags : [],
	);

	const notesWithTags = useMemo(
		() =>
			notes.map((note) => ({
				...note,
				tags: tags.filter((tag) => note.tagsIds.includes(tag.id)),
			})),
		[notes, tags],
	);

	function createNote({ tags: selectedTags, ...data }: NoteData) {
		setNotes((previousNotes) => [
			...previousNotes,
			{
				...data,
				id: uuidV4(),
				tagsIds: selectedTags.map((tag) => tag.id),
			},
		]);
	}

	function updateNote(id: string, { tags: selectedTags, ...data }: NoteData) {
		setNotes((previousNotes) =>
			previousNotes.map((note) =>
				note.id === id
					? {
							...note,
							...data,
							tagsIds: selectedTags.map((tag) => tag.id),
						}
					: note,
			),
		);
	}

	function deleteNote(id: string) {
		setNotes((previousNotes) => previousNotes.filter((note) => note.id !== id));
	}

	function addTag(tag: Tag) {
		setTags((previousTags) => [...previousTags, tag]);
	}

	function updateTag(id: string, label: string) {
		setTags((previousTags) =>
			previousTags.map((tag) => (tag.id === id ? { ...tag, label } : tag)),
		);
	}

	function deleteTag(id: string) {
		setTags((previousTags) => previousTags.filter((tag) => tag.id !== id));
		setNotes((previousNotes) =>
			previousNotes.map((note) => ({
				...note,
				tagsIds: note.tagsIds.filter((tagId) => tagId !== id),
			})),
		);
	}

	return (
		<Container className="app-shell">
			<Routes>
				<Route
					element={
						<NoteList
							availableTags={tags}
							notes={notesWithTags}
							onDeleteTag={deleteTag}
							onUpdateTag={updateTag}
						/>
					}
					path="/"
				/>
				<Route
					element={
						<NewNote
							availableTags={tags}
							onAddTag={addTag}
							onSubmit={createNote}
						/>
					}
					path="/new"
				/>
				<Route element={<NoteLayout notes={notesWithTags} />} path="/:id">
					<Route element={<NotePage onDelete={deleteNote} />} index />
					<Route
						element={
							<EditNote
								availableTags={tags}
								onAddTag={addTag}
								onSubmit={updateNote}
							/>
						}
						path="edit"
					/>
				</Route>
				<Route element={<Navigate replace to="/" />} path="*" />
			</Routes>
		</Container>
	);
}
