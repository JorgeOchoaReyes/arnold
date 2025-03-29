import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware"; 

type CallResults = {
    id: string;
    summary: string;
}

interface DemoStore {
    numberOfCalls: number;
    incrementNumberOfCalls: () => void;
    latestCallId: string | null;
    setLatestCallId: (callId: string) => void;
    resultsOfLatestCall: CallResults | null;
    setResultsOfLatestCall: (results: CallResults) => void;
}

export const useDemoStore = create<DemoStore>()( 
  persist(
    (set) => ({
      numberOfCalls: 0, 
      incrementNumberOfCalls: () => set((state) => ({ numberOfCalls: state.numberOfCalls + 1 })),
      resultsOfLatestCall: null,
      setResultsOfLatestCall: (results) => set({ resultsOfLatestCall: results }),
      latestCallId: null,
      setLatestCallId: (callId) => set({ latestCallId: callId }),
    }),
    {
      name: "demo-storage", 
      storage: createJSONStorage(() => sessionStorage), 
    },
  ), 
);