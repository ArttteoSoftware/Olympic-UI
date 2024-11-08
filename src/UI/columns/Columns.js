import styles from "./Columns.module.css";
import useSocketStore from "../../store/socketStore";
import { RankingUp, RankingDown } from "../Icons";
import { getFlag } from "../flags";

export const SnowboardCol = [
	{
		key: "_id",
		title: "#",
		width: 60,
		textAlign: "center",
		render: (record, index, result_status) => {
			return (
				<AthleteRanking
					record={record}
					index={index}
					result_status={result_status}
				/>
			);
		},
	},
	{
		key: "athlete",
		title: "Athlete",
		width: 120,
		textAlign: "start",
		render: (record, index) => {
			return <AthleteCell record={record} index={index} />;
		},
	},

	{
		key: "run1",
		title: "Run1",
		textAlign: "end",
		// width: 50,

		render: (record) => {
			return <>-</>;
		},
	},
	{
		key: "run2",
		title: "Run2",
		textAlign: "end",
		// width: 50,
		render: (record) => {
			return <>-</>;
		},
	},
	{
		key: "run3",
		title: "Run3",
		textAlign: "end",
		// width: 50,

		render: (record) => {
			return <>-</>;
		},
	},
	{
		key: "score",
		title: "Score",
		textAlign: "end",
		// width: 50,
		render: (record) => {
			return <>-</>;
		},
	},
];

