import { create } from "zustand";

const useSocketStore = create((set) => ({
	dataState: {
		current: null,
		previous: null,
		item_name: null,
		result_status: null,
	},
	unitCode: null,
	status: "Disconnected",
	setData: (newData) => {
		console.log("SOCKET &&&", newData);

		set((state) => ({
			dataState: {
				previous: state.dataState.current,
				current: newData.data.results,
				item_name: newData.data.item_name,
				result_status: newData.data.result_status,
			},
		}));
	},
	setStatus: (newStatus) => set({ status: newStatus }),
	setUnitCode: (newUnitCode) => set({ unitCode: newUnitCode.unitCode }),
}));

export default useSocketStore;
