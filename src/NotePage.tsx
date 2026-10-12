import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import Markdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";

type NotePageProps = {
	onDelete: (id: string) => void;
};

export function NotePage({ onDelete }: NotePageProps) {
	const note = useNote();
	const navigate = useNavigate();

	return (
		<>
			<Row className="mb-4 align-items-center">
				<Col>
					<h1>{note.title}</h1>
					{note.tags.length > 0 && (
						<Stack className="flex-wrap" direction="horizontal" gap={1}>
							{note.tags.map((tag) => (
								<Badge className="text-truncate" key={tag.id}>
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Col>
				<Col xs="auto">
					<Stack direction="horizontal" gap={2}>
						<Link to={`/${note.id}/edit`}>
							<Button variant="primary">Edit</Button>
						</Link>
						<Button
							onClick={() => {
								onDelete(note.id);
								navigate("/");
							}}
							variant="outline-danger"
						>
							Delete
						</Button>
						<Link to="/">
							<Button variant="outline-secondary">Back</Button>
						</Link>
					</Stack>
				</Col>
			</Row>
			<Markdown>{note.markdown}</Markdown>
		</>
	);
}
