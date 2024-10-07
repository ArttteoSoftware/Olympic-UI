import "./App.css";
import Card from "./components/DetailsCard/DetailsCard";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import io from "socket.io-client";

function App() {
	const [data, setData] = useState();
	const [status, setStatus] = useState("Disconnected");
	// useEffect(() => {
	// 	// Connect to the server
	// 	const socket = io(process.env.SOCKET_SERVER_URL);

	// 	setStatus("Connected");

	// 	// Listen for specific events from the server
	// 	socket.on("updateData", (newData) => {
	// 		console.log("Data received from server:", newData);
	// 		setData(newData);
	// 	});

	// 	// Handle server connection error
	// 	socket.on("connect_error", (err) => {
	// 		console.error("Connection error:", err);
	// 		setStatus("Connection error");
	// 	});

	// 	// Clean up the socket connection when the component is unmounted
	// 	return () => {
	// 		socket.disconnect();
	// 		setStatus("Disconnected");
	// 	};
	// }, []);

	const handleClientAction = () => {
		// Create a new socket connection to send a message
		const socket = io(process.env.SOCKET_SERVER_URL);

		// Send an action or message to the server (custom event)
		socket.emit("clientAction", {
			action: "DO_SOMETHING",
			timestamp: Date.now(),
		});

		console.log("Action sent to the server");
	};
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
