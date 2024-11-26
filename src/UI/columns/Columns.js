import styles from "./Columns.module.css";
import useSocketStore from "../../store/socketStore";
import { RankingUp, RankingDown } from "../Icons";
import { getFlag } from "../flags";
import { useReducer } from "react";

export const SnowboardCol = (title) => [
	{
		key: "_id",
		title: "#",
		width: 60,
		textAlign: "center",
		render: (record, index, result_status, livescoring, athlete) => {
			if (athlete) {
				return (
					<AthleteRanking
						record={{ ...record, athlete }}
						index={index}
						result_status={result_status}
						isHistory={Boolean(title)}
					/>
				);
			} else {
				return (
					<AthleteRanking
						record={record}
						index={index}
						result_status={result_status}
						isHistory={Boolean(title)}
					/>
				);
			}
		},
	},
	{
		key: "athlete",
		title: title ? title : "Athlete",
		width: 120,
		textAlign: "start",
		render: (record, index, result_status, livescoring) => {
			if (title) {
				if (
					result_status === "OFFICIAL" ||
					result_status === "UNCONFIRMED" ||
					result_status === "UNOFFICIAL"
				) {
					return "Final Standing";
				} else {
					return "Current Standing";
				}
			}
			return (
				<AthleteCell record={record} index={index} livescoring={livescoring} />
			);
		},
	},

	{
		key: "run1",
		title: "Run1",
		textAlign: "center",
		// width: 50,

		render: (record) => {
			if (record?.intermediates?.length > 0) {
				return <>{record?.intermediates[0]?.result || "-"}</>;
			} else {
				return "-";
			}
		},
	},
	{
		key: "run2",
		title: "Run2",
		textAlign: "center",
		// width: 50,
		render: (record) => {
			if (record?.intermediates?.length > 1) {
				return <>{record?.intermediates[1]?.result || "-"}</>;
			} else {
				return <>{"-"}</>;
			}
		},
	},
	{
		key: "run3",
		title: "Run3",
		textAlign: "center",
		// width: 50,

		render: (record) => {
			if (record?.intermediates?.length > 2) {
				return <>{record?.intermediates[2]?.result || "-"}</>;
			} else {
				return <>{"-"}</>;
			}
		},
	},
	{
		key: "score",
		title: "Score",
		textAlign: "center",
		// width: 50,
		render: (record) => {
			return <>{record.result}</>;
		},
	},
];

