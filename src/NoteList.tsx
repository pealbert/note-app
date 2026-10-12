import { useMemo, useState } from "react";
import {
	Badge,
	Button,
	Card,
	Col,
	Form,
	Modal,
	Row,
	Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import type { Note, Tag } from "./App";
import styles from "./NoteList.module.css";

type NoteListProps = {
	availableTags: Tag[];
	notes: Note[];
	onUpdateTag: (id: string, label: string) => void;
	onDeleteTag: (id: string) => void;
};

type SimplifiedNote = {
	tags: Tag[];
	title: string;
	id: string;
};

type EditTagsModalProps = {
	show: boolean;
	availableTags: Tag[];
	handleClose: () => void;
	onUpdate: (id: string, label: string) => void;
	onDelete: (id: string) => void;
};

export function NoteList({
	availableTags,
	notes,
	onUpdateTag,
	onDeleteTag,
}: NoteListProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [title, setTitle] = useState("");
	const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

	const filteredNotes = useMemo(() => {
		return notes.filter((note) => {
			return (
				(title === "" ||
					note.title.toLowerCase().includes(title.toLowerCase())) &&
				(selectedTags.length === 0 ||
					selectedTags.every((tag) =>
						note.tags.some((noteTag) => noteTag.id === tag.id),
					))
			);
		});
	}, [title, selectedTags, notes]);

	return (
		<>
			<Row className="mb-4 align-items-center">
				<Col>
					<h1>Notes</h1>
				</Col>
				<Col xs="auto">
					<Stack direction="horizontal" gap={2}>
						<Link to="/new">
							<Button variant="primary">Create</Button>
						</Link>
						<Button
							onClick={() => setEditTagsModalIsOpen(true)}
							variant="outline-secondary"
						>
							Edit Tags
						</Button>
					</Stack>
				</Col>
			</Row>
			<Form>
				<Row className="mb-4">
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								onChange={(e) => setTitle(e.target.value)}
								type="text"
								value={title}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<ReactSelect
								isMulti
								onChange={(tags) => {
									setSelectedTags(
										tags.map((tag) => {
											return {
												label: tag.label,
												id: tag.value,
											};
										}),
									);
								}}
								options={availableTags.map((tag) => {
									return { label: tag.label, value: tag.id };
								})}
								value={selectedTags.map((tag) => {
									return { label: tag.label, value: tag.id };
								})}
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>
			<Row className="g-3" lg={3} sm={2} xl={4} xs={1}>
				{filteredNotes.map((note) => (
					<Col key={note.id}>
						<NoteCard id={note.id} tags={note.tags} title={note.title} />
					</Col>
				))}
			</Row>
			<EditTagsModal
				availableTags={availableTags}
				handleClose={() => setEditTagsModalIsOpen(false)}
				onDelete={onDeleteTag}
				onUpdate={onUpdateTag}
				show={editTagsModalIsOpen}
			/>
		</>
	);
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
	return (
		<Card
			as={Link}
			className={`h-100 text-decoration-none text-reset ${styles.card}`}
			to={`/${id}`}
		>
			<Card.Body>
				<Stack
					className="justify-content-center h-100 align-items-center"
					gap={2}
				>
					<span className="fs-5">{title}</span>
					{tags.length > 0 && (
						<Stack
							className="justify-content-center flex-wrap"
							direction="horizontal"
							gap={1}
						>
							{tags.map((tag) => (
								<Badge className="text-truncate" key={tag.id}>
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Stack>
			</Card.Body>
		</Card>
	);
}

function EditTagsModal({
	availableTags,
	handleClose,
	show,
	onUpdate,
	onDelete,
}: EditTagsModalProps) {
	return (
		<Modal onHide={handleClose} show={show}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Tags</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Stack gap={2}>
						{availableTags.map((tag) => (
							<Row key={tag.id}>
								<Col>
									<Form.Control
										onChange={(e) => onUpdate(tag.id, e.target.value)}
										type="text"
										value={tag.label}
									/>
								</Col>
								<Col xs="auto">
									<Button
										onClick={() => onDelete(tag.id)}
										variant="outline-danger"
									>
										&times;
									</Button>
								</Col>
							</Row>
						))}
					</Stack>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
