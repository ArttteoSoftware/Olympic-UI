import { DropdownClosedIcon, DropdownOpenedIcon } from "../../UI/Icons";
import styles from "./Select.module.css";
import { useEffect, useRef, useState } from "react";

export default function Select({
  onSelect,
  state,
  defaultValue,
  options,
  onClick,
  onClose,
}) {
  const modalRef = useRef(null);
  const [selected, setSelected] = useState(defaultValue);

  const handleSelect = (option) => {
    setSelected(option);
    onClose();
    onSelect(option);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const filteredOptions = [defaultValue, ...options].filter(
    (option) => option.item_name !== selected?.unit_code
  );

  return (
    <div
      ref={modalRef}
      className={`${state ? styles.dropdownOpen : styles.dropdown}`}
    >
      <div
        className={`${state ? styles.openHeader : styles.header}`}
        onClick={() => onClick()}
      >
        <div className={styles.selectedOptionContainer}>
          <div className={styles.selectedOption}>{selected?.item_name}</div>
        </div>
        <span className={styles.arrow}>
          {state ? <DropdownOpenedIcon /> : <DropdownClosedIcon />}
        </span>
      </div>
      {state && (
        <ul className={styles.optionList}>
          {filteredOptions.map((option) => (
            <li
              key={option.unit_code}
              className={styles.option}
              onClick={() => handleSelect(option)}
            >
              {option.item_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
