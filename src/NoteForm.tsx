import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";

export function NoteForm() {
	return (
		<Form>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control required />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<CreatableReactSelect isMulti />
						</Form.Group>
					</Col>
				</Row>
				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control as="textarea" required rows={15} />
				</Form.Group>
				<Stack className="justify-content-end" direction="horizontal" gap={2}>
					<Button type="submit" variant="primary">
						Save
					</Button>
					<Button type="button" variant="outline-secondary">
						Cancel
					</Button>
				</Stack>
			</Stack>
		</Form>
	);
}
