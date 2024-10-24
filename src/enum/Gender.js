export const GenderEnum = {
	M: "Boys",
	W: "Girls",
	X: "Mix",
};

export const convertGender = (gender) => {
	return GenderEnum[gender] || gender;
};
