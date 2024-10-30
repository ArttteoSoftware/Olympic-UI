import { create } from "zustand";

const useSocketStore = create((set) => ({
	dataState: {
		current: null,
		previous: null,
	},
	unitCode: null,
	status: "Disconnected",
	setData: (newData) =>
		set((state) => ({
			dataState: {
				previous: state.dataState.current,
				current: newData.data,
			},
		})),
	setStatus: (newStatus) => set({ status: newStatus }),
	setUnitCode: (newUnitCode) => set({ unitCode: newUnitCode.unitCode }),
}));

export default useSocketStore;
