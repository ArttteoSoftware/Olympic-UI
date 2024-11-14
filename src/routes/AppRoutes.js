import { Route, Routes } from "react-router-dom";
import SportsGrid from "../pages/MainPage/MainPageSportsGrid";
import SportDetail from "../pages/SportDetailPage/SportDetail";
import {
	BiathlonCol,
	CrossCountryCol,
	FigureSkatingCol,
	SnowboardCol,
} from "../UI/columns/Columns";
import { Gender, SnowboardStyles } from "../UI/FilterOptions/FilterOptions";
import { AlpineCol, ShortTrackCol, FreestyleCol } from "../UI/columns/Columns";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<SportsGrid />} />

			<Route
				path="/BTH"
				element={
					<SportDetail
						columns={BiathlonCol()}
						title={"Biathlon"}
						color={"#D64540"}
						sportKey={"BTH"}
					/>
				}
			/>

			<Route
				path="/ALP"
				element={
					<SportDetail
						columns={AlpineCol()}
						title={"Alpine skiing"}
						color={"#D64540"}
						sportKey={"ALP"}
					/>
				}
			/>

			<Route
				path="/CCS"
				element={
					<SportDetail
						columns={CrossCountryCol()}
						title={"CROSS COUNTRY SKIING"}
						color={"#D64540"}
						sportKey={"CCS"}
					/>
				}
			/>

			<Route
				path="/FRS"
				element={
					<SportDetail
						columns={FreestyleCol()}
						title={"Freestyle skiing"}
						color={"#D64540"}
						sportKey={"FRS"}
					/>
				}
			/>

			<Route
				path="/FSK"
				element={
					<SportDetail
						columns={FigureSkatingCol()}
						title={"Figure Skating"}
						color={"#D64540"}
						sportKey={"FSK"}
					/>
				}
			/>

			<Route
				path="/IHO"
				element={
					<SportDetail
						columns={AlpineCol()}
						title={"Alpine"}
						color={"#D64540"}
						sportKey={"IHO"}
					/>
				}
			/>

			<Route
				path="/SBD"
				element={
					<SportDetail
						columns={SnowboardCol()}
						title={"SNOWBOARD"}
						color={"#D64540"}
						sportKey={"SBD"}
					/>
				}
			/>

			<Route
				path="/STK"
				element={
					<SportDetail
						columns={ShortTrackCol()}
						title={"Short Track"}
						color={"#D64540"}
						sportKey={"STK"}
					/>
				}
			/>
		</Routes>
	);
};
