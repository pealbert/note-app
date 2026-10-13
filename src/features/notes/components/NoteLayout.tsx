import {
	Navigate,
	Outlet,
	useOutletContext,
	useParams,
} from "react-router-dom";
import type { Note } from "../types";

type NoteLayoutProps = {
	notes: Note[];
};

export function NoteLayout({ notes }: NoteLayoutProps) {
	const { id } = useParams();
	const note = notes.find((n) => n.id === id);

	if (note === undefined) return <Navigate replace to="/" />;

	return <Outlet context={note} />;
}

export function useNote() {
	return useOutletContext<Note>();
}