export const BiathlonCol = [
	{
		key: "_id",
		title: "#",
		width: 60,
		textAlign: "center",
		render: (record, index, result_status) => {
			return (
				<AthleteRanking
					record={record}
					index={index}
					result_status={result_status}
				/>
			);
		},
	},

	{
		key: "description",
		title: "Description",
		textAlign: "start",
		width: 120,
		render: (record, index) => {
			return <AthleteCell record={record} index={index} />;
		},
	},

	{
		key: "shooting",
		title: "Shooting",
		textAlign: "end",
		windth: 100,
		render: (record) => {
			return <>{record?.shootingResults?.value || "-"}</>;
		},
	},
	{
		key: "time",
		title: "Time",
		textAlign: "end",
		windth: 50,

		render: (record) => {
			return <>{record?.intermediates?.value ?? "-"}</>;
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

export const HistoryCol = (title) => [
	{
		key: "_id",
		title: "#",
		textAlign: "center",
		width: 60,
		render: (record, index, result_status) => {
			return (
				<AthleteRanking
					record={record}
					index={index}
					result_status={result_status}
					isHistory={true}
				/>
			);
		},
	},

	{
		key: "description",
		title: title,
		textAlign: "start",
		render: (record, index) => {
			return <>Final Standing</>;
		},
	},

	{
		key: "shooting",
		title: "Shooting",
		textAlign: "end",
		render: (record) => {
			return <>{record?.shootingResults?.value || "-"}</>;
		},
	},
	{
		key: "time",
		title: "Time",
		textAlign: "end",
		render: (record) => {
			return <>{record?.intermediates?.value ?? "-"}</>;
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

export const AlpineCol = [
	{
		key: "_id",
		title: "#",
		textAlign: "center",
		width: 60,
		render: (record, index, result_status) => {
			return (
				<AthleteRanking
					record={record}
					index={index}
					result_status={result_status}
				/>
			);
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
		textAlign: "end",
		windth: 50,
		render: (record) => {
			return <>{record?.shootingResults?.value || "-"}</>;
		},
	},
	{
		key: "run2",
		title: "Run2",
		textAlign: "end",
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
		width: 60,
		render: (record, index) => {
			// return <AthleteRanking record={record} index={index} />;
			return "";
		},
	},

	{
		key: "bib",
		title: "Bib",
		textAlign: "center",
		width: 50,
		render: (record, index) => {
			// return <>{record?.athlete?.bib}</>;
			return "";
		},
	},

	{
		key: "name",
		title: "Name",
		textAlign: "start",
		// width: 100,
		render: (record, index) => {
			// return <AthleteCell record={record} index={index} showCou />;
			return "";
		},
	},

	{
		key: "lap/9",
		title: "Lap/9",
		textAlign: "center",
		windth: 50,
		render: (record) => {
			// return <>{record?.intermediates?.pos || "-"}</>;
			return "";
		},
	},
	{
		key: "lap_sec",
		title: "Lap Sec.",
		textAlign: "center",
		windth: 50,

		render: (record) => {
			// return <>{record?.intermediates?.value2 ?? "-"}</>;
			return "";
		},
	},
	{
		key: "total",
		title: "Total",
		textAlign: "end",

		render: (record) => {
			// return <>{record?.intermediates?.value ?? "-"}</>;
			return "";
		},
	},
];

export const CrossCountryCol = [
	{
		key: "_id",
		title: "#",
		textAlign: "center",
		width: 60,
		render: (record, index, result_status) => {
			return (
				<AthleteRanking
					record={record}
					index={index}
					result_status={result_status}
				/>
			);
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
		textAlign: "end",
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
		width: 60,
		render: (record, index, result_status) => {
			return (
				<AthleteRanking
					record={record}
					index={index}
					result_status={result_status}
				/>
			);
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
			return <AthleteCell record={record} index={index} />;
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

	// TODO: CHECK IF BIB IS ALWAYS UNIQUE FOR SAME PLAYERS IN DIFFERENT GAME

	const oldIndex = dataState.previous?.findIndex(
		(item) =>
			item.athlete?.code === record.athlete?.code &&
			item.athlete?.bib === record.athlete?.bib
	);

	const newIndex = dataState.current?.findIndex(
		(item) =>
			item.athlete?.code === record.athlete?.code &&
			item.athlete?.bib === record.athlete?.bib
	);

	const indx = oldIndex - newIndex;

	// Logic to modify the athlete's name only if it contains a hyphen
	let modifiedName = record.athlete?.name;
	if (modifiedName && modifiedName.includes("-")) {
		const lastname = modifiedName.split(". ");
		const firstName = lastname[0];
		const parts = lastname[lastname.length - 1];

		const newName = parts.split("-");

		modifiedName = `${firstName}. ${newName[0].charAt(0)}-${newName[1]}`;
	}

	return (
		<>
			<div className={styles.nameContainer}>
				{showCountry && (
					<div className={styles.country}>({record.athlete?.organisation})</div>
				)}
				<div className={styles.name}>{modifiedName}</div>
				<div>
					{indx > 0 && <RankingUp />}
					{indx < 0 && <RankingDown />}
				</div>
			</div>
		</>
	);
};

const AthleteRanking = ({ record, index, result_status, isHistory }) => {
	const getRanking = (index) => {
		switch (index) {
			case 0:
				return styles.first_place;
			case 1:
				return styles.second_place;
			case 2:
				return styles.third_place;

			default:
				return styles.ranking;
		}
	};

	console.log(result_status);

	if (
		result_status === "UNCONFIRMED" ||
		result_status === "UNOFFICIAL" ||
		result_status === "OFFICIAL"
	) {
		return (
			<div className={styles.rankingContainer}>
				<div
					className={
						isHistory
							? getRanking(record.intermediates.rank - 1)
							: getRanking(index)
					}
				>
					<div className={styles.index}>
						{isHistory ? record.intermediates.rank : index + 1}.
					</div>
					<img
						className="flag"
						src={getFlag(record.athlete.organisation)}
						alt="flag"
						onError={(e) => (e.target.src = "flags/ESP.svg")}
					/>
				</div>
			</div>
		);
	} else {
		return (
			<div className={styles.rankingContainer}>
				<div className={styles.ranking}>
					<div className={styles.index}>{index + 1}.</div>
					<img
						className="flag"
						src={getFlag(record.athlete.organisation)}
						alt="flag"
						onError={(e) => (e.target.src = "flags/ESP.svg")}
					/>
				</div>
			</div>
		);
	}
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
			return ShortTrackCol;
		case "IHO":
			return ShortTrackCol;
		case "FSK":
			return ShortTrackCol;
		case "STK":
			return ShortTrackCol;

		default:
			return [];
	}
};
