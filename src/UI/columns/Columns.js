import styles from "./Columns.module.css";
import useSocketStore from "../../store/socketStore";

export const SnowboardCol = [
	{
		key: "_id",
		title: "#",
		textAlign: "center",
		render: (record, index) => {
			return (
				<div className={styles.rankingContainer}>
					<div className={styles.ranking}>
						<div className={styles.index}>{index + 1}.</div>
						<div className={styles.flag}>
							<img
								className="flag"
								alt="country-flag"
								src={`flags/${record.organization}.png`}
							/>
						</div>
					</div>
				</div>
			);
		},
	},
	{
		key: "athlete",
		title: "Athlete",
		textAlign: "start",
		render: (record, index) => {
			return <AthleteCell record={record} index={index} />;
		},
	},

	{
		key: "run1",
		title: "Run1",
		textAlign: "center",

		render: (record) => {
			return <>-</>;
		},
	},
	{
		key: "run2",
		title: "Run2",
		textAlign: "center",
		render: (record) => {
			return <>-</>;
		},
	},
	{
		key: "run3",
		title: "Run3",
		textAlign: "center",
		render: (record) => {
			return <>-</>;
		},
	},
	{
		key: "score",
		title: "Score",
		textAlign: "center",

		render: (record) => {
			return <>-</>;
		},
	},
];

export const BiathlonCol = [
	{
		key: "_id",
		title: "#",
		textAlign: "center",
		render: (record, index) => {
			return (
				<div className={styles.rankingContainer}>
					<div className={styles.ranking}>
						<div className={styles.index}> {index + 1}.</div>
						<div className={styles.flag}>
							<img
								className="flag"
								alt="country-flag"
								src={`flags/${record.organisation}.png`}
							/>
						</div>
					</div>
				</div>
			);
		},
	},

	{
		key: "description",
		title: "Description",
		textAlign: "start",
		render: (record, index) => {
			return <AthleteCell record={record} index={index} />;
		},
	},

	{
		key: "shooting",
		title: "Shooting",
		textAlign: "center",

		render: (record) => {
			return <>-</>;
		},
	},
	{
		key: "time",
		title: "Time",
		textAlign: "center",

		render: (record) => {
			return <>-</>;
		},
	},
	{
		key: "difference",
		title: "Diff.",
		textAlign: "center",

		render: (record) => {
			return <>-</>;
		},
	},
];

const AthleteCell = ({ record, index }) => {
	const { data } = useSocketStore();
	const athleteIndex = data?.indexOf({ code: record.code });
	console.log("athleteIndex ****888", athleteIndex, index);

	return (
		<>
			<div className={styles.nameContainer}>
				<div className={styles.country}>({record.country})</div>
				<div className={styles.name}>{record.name}</div>
				<div> + </div>
			</div>
		</>
	);
};
