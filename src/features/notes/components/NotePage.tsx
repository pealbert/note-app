import { Badge, Button, Stack } from "react-bootstrap";
import Markdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import styles from "./NotePage.module.css";

type NotePageProps = {
	onDelete: (id: string) => void;
};

export function NotePage({ onDelete }: NotePageProps) {
	const note = useNote();
	const navigate = useNavigate();

	return (
		<div className={styles.page}>
			<Link className={styles.backLink} to="/">
				&larr; All notes
			</Link>
			<header className={styles.header}>
				<div>
					<h1 className={styles.title}>{note.title}</h1>
					{note.tags.length > 0 && (
						<Stack className="flex-wrap" direction="horizontal" gap={1}>
							{note.tags.map((tag) => (
								<Badge className={`${styles.tag} text-truncate`} key={tag.id}>
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</div>
				<Stack className={styles.actions} direction="horizontal" gap={2}>
					<Button as={Link} to={`/${note.id}/edit`} variant="primary">
						Edit
					</Button>
					<Button
						onClick={() => {
							onDelete(note.id);
							navigate("/");
						}}
						variant="outline-danger"
					>
						Delete
					</Button>
				</Stack>
			</header>
			<article className={styles.markdown}>
				<Markdown>{note.markdown}</Markdown>
			</article>
		</div>
	);
}
