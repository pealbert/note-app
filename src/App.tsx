import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { NewNote } from "./NewNote";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { EditNote } from "./EditNote";
import { NoteLayout } from "./NoteLayout";
import { NoteList } from "./NoteList";
import { NotePage } from "./NotePage";
import { useLocalStorage } from "./useLocalStorage";

export type Note = {
	id: string;
} & NoteData;

export type RawNote = {
	id: string;
} & RawNoteData;

export type RawNoteData = {
	title: string;
	markdown: string;
	tagsIds: string[];
};
export type NoteData = {
	title: string;
	markdown: string;
	tags: Tag[];
};

export type Tag = {
	id: string;
	label: string;
};

function App() {
	const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
	const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

	const notesWithTags = useMemo(() => {
		return notes.map((note) => {
			return {
				...note,
				tags: tags.filter((tag) => note.tagsIds.includes(tag.id)),
			};
		});
	}, [notes, tags]);

	function onCreateNote({ tags, ...data }: NoteData) {
		setNotes((prevNotes) => {
			return [
				...prevNotes,
				{ ...data, id: uuidV4(), tagsIds: tags.map((tag) => tag.id) },
			];
		});
	}

	function onUpdateNote(id: string, { tags, ...data }: NoteData) {
		setNotes((prevNotes) => {
			return prevNotes.map((note) => {
				if (note.id === id) {
					return { ...note, ...data, tagsIds: tags.map((tag) => tag.id) };
				} else {
					return note;
				}
			});
		});
	}

	function onDeleteNote(id: string) {
		setNotes((prevNotes) => {
			return prevNotes.filter((note) => note.id !== id);
		});
	}

	function addTag(tag: Tag) {
		setTags((prev) => [...prev, tag]);
	}

	function updateTag(id: string, label: string) {
		setTags((prevTags) => {
			return prevTags.map((tag) => {
				if (tag.id === id) {
					return { ...tag, label };
				} else {
					return tag;
				}
			});
		});
	}

	function deleteTag(id: string) {
		setTags((prevTags) => {
			return prevTags.filter((tag) => tag.id !== id);
		});
	}

	return (
		<Container className="my-4">
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
							onSubmit={onCreateNote}
						/>
					}
					path="/new"
				/>
				<Route element={<NoteLayout notes={notesWithTags} />} path="/:id">
					<Route element={<NotePage onDelete={onDeleteNote} />} index />
					<Route
						element={
							<EditNote
								availableTags={tags}
								onAddTag={addTag}
								onSubmit={onUpdateNote}
							/>
						}
						path="edit"
					/>
				</Route>
				<Route element={<Navigate to="/" />} path="*" />
			</Routes>
		</Container>
	);
}

export default App;
