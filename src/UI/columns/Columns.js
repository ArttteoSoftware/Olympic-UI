import styles from "./Columns.module.css";
import useSocketStore from "../../store/socketStore";
import { RankingUp, RankingDown } from "../Icons";
import { getFlag } from "../flags";

export const SnowboardCol = [
	{
		key: "_id",
		title: "#",
		textAlign: "center",
		render: (record) => {
			return (
				<div className={styles.rankingContainer}>
					<div className={styles.ranking}>
						<div className={styles.index}>
							{record.result?.intermediates.rank}.
						</div>
						<div className={styles.flag}>
							{getFlag(record.athlete?.organisation)}
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
		width: 50,
		render: (record, index) => {
			return <AthleteRanking record={record} index={index} />;
		},
	},

	{
		key: "description",
		title: "Description",
		textAlign: "start",
		width: 150,
		render: (record, index) => {
			return <AthleteCell record={record} index={index} showCou />;
		},
	},

	{
		key: "shooting",
		title: "Shooting",
		textAlign: "center",
		windth: 50,

		render: (record) => {
			return <>{record?.shootingResults?.value || "-"}</>;
		},
	},
	{
		key: "time",
		title: "Time",
		textAlign: "center",
		windth: 50,

		render: (record) => {
			return <>{record?.intermediates?.value ?? "-"}</>;
		},
	},
	{
		key: "difference",
		title: "Diff.",
		textAlign: "center",

		render: (record) => {
			return <>{record?.intermediates?.diff ?? "-"}</>;
		},
	},
];

export const AlpineCol = [
	{
		key: "_id",
		title: "#",
		textAlign: "center",
		width: 50,
		render: (record, index) => {
			return <AthleteRanking record={record} index={index} />;
		},
	},

	{
		key: "bib",
		title: "Bib",
		textAlign: "center",
		width: 50,
		render: (record, index) => {
			return <>{record?.athlete?.bib}</>;
		},
	},

	{
		key: "name",
		title: "Name",
		textAlign: "start",
		width: 100,
		render: (record, index) => {
			return <AthleteCell record={record} index={index} showCou />;
		},
	},

	{
		key: "run1",
		title: "Run1",
		textAlign: "center",
		windth: 50,
		render: (record) => {
			return <>{record?.shootingResults?.value || "-"}</>;
		},
	},
	{
		key: "run2",
		title: "Run2",
		textAlign: "center",
		windth: 50,

		render: (record) => {
			return <>{record?.intermediates?.value ?? "-"}</>;
		},
	},
	{
		key: "total",
		title: "Total",
		textAlign: "end",

		render: (record) => {
			return <>{record?.intermediates?.diff ?? "-"}</>;
		},
	},
	{
		key: "difference",
		title: "Diff.",
		textAlign: "end",

		render: (record) => {
			return <>{record?.intermediates?.diff ?? "-"}</>;
		},
	},
];

export const ShortTrackCol = [
	{
		key: "_id",
		title: "#",
		textAlign: "center",
		width: 50,
		render: (record, index) => {
			return <AthleteRanking record={record} index={index} />;
		},
	},

	{
		key: "bib",
		title: "Bib",
		textAlign: "center",
		width: 50,
		render: (record, index) => {
			return <>{record?.athlete?.bib}</>;
		},
	},

	{
		key: "name",
		title: "Name",
		textAlign: "start",
		// width: 100,
		render: (record, index) => {
			return <AthleteCell record={record} index={index} showCou />;
		},
	},

	{
		key: "lap/9",
		title: "Lap/9",
		textAlign: "center",
		windth: 50,
		render: (record) => {
			return <>{record?.intermediates?.pos || "-"}</>;
		},
	},
	{
		key: "lap_sec",
		title: "Lap Sec.",
		textAlign: "center",
		windth: 50,

		render: (record) => {
			return <>{record?.intermediates?.value2 ?? "-"}</>;
		},
	},
	{
		key: "total",
		title: "Total",
		textAlign: "end",

		render: (record) => {
			return <>{record?.intermediates?.value ?? "-"}</>;
		},
	},
];

export const CrossCountryCol = [
	{
		key: "_id",
		title: "#",
		textAlign: "center",
		width: 50,
		render: (record, index) => {
			return <AthleteRanking record={record} index={index} />;
		},
	},

	{
		key: "bib",
		title: "Bib",
		textAlign: "center",
		width: 50,
		render: (record, index) => {
			return <>{record?.athlete?.bib}</>;
		},
	},

	{
		key: "name",
		title: "Name",
		textAlign: "start",
		width: 100,
		render: (record, index) => {
			return <AthleteCell record={record} index={index} showCou />;
		},
	},

	{
		key: "time",
		title: "Time",
		textAlign: "center",
		windth: 50,

		render: (record) => {
			return <>{record?.intermediates?.value ?? "-"}</>;
		},
	},
	{
		key: "diff",
		title: "Diff.",
		textAlign: "end",

		render: (record) => {
			return <>{record?.intermediates?.diff ?? "-"}</>;
		},
	},
];

export const FreestyleCol = [
	{
		key: "_id",
		title: "#",
		textAlign: "center",
		width: 50,
		render: (record, index) => {
			return <AthleteRanking record={record} index={index} />;
		},
	},

	{
		key: "bib",
		title: "Bib",
		textAlign: "center",
		width: 50,
		render: (record, index) => {
			return <>{record?.athlete?.bib}</>;
		},
	},

	{
		key: "name",
		title: "Name",
		textAlign: "start",
		width: 100,
		render: (record, index) => {
			return <AthleteCell record={record} index={index} showCou />;
		},
	},

	{
		key: "score",
		title: "Score",
		textAlign: "end",

		render: (record) => {
			return <>{record?.intermediates?.diff ?? "-"}</>;
		},
	},
];

const AthleteCell = ({ record, showCountry }) => {
	const { dataState } = useSocketStore();
	const oldIndex = dataState.previous?.findIndex(
		(item) => item.athlete?.code === record.athlete?.code
	);

	const newIndex = dataState.current?.findIndex(
		(item) => item.athlete?.code === record.athlete?.code
	);

	const indx = oldIndex - newIndex;
	return (
		<>
			<div className={styles.nameContainer}>
				{showCountry && (
					<div className={styles.country}>({record.athlete?.organisation})</div>
				)}
				<div className={styles.name}>{record.athlete?.name}</div>
				<div>
					{indx > 0 && <RankingUp />}
					{indx < 0 && <RankingDown />}
				</div>
			</div>
		</>
	);
};

const AthleteRanking = ({ record, index }) => {
	return (
		<div className={styles.rankingContainer}>
			<div className={styles.ranking}>
				<div className={styles.index}>{index + 1}.</div>
				<div className="flag">{getFlag(record.athlete?.organisation)}</div>
			</div>
		</div>
	);
};

export const returnSportColumn = (sportKey) => {
	switch (sportKey) {
		case "SBD":
			return SnowboardCol;
		case "ALP":
			return AlpineCol;
		case "BTH":
			return BiathlonCol;
		case "CCS":
			return CrossCountryCol;
		case "FRS":
			return FreestyleCol;
		case "IHO":
			return AlpineCol;
		case "STK":
			return ShortTrackCol;

		default:
			return [];
	}
};
