import { create } from "zustand";

type AppStore = {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: string;
  setSelectedAppId: (selectedAppId: string | null) => void;
  setSelectedNodeId: (selectedNodeId: string | null) => void;
  setMobilePanelOpen: (isMobilePanelOpen: boolean) => void;
  setActiveInspectorTab: (activeInspectorTab: string) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: "config",
  setSelectedAppId: (selectedAppId) =>
    set({ selectedAppId, selectedNodeId: null, isMobilePanelOpen: false }),
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
  setMobilePanelOpen: (isMobilePanelOpen) => set({ isMobilePanelOpen }),
  setActiveInspectorTab: (activeInspectorTab) => set({ activeInspectorTab }),
}));
