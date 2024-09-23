import React from "react";
import style from "./Bread.module.css";
import { BiathlonIcon, BreadArrow } from "../../UI/Icons";

const Bread = (prop) => {
	const extraBreadcrumbItems = prop.routes.map((row, index) => {
		const last = prop.routes.length === index + 1;
		return last ? (
			<span key={index} className={style.innerBreadcrumb}>
				{row.breadcrumbName}
			</span>
		) : (
			<span key={index} className={style.innerBreadcrumb}>
				<div>
					<BiathlonIcon />
				</div>
				<div>{row.breadcrumbName}</div>
				<span style={{ marginRight: 8 }}> {<BreadArrow />} </span>
			</span>
		);
	});

	return <div className={style.breadCrumb}>{extraBreadcrumbItems}</div>;
};
export default Bread;
