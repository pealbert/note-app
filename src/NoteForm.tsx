import { type SubmitEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import type { NoteData, Tag } from "./App";

type NoteFormProps = {
	onSubmit: (data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
};

export function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps) {
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
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
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control ref={titleRef} required />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<CreatableReactSelect
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
					<Form.Control as="textarea" ref={markdownRef} required rows={15} />
				</Form.Group>
				<Stack className="justify-content-end" direction="horizontal" gap={2}>
					<Button type="submit" variant="primary">
						Save
					</Button>
					<Link to="..">
						<Button type="button" variant="outline-secondary">
							Cancel
						</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	);
}
