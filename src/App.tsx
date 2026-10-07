import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { NewNote } from "./NewNote";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
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
