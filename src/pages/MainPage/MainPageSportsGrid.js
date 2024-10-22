import Card from "../../components/Card/Card";
import styles from "./MainPageSportsGrid.module.css";
import useSocketStore from "../../store/socketStore";
function MainPageSportsGrid() {
	const { data } = useSocketStore();

	return (
		<div className={styles.container}>
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
			<Card />
		</div>
	);
}

export default MainPageSportsGrid;
