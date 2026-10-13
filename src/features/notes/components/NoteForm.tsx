import { type SubmitEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import type { NoteData, Tag } from "../types";
import styles from "./NoteForm.module.css";

type NoteFormProps = {
	onSubmit: (data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
} & Partial<NoteData>;

export function NoteForm({
	onSubmit,
	onAddTag,
	availableTags,
	title = "",
	markdown = "",
	tags = [],
}: NoteFormProps) {
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
	const navigate = useNavigate();

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		onSubmit({
			title: titleRef.current?.value ?? "",
			markdown: markdownRef.current?.value ?? "",
			tags: selectedTags,
		});

		navigate("..");
	}

	return (
		<Form className={styles.panel} onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row className="g-3">
					<Col md={6} xs={12}>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control defaultValue={title} ref={titleRef} required />
						</Form.Group>
					</Col>
					<Col md={6} xs={12}>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<CreatableReactSelect
								classNamePrefix="note-select"
								inputId="tags"
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
								onCreateOption={(label) => {
									const newTag = { id: uuidV4(), label };
									onAddTag(newTag);
									setSelectedTags((prev) => [...prev, newTag]);
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
				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control
						as="textarea"
						className={styles.body}
						defaultValue={markdown}
						placeholder="Write in Markdown..."
						ref={markdownRef}
						required
						rows={15}
					/>
				</Form.Group>
				<div className={styles.footer}>
					<Button type="submit" variant="primary">
						Save note
					</Button>
					<Button as={Link} to=".." variant="outline-secondary">
						Cancel
					</Button>
				</div>
			</Stack>
		</Form>
	);
}
