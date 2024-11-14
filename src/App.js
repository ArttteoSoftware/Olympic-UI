import "./App.css";
import Header from "./components/Header/Header";
import { useEffect } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import io from "socket.io-client";
import useSocketStore from "./store/socketStore";
function App() {
	const { setData, setStatus, setUnitCode } = useSocketStore();

	useEffect(() => {
		// Connect to the server
		const socket = io(process.env.REACT_APP_API_URL);

		setStatus("Connected");

		// Listen for specific events from the server
		socket.on("DT_RESULT", (newData) => {
			setData({ data: newData });
			setUnitCode({ unitCode: newData.unit_code });
		});

		// Handle server connection error
		socket.on("connect_error", (err) => {
			setStatus("Connection error");
		});

		// Clean up the socket connection when the component is unmounted
		return () => {
			socket.disconnect();
			setStatus("Disconnected");
		};
	}, [setData, setStatus, setUnitCode]);

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
