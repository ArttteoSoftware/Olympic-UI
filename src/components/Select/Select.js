import { DropdownClosedIcon, DropdownOpenedIcon } from "../../UI/Icons";
import styles from "./Select.module.css";
import { useEffect, useRef, useState } from "react";

export default function Select(props) {
	const modalRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState(props.defaultValue);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSelect = (option) => {
		setSelected(option);
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				props.onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [props]);

	const filteredOptions = props.options.filter(
		(option) => option.value !== selected?.value
	);

	return (
		<div className={`${isOpen ? styles.dropdownOpen : styles.dropdown}`}>
			<div
				className={`${isOpen ? styles.openHeader : styles.header}`}
				onClick={toggleDropdown}
			>
				<div className={styles.selectedOptionContainer}>
					<div className={styles.selectedOption}>{selected?.label}</div>
				</div>
				<span className={styles.arrow}>
					{isOpen ? <DropdownClosedIcon /> : <DropdownOpenedIcon />}
				</span>
			</div>
			{isOpen && (
				<ul className={styles.optionList}>
					{filteredOptions.map((option) => (
						<li
							key={option.value}
							className={styles.option}
							onClick={() => handleSelect(option)}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
