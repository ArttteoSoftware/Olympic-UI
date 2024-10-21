import { create } from "zustand";

const useSocketStore = create((set) => ({
	data: null,
	status: "Disconnected",
	setData: (newData) => set({ data: newData }),
	setStatus: (newStatus) => set({ status: newStatus }),
}));

export default useSocketStore;
