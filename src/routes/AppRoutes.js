import { Route, Routes } from "react-router-dom";
import SportsGrid from "../pages/MainPage/MainPageSportsGrid";
import SportDetail from "../pages/SportDetailPage/SportDetail";
import { BiathlonCol, SnowboardCol } from "../UI/columns/Columns";
import { Gender, SnowboardStyles } from "../UI/FilterOptions/FilterOptions";
import { ColumnsWithSocketData } from "../UI/columns/Columns";
import { AlpineCol } from "../UI/columns/Columns";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<SportsGrid />} />
			<Route
				path="/snowboard"
				element={
					<SportDetail
						columns={SnowboardCol}
						title={"Snowboard"}
						filter={SnowboardStyles}
						color={"#3F78A3"}
						sportKey={"SNB"}
					/>
				}
			/>
			<Route
				path="/BTH"
				element={
					<SportDetail
						columns={BiathlonCol}
						title={"Biathlon"}
						filter={Gender}
						color={"#D64540"}
						sportKey={"BTH"}
					/>
				}
			/>

			<Route
				path="/ALP"
				element={
					<SportDetail
						columns={AlpineCol}
						title={"Alpine"}
						filter={Gender}
						color={"#D64540"}
						sportKey={"ALP"}
					/>
				}
			/>
		</Routes>
	);
};
