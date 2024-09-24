import "./App.css";
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
	return (
		<div>
			<img
				className="background"
				alt="background"
				src="assets/background/background.png"
			/>
			<Header />
			<AppRoutes />
		</div>
	);
}

export default App;
