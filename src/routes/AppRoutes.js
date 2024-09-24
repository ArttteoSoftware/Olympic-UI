import { Route, Routes } from "react-router-dom";
import SportsGrid from "../pages/MainPage/SportsGrid";
import SportDetail from "../pages/SportDetailPage/SportDetail";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<SportsGrid />} />
			<Route path="/sports" element={<SportDetail />} />
		</Routes>
	);
};
