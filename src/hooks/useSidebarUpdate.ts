"use client";

import { useMediaQuery } from "react-responsive";
import { SidebarContentType, useSidebarState } from "../store/sidebar-store";

export const useSidebarUpdate = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return { isDesktop };
};
