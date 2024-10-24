export default class FormatData {
	static formatDate = (date) => {
		const validateDate = new Date(date);
		const options = {
			day: "numeric",
			month: "numeric",
			year: "numeric",
			separator: ".",
		};
		return validateDate
			.toLocaleDateString("en-GB", options)
			.replace(/\//g, ".");
	};

	static formatTime = (props) => {
		const date = new Date(props);
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		return `${hours}:${minutes}`;
	};

	static formatDistance(code) {
		// Split the code by 'KM'
		const parts = code?.split("KM") || [];

		// If there's no 'KM' in the string, return null
		if (parts.length < 2) return null;

		// Take the part before 'KM' and remove any non-digit or non-dot characters from the end
		const distancePart = parts[0].replace(/[^\d.]+$/, "");

		// Find the last sequence of digits and optional dot
		const match = distancePart.match(/\d+(\.\d+)?$/);

		// If a match is found, return it as a number, otherwise return null
		return match ? parseFloat(match[0]) : null;
	}

	// Test the function
}
