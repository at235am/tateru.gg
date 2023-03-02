"use client";

import * as Tabs from "@radix-ui/react-tabs";
import clsx from "clsx";
import { ReactNode } from "react";
import { MinTemtem } from "../../app/(explore)/layout";
import { Favorites } from "../Favorites/Favorites.component";
import { SpecieList } from "../SpecieList/SpecieList.component";
import { IconHeartFilled, IconListSearch } from "@tabler/icons-react";
import { SidebarContentType, useSidebarState } from "../../store/sidebar-store";
import { useSidebarUpdate } from "../../hooks/useSidebarUpdate";
import { Dialog, Switch } from "@headlessui/react";
import { SpecieSearchButton } from "../SpecieSearchButton/SpecieSearchButton.component";
import { AnimatePresence, motion } from "framer-motion";

const iconProps = {
  size: 20,
  stroke: 2,
};

export const SidebarTabs = ({ species }: { species: MinTemtem[] }) => {
  const { isDesktop } = useSidebarUpdate();

  if (isDesktop)
    return (
      <div className="z-10 sticky top-16 min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] min-w-[20rem] max-w-[20rem] pt-2">
        <Sidebar species={species} />
      </div>
    );
  return (
    <ModalSidebar>
      <Sidebar species={species} />
    </ModalSidebar>
  );
};

const ModalSidebar = ({ children }: { children: ReactNode }) => {
  const sidebarOpened = useSidebarState((state) => state.contentIsOpen);
  const setSidebarOpen = useSidebarState((state) => state.setContentIsOpen);

  const close = () => setSidebarOpen(false);
  return (
    <Dialog
      open={sidebarOpened}
      onClose={close}
      className="relative max-h-full"
      static
    >
      <AnimatePresence>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        {sidebarOpened && (
          <motion.div
            key="sidebar-backdrop"
            initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
            animate={{ backdropFilter: "blur(4px)", opacity: 1 }}
            exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
            className="fixed inset-0 bg-neutral-900/90"
            aria-hidden="true"
          />
        )}
        {/* The actual panel */}
        {sidebarOpened && (
          <motion.div
            initial={{ x: "-50%", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0  max-h-full overflow-y-auto"
          >
            <Dialog.Panel className="relative flex flex-col rounded-xl h-full px-4 pt-4">
              {children}
            </Dialog.Panel>
            <SpecieSearchButton className="absolute bottom-4 right-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

const Sidebar = ({ species }: { species: MinTemtem[] }) => {
  const { contentIsOpen, contentType, setContentIsOpen, setContentType } =
    useSidebarState();

  const { isDesktop } = useSidebarUpdate();

  const isSearch = contentType === "search";

  return (
    <div className="relative flex flex-col gap-2 h-full">
      {isSearch ? <SpecieList species={species} /> : <Favorites />}

      <Switch
        checked={isSearch}
        onChange={(v: boolean) => setContentType(v ? "search" : "fav")}
        className={clsx(
          "absolute grid place-items-center w-10 h-10 rounded-full shadow-lg backdrop-blur-sm bg-rose-500/50 text-rose-300",
          isDesktop ? "bottom-4 right-0" : "bottom-4 right-14"
        )}
      >
        {isSearch ? (
          <IconHeartFilled {...iconProps} />
        ) : (
          <IconListSearch {...iconProps} />
        )}
      </Switch>
    </div>
  );
};
