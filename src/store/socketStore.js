import { create } from "zustand";

const useSocketStore = create((set) => ({
  dataState: {
    // Updated structure to hold multiple sports and games
    // Each sport_id will map to its own games object
    // Example: sport_id: { game_id: { current: null, previous: null, item_name: null, result_status: null } }
    // No need to define sport_id and game_id here; they will be used in setData
  },
  srtData: {},
  unitCode: null,
  status: "Disconnected",
  setData: (newData) => {
    const { sport_id, game_id, data } = newData;
    if (!sport_id || !game_id) return;
    set((state) => ({
      dataState: {
        ...state.dataState,
        [sport_id]: {
          [game_id]: {
            previous: state.dataState[sport_id]?.[game_id]?.current,
            current: data.results,
            item_name: data.item_name,
            result_status: data.result_status,
          },
        },
      },
    }));
  },

  setSrtData: (newData) => {
    const { disciplineCode, streamUrl } = newData;
    if (!disciplineCode) return;

    set((state) => ({
      srtData: {
        ...state.srtData,
        [disciplineCode]: streamUrl,
      },
    }));
  },
  setStatus: (newStatus) => set({ status: newStatus }),
  setUnitCode: (newUnitCode) => set({ unitCode: newUnitCode.unitCode }),
}));

export default useSocketStore;
