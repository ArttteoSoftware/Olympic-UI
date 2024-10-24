import { create } from "zustand";

const useSocketStore = create((set) => ({
	dataState: {
		current: null,
		previous: null,
	},
	status: "Disconnected",
	setData: (newData) =>
		set((state) => ({
			dataState: {
				previous: state.dataState.current,
				current: newData.data,
			},
		})),
	setStatus: (newStatus) => set({ status: newStatus }),
}));

export default useSocketStore;
