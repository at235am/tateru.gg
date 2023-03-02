import { create } from "zustand";
import { persist } from "zustand/middleware";

export const VALID_SIDEBAR_CONTENT = ["search", "fav"] as const;

export type SidebarContentType = typeof VALID_SIDEBAR_CONTENT[number];

export type SidebarState = {
  contentIsOpen: boolean;
  setContentIsOpen: (value: boolean) => void;
  closeSidebar: () => void;

  contentType: SidebarContentType;
  setContentType: (value: SidebarContentType) => void;
};

export const useSidebarState = create<SidebarState>()((set) => ({
  contentIsOpen: true,
  setContentIsOpen: (value) => set((state) => ({ contentIsOpen: value })),
  closeSidebar: () => set((state) => ({ contentIsOpen: false })),
  contentType: "search",
  setContentType: (value) => set((state) => ({ contentType: value })),
}));
