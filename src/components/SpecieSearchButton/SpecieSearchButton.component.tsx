"use client";
import { Switch } from "@headlessui/react";
import {
  IconFileSearch,
  IconListSearch,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useSidebarUpdate } from "../../hooks/useSidebarUpdate";
import { useSidebarState } from "../../store/sidebar-store";
import { Portal } from "../Portal/Portal.component";

type SpecieSearchButtonProps = {
  className?: string;
};

export const SpecieSearchButton = ({ className }: SpecieSearchButtonProps) => {
  const { contentIsOpen, setContentIsOpen } = useSidebarState();
  const { isDesktop } = useSidebarUpdate();

  if (isDesktop) return <></>;

  return (
    // <Portal portalToTag="body">
    // <div className="sticky top-[calc(100vh-4rem)] flex justify-end w-full pointer-events-none [&>*]:pointer-events-auto">
    <Switch
      checked={contentIsOpen}
      onChange={(v: boolean) => setContentIsOpen(v)}
      className={clsx(
        "grid place-items-center w-12 h-12 rounded-full shadow-lg backdrop-blur-sm bg-primary-900/80 text-primary-300",
        className
      )}
    >
      {contentIsOpen ? <IconX /> : <IconListSearch />}
    </Switch>
    // </div>
    // </Portal>
  );
};
