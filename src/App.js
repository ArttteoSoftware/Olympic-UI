import "./App.css";
import Header from "./components/Header/Header";
import { useEffect } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import io from "socket.io-client";
import useSocketStore from "./store/socketStore";
function App() {
	const { setData, setStatus, data } = useSocketStore();

	useEffect(() => {
		// Connect to the server
		const socket = io(process.env.REACT_APP_API_URL);

		setStatus("Connected");

		// Listen for specific events from the server
		socket.on("DT_RESULT", (newData) => {
			console.log("Data received from server:", newData);
			setData(newData.results);
		});

		// Handle server connection error
		socket.on("connect_error", (err) => {
			console.error("Connection error:", err);
			setStatus("Connection error");
		});

		// Clean up the socket connection when the component is unmounted
		return () => {
			socket.disconnect();
			setStatus("Disconnected");
		};
	}, []);

	console.log("socketData", data);

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
