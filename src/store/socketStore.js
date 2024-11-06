import { create } from "zustand";

const useSocketStore = create((set) => ({
	dataState: {
		current: null,
		previous: null,
		item_name: null,
	},
	unitCode: null,
	status: "Disconnected",
	setData: (newData) => {
		set((state) => ({
			dataState: {
				previous: state.dataState.current,
				current: newData.data.results,
				item_name: newData.data.item_name,
			},
		}));
	},
	setStatus: (newStatus) => set({ status: newStatus }),
	setUnitCode: (newUnitCode) => set({ unitCode: newUnitCode.unitCode }),
}));

export default useSocketStore;
