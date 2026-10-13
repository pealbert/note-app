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
import type { Note, Tag } from "../types";
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
	const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
	const [title, setTitle] = useState("");
	const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

	const filteredNotes = useMemo(() => {
		return notes.filter((note) => {
			return (
				(title === "" ||
					note.title.toLowerCase().includes(title.toLowerCase())) &&
				(selectedTagIds.length === 0 ||
					selectedTagIds.every((tagId) =>
						note.tags.some((noteTag) => noteTag.id === tagId),
					))
			);
		});
	}, [title, selectedTagIds, notes]);

	function deleteTag(id: string) {
		setSelectedTagIds((currentIds) =>
			currentIds.filter((tagId) => tagId !== id),
		);
		onDeleteTag(id);
	}

	return (
		<>
			<header className={styles.header}>
				<h1 className={styles.title}>Notes</h1>
				<Stack className={styles.actions} direction="horizontal" gap={2}>
					<Button as={Link} to="/new" variant="primary">
						New note
					</Button>
					<Button
						onClick={() => setEditTagsModalIsOpen(true)}
						variant="outline-secondary"
					>
						Tags
					</Button>
				</Stack>
			</header>
			<Form
				className={styles.filters}
				onSubmit={(event) => event.preventDefault()}
			>
				<Row className="g-3">
					<Col md={6} xs={12}>
						<Form.Group controlId="title">
							<Form.Label>Search notes</Form.Label>
							<Form.Control
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Search by title"
								type="text"
								value={title}
							/>
						</Form.Group>
					</Col>
					<Col md={6} xs={12}>
						<Form.Group controlId="tags">
							<Form.Label>Filter by tags</Form.Label>
							<ReactSelect
								classNamePrefix="note-select"
								inputId="tags"
								isMulti
								onChange={(tags) => {
									setSelectedTagIds(tags.map((tag) => tag.value));
								}}
								options={availableTags.map((tag) => {
									return { label: tag.label, value: tag.id };
								})}
								value={availableTags
									.filter((tag) => selectedTagIds.includes(tag.id))
									.map((tag) => ({ label: tag.label, value: tag.id }))}
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>
			{filteredNotes.length > 0 ? (
				<Row className="g-3" lg={3} sm={2} xs={1}>
					{filteredNotes.map((note) => (
						<Col key={note.id}>
							<NoteCard id={note.id} tags={note.tags} title={note.title} />
						</Col>
					))}
				</Row>
			) : (
				<div className={styles.emptyState}>
					<p className={styles.emptyTitle}>
						{notes.length === 0 ? "No notes yet" : "No matching notes"}
					</p>
					<p className={styles.emptyText}>
						{notes.length === 0
							? "Create your first note to start collecting ideas."
							: "Try a different title or remove a tag filter."}
					</p>
				</div>
			)}
			<EditTagsModal
				availableTags={availableTags}
				handleClose={() => setEditTagsModalIsOpen(false)}
				onDelete={deleteTag}
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
			<Card.Body className={styles.cardBody}>
				<span className={styles.cardTitle}>{title}</span>
				<div className={styles.tags}>
					{tags.map((tag) => (
						<Badge className={`${styles.tag} text-truncate`} key={tag.id}>
							{tag.label}
						</Badge>
					))}
				</div>
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
		<Modal centered onHide={handleClose} show={show}>
			<Modal.Header closeButton>
				<Modal.Title>Manage tags</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={(event) => event.preventDefault()}>
					<Stack gap={2}>
						{availableTags.length === 0 && (
							<p className={styles.tagListEmpty}>No tags to manage yet.</p>
						)}
						{availableTags.map((tag) => (
							<Row key={tag.id}>
								<Col>
									<Form.Control
										aria-label={`Rename ${tag.label} tag`}
										onChange={(e) => onUpdate(tag.id, e.target.value)}
										type="text"
										value={tag.label}
									/>
								</Col>
								<Col xs="auto">
									<Button
										aria-label={`Delete ${tag.label} tag`}
										onClick={() => onDelete(tag.id)}
										type="button"
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
			<Modal.Footer>
				<Button onClick={handleClose} variant="primary">
					Done
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
