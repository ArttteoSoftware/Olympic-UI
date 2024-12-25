import "./App.css";
import Header from "./components/Header/Header";
import { useEffect } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import io from "socket.io-client";
import useSocketStore from "./store/socketStore";

function App() {
  const { setData, setStatus, setUnitCode, setSrtData, srtData } =
    useSocketStore();

  useEffect(() => {
    // Connect to the server
    const socket = io(process.env.REACT_APP_API_URL);

    setStatus("Connected");

    // Listen for specific events from the server
    socket.on("DT_RESULT", (newData) => {
      setData({
        sport_id: newData.unit_code.substring(0, 3),
        game_id: newData.unit_code,
        data: newData,
      });
      setUnitCode({ unitCode: newData.unit_code });
    });

    socket.on("streamMadePublic", (newData) => {
      console.log("SRTTT", newData);
      setSrtData({
        disciplineCode: newData.disciplineCode,
        streamUrl: newData.streamUrl,
      });
    });

    socket.on("streamRemovedFromPublic", (newData) => {
      setSrtData({
        disciplineCode: newData.disciplineCode,
        streamUrl: false,
      });
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
    <div className="outerContainer">
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