export const BiathlonCol = (title) => [
	{
		key: "_id",
		title: "#",
		width: 60,
		textAlign: "center",
		render: (record, index, result_status, livescoring, athlete) => {
			if (athlete) {
				return (
					<AthleteRanking
						record={{ ...record, athlete }}
						index={index}
						result_status={result_status}
						isHistory={Boolean(title)}
					/>
				);
			} else {
				return (
					<AthleteRanking
						record={record}
						index={index}
						result_status={result_status}
						isHistory={Boolean(title)}
					/>
				);
			}
		},
	},

	{
		key: "name",
		title: title ? title : "Name",
		textAlign: "start",
		width: 150,
		render: (record, index, result_status, livescoring) => {
			if (title) {
				if (
					result_status === "OFFICIAL" ||
					result_status === "UNCONFIRMED" ||
					result_status === "UNOFFICIAL"
				) {
					return "Final Standing";
				} else {
					return "Current Standing";
				}
			}
			return (
				<AthleteCell record={record} index={index} livescoring={livescoring} />
			);
		},
	},

	{
		key: "shooting",
		title: "Shooting",
		textAlign: "center",
		windth: 100,
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

export const AlpineCol = (title) => [
	{
		key: "_id",
		title: "#",
		textAlign: "center",
		width: 60,
		render: (record, index, result_status, livescoring, athlete) => {
			if (athlete) {
				return (
					<AthleteRanking
						record={{ ...record, athlete }}
						index={index}
						result_status={result_status}
						isHistory={Boolean(title)}
					/>
				);
			} else {
				return (
					<AthleteRanking
						record={record}
						index={index}
						result_status={result_status}
						isHistory={Boolean(title)}
					/>
				);
			}
		},
	},

	{
		key: "bib",
		title: "Bib",
		textAlign: "center",
		width: 30,
		render: (record, index, result_status, livescoring, athlete) => {
			if (record?.athlete) {
				return <>{record?.athlete?.bib}</>;
			} else {
				return <>{athlete.bib}</>;
			}
		},
	},

	{
		key: "name",
		title: title ? title : "Name",
		textAlign: "start",
		width: 100,
		render: (record, index, result_status, livescoring) => {
			if (title) {
				if (
					result_status === "OFFICIAL" ||
					result_status === "UNCONFIRMED" ||
					result_status === "UNOFFICIAL"
				) {
					return "Final Standing";
				} else {
					return "Current Standing";
				}
			}
			return (
				<AthleteCell record={record} index={index} livescoring={livescoring} />
			);
		},
	},

	{
		key: "run1",
		title: "Run 1",
		textAlign: "center",
		// width: 50,
		render: (record) => {
			if (record.intermediates?.length > 0) {
				return <>{record.intermediates[0]?.time}</>;
			} else {
				return "-";
			}
		},
	},
	{
		key: "run2",
		title: "Run 2",
		textAlign: "center",
		// width: 50,
		render: (record) => {
			if (record.intermediates?.length > 1) {
				return <>{record.intermediates[1]?.time}</>;
			} else {
				return "-";
			}
		},
	},
	// {
	// 	key: "total",
	// 	title: "Total",
	// 	textAlign: "center",
	// 	// width: 50,
	// 	render: (record) => {
	// 		if (record.intermediates?.length > 0) {
	// 			return (
	// 				<>{record?.intermediates[record?.intermediates?.length - 1]?.diff}</>
	// 			);
	// 		} else {
	// 			return "-";
	// 		}
	// 	},
	// },
	{
		key: "difference",
		title: "Diff.",
		textAlign: "center",

		render: (record) => {
			if (record.intermediates?.length > 0) {
				return (
					<>{record?.intermediates[record?.intermediates?.length - 1]?.diff}</>
				);
			} else {
				return "-";
			}
		},
	},
];

export const ShortTrackCol = (title) => [
	{
		key: "_id",
		title: "#",
		textAlign: "center",
		width: 60,
		render: (record, index, result_status, livescoring, athlete) => {
			if (athlete) {
				return (
					<AthleteRanking
						record={{ ...record, athlete }}
						index={index}
						result_status={result_status}
						isHistory={Boolean(title)}
					/>
				);
			} else {
				return (
					<AthleteRanking
						record={record}
						index={index}
						result_status={result_status}
						isHistory={Boolean(title)}
					/>
				);
			}
		},
	},

	{
		key: "bib",
		title: "Bib",
		textAlign: "center",
		width: 50,
		render: (record, index, result_status, livescoring, athlete) => {
			if (record?.athlete) {
				return <>{record?.athlete?.bib}</>;
			} else {
				return <>{athlete.bib}</>;
			}
		},
	},

	{
		key: "name",
		title: title ?? "Name",
		textAlign: "start",
		// width: 100,
		render: (record, index, result_status, livescoring) => {
			if (title) {
				if (
					result_status === "OFFICIAL" ||
					result_status === "UNCONFIRMED" ||
					result_status === "UNOFFICIAL"
				) {
					return "Final Standing";
				} else {
					return "Current Standing";
				}
			}
			return (
				<AthleteCell record={record} index={index} livescoring={livescoring} />
			);
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
		textAlign: "center",

		render: (record) => {
			return <>{record?.intermediates?.value ?? "-"}</>;
		},
	},
];

export const FigureSkatingCol = (title) => [
	{
		key: "_id",
		title: "#",
		textAlign: "center",
		width: 60,
		render: (record, index, result_status, livescoring, athlete) => {
			if (athlete) {
				return (
					<AthleteRanking
						record={{ ...record, athlete }}
						index={index}
						result_status={result_status}
						isHistory={Boolean(title)}
					/>
				);
			} else {
				return (
					<AthleteRanking
						record={record}
						index={index}
						result_status={result_status}
						isHistory={Boolean(title)}
					/>
				);
			}
		},
	},

	{
		key: "name",
		title: title ?? "Name",
		textAlign: "start",
		width: 100,
		render: (record, index, result_status, livescoring) => {
			if (title) {
				if (
					result_status === "OFFICIAL" ||
					result_status === "UNCONFIRMED" ||
					result_status === "UNOFFICIAL"
				) {
					return "Final Standing";
				} else {
					return "Current Standing";
				}
			}
			return (
				<AthleteCell record={record} index={index} livescoring={livescoring} />
			);
		},
	},

	{
		key: "techel",
		title: "Tech El.",
		textAlign: "center",
		windth: 50,

		render: (record, index, result_status, livescoring, athlete) => {
			if (record?.athlete) {
				return <>{record?.athlete?.bib}</>;
			} else {
				return <>{athlete.bib}</>;
			}
		},
	},
	{
		key: "comps",
		title: "Comps",
		textAlign: "center",

		render: (record) => {
			return <>{record?.intermediates?.componentScore ?? "-"}</>;
		},
	},
	{
		key: "deduct",
		title: "Deduct.",
		textAlign: "center",

		render: (record) => {
			return <>{record?.intermediates?.deductions ?? "-"}</>;
		},
	},
	{
		key: "total",
		title: "Total",
		textAlign: "center",

		render: (record) => {
			return <>{record?.intermediates?.score ?? "-"}</>;
		},
	},
];
export const CrossCountryCol = (title) => [
	{
		key: "_id",
		title: "#",
		textAlign: "center",
		width: 60,
		render: (record, index, result_status, livescoring, athlete) => {
			if (athlete) {
				return (
					<AthleteRanking
						record={{ ...record, athlete }}
						index={index}
						result_status={result_status}
						isHistory={Boolean(title)}
					/>
				);
			} else {
				return (
					<AthleteRanking
						record={record}
						index={index}
						result_status={result_status}
						isHistory={Boolean(title)}
					/>
				);
			}
		},
	},

	{
		key: "bib",
		title: "Bib",
		textAlign: "center",
		width: 50,
		render: (record, index, result_status, livescoring, athlete) => {
			if (record?.athlete) {
				return <>{record?.athlete?.bib}</>;
			} else {
				return <>{athlete.bib}</>;
			}
		},
	},

	{
		key: "name",
		title: title ?? "Name",
		textAlign: "start",
		width: 100,
		render: (record, index, result_status, livescoring) => {
			if (title) {
				if (
					result_status === "OFFICIAL" ||
					result_status === "UNCONFIRMED" ||
					result_status === "UNOFFICIAL"
				) {
					return "Final Standing";
				} else {
					return "Current Standing";
				}
			}
			return (
				<AthleteCell record={record} index={index} livescoring={livescoring} />
			);
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
		textAlign: "center",

		render: (record) => {
			return <>{record?.intermediates?.diff ?? "-"}</>;
		},
	},
];

export const FreestyleCol = (title) => [
	{
		key: "_id",
		title: "#",
		textAlign: "center",
		width: 60,
		render: (record, index, result_status, livescoring, athlete) => {
			if (athlete) {
				return (
					<AthleteRanking
						record={{ ...record, athlete }}
						index={index}
						result_status={result_status}
						isHistory={Boolean(title)}
					/>
				);
			} else {
				return (
					<AthleteRanking
						record={record}
						index={index}
						result_status={result_status}
						isHistory={Boolean(title)}
					/>
				);
			}
		},
	},

	{
		key: "bib",
		title: "Bib",
		textAlign: "center",
		render: (record, index, result_status, livescoring, athlete) => {
			if (record?.athlete) {
				return <>{record?.athlete?.bib}</>;
			} else {
				return <>{athlete.bib}</>;
			}
		},
	},

	{
		key: "name",
		title: title ?? "Name",
		textAlign: "start",
		width: 90,
		render: (record, index, result_status, livescoring) => {
			if (title) {
				if (
					result_status === "OFFICIAL" ||
					result_status === "UNCONFIRMED" ||
					result_status === "UNOFFICIAL"
				) {
					return "Final Standing";
				} else {
					return "Current Standing";
				}
			}
			return (
				<AthleteCell record={record} index={index} livescoring={livescoring} />
			);
		},
	},

	{
		key: "run1",
		title: "Run 1",
		textAlign: "center",
		render: (record) => {
			if (record.runs?.length > 0) {
				return <>{record?.runs[0]?.result ?? "-"}</>;
			} else {
				return "-";
			}
		},
	},
	{
		key: "run2",
		title: "Run 2",
		textAlign: "center",
		render: (record) => {
			if (record.runs?.length > 0) {
				return <>{record?.runs[1]?.result ?? "-"}</>;
			} else {
				return "-";
			}
		},
	},
	{
		key: "run3",
		title: "Run 3",
		textAlign: "center",
		render: (record) => {
			if (record.runs?.length > 0) {
				return <>{record?.runs[2]?.result ?? "-"}</>;
			} else {
				return "-";
			}
		},
	},
	{
		key: "score",
		title: "Score",
		textAlign: "center",

		render: (record) => {
			return <>{record?.intermediates?.result ?? "-"}</>;
		},
	},
];

const AthleteCell = ({ record, showCountry, livescoring }) => {
	const { dataState } = useSocketStore();

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

	let modifiedName = record.athlete?.name;
	if (modifiedName && modifiedName.includes("-")) {
		const lastname = modifiedName.split(". ");
		const firstName = lastname[0];
		const parts = lastname[lastname.length - 1];

		const newName = parts.split("-");

		modifiedName = `${firstName}. ${newName[0].charAt(0)}-${newName[1]}`;
	}

	return (
		<div className={styles.nameContainer}>
			{showCountry && (
				<div className={styles.country}>({record.athlete?.organisation})</div>
			)}
			<div className={styles.name}>{modifiedName}</div>
			<div>
				{indx > 0 && <RankingUp className={styles.arrow} />}
				{indx < 0 && <RankingDown className={styles.arrow} />}
			</div>
		</div>
	);
};

const AthleteRanking = ({ record, index, result_status, isHistory }) => {
	console.log("RANKIG", record);
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

	console.log("FFFF", record.rank);
	if (result_status === "OFFICIAL") {
		return (
			<div className={styles.rankingContainer}>
				<div className={getRanking(record?.rank - 1)}>
					<div className={styles.index}>{record?.rank || index + 1}.</div>
				</div>
				<img
					className="flag"
					src={getFlag(record?.athlete?.organisation)}
					alt="flag"
					onError={(e) => (e.target.src = "flags/ESP.svg")}
				/>
			</div>
		);
	} else {
		return (
			<div className={styles.rankingContainer}>
				<div className={styles.ranking}>
					<div className={styles.index}>{record?.rank || "."}</div>
				</div>
				<img
					className="flag"
					src={getFlag(record.athlete?.organisation)}
					alt="flag"
					onError={(e) => (e.target.src = "flags/ESP.svg")}
				/>
			</div>
		);
	}
};

export const returnSportColumn = (sportKey, item_name) => {
	switch (sportKey) {
		case "SBD":
			return SnowboardCol(item_name);
		case "ALP":
			return AlpineCol(item_name);
		case "BTH":
			return BiathlonCol(item_name);
		case "CCS":
			return CrossCountryCol(item_name);
		case "FRS":
			return FreestyleCol(item_name);
		case "IHO":
			return [];
		case "FSK":
			return FigureSkatingCol(item_name);
		case "STK":
			return ShortTrackCol(item_name);
		default:
			return [];
	}
};
