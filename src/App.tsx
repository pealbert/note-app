import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { NewNote } from "./NewNote";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocalStorage } from "./useLocalStorage";

export type Note = {
	id: string;
} & NoteData;

export type RawNote = {
	id: string;
};

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
	const [_notes, _setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
	const [_tags, _setTags] = useLocalStorage<Tag[]>("TAGS", []);

	return (
		<Container className="my-4">
			<Routes>
				<Route element={<h1>Hi</h1>} path="/" />
				<Route element={<NewNote />} path="/new" />
				<Route path="/:id">
					<Route element={<h1>Show</h1>} index />
					<Route element={<h1>Edit</h1>} path="edit" />
				</Route>
				<Route element={<Navigate to="/" />} path="*" />
			</Routes>
		</Container>
	);
}

export default App;
