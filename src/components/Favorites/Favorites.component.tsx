"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import useVirtualScroll from "../../hooks/useVirtualScroll";

import { useHasMounted } from "../../hooks/useHasMounted";
import { useFavoritesStore } from "../../store/favorites-store";
import { MinTemtem } from "../../app/(explore)/layout";
import { ElementTypeLabel } from "../ElementTypeLabel/ElementTypeLabel";
import { formatTemName, zeroPad } from "../../utils/utils";
import { useUrlQuery } from "../SpecieList/useUrlQuery";
import { useFetchTemQuery } from "../../hooks/useFetchTemQuery";
import { IconChevronRight, IconTrash } from "@tabler/icons-react";
import { forwardRef, Fragment, useEffect, useRef, useState } from "react";
import { useSidebarState } from "../../store/sidebar-store";

export const Favorites = forwardRef<HTMLDivElement>(function Favorites(
  props,
  ref
) {
  const mounted = useHasMounted();
  if (!mounted) return <></>;
  return <FavoritesComponent {...props} ref={ref} />;
});

const FavoritesComponent = forwardRef<HTMLDivElement>(
  function FavoritesComponent({ ...props }, ref) {
    const {
      favoriteTems,
      addToFavorites,
      removeFromFavorites,
      clearFavorites,
    } = useFavoritesStore();

    const [hasXFavorites, setHasXFavorites] = useState(false);

    useEffect(() => {
      favoriteTems.length > 0
        ? setHasXFavorites(true)
        : setHasXFavorites(false);
    }, [favoriteTems]);

    const clearAll = () => {
      clearFavorites();
    };

    const scrollRef = useRef<HTMLDivElement>(null!);

    const { blankHeight, listHeight, renderList } = useVirtualScroll<string>({
      scrollContainerRef: scrollRef,
      list: favoriteTems,
      itemHeight: 80,
      itemGutter: 16,
      overscan: 2,
    });

    return (
      <>
        <div className="grid place-items-center gap-2">
          <h3 className="relative min-h-[3rem] grid place-items-center w-full text-neutral-500 rounded-lg text-base bg-neutral-800">
            {"Explore your favorite Temtems."}
          </h3>
          <div className="relative w-full z-10">
            <button
              className={clsx(
                "rounded-lg h-8 font-bold text-xs w-full text-red-500 bg-red-800/50",
                "flex justify-center items-center gap-2",
                "outline-none appearance-none focus-visible:ring-1 ring-white ring-inset"
              )}
              onClick={() => {
                clearAll();
              }}
            >
              <IconTrash size={20} />
              <span className="uppercase">{"clear all"}</span>
            </button>
          </div>
        </div>
        <div
          ref={ref}
          className="relative flex flex-col h-full w-full overflow-hidden"
        >
          <div
            ref={scrollRef}
            className={clsx(
              "flex flex-col gap-4 h-full custom-scrollbar-tiny overflow-y-auto overflow-x-hidden",
              "outline-none appearance-none"
            )}
          >
            <ul
              className="relative flex flex-col h-full"
              style={{
                minHeight: hasXFavorites ? `${listHeight}px` : "100%",
              }}
            >
              <li
                style={{ height: hasXFavorites ? `${blankHeight}px` : "100%" }}
              />
              {renderList.map((temtem, index) => (
                <SpecieData key={index} temtem={temtem} />
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
);

type SpecieProps = {
  temtem: string;
};

const SpecieData = ({ temtem }: SpecieProps) => {
  const { minimalQueryUrl } = useUrlQuery();
  const getUrl = (tem: MinTemtem) => "/species/" + tem.name + minimalQueryUrl;
  const closeSidebar = useSidebarState((state) => state.closeSidebar);

  const { data, isLoading, isError, isPaused } = useFetchTemQuery(temtem);

  if (!data || isLoading || isError || isPaused) {
    return <Fragment />;
  }
  if (data.length < 1) {
    return <Fragment />;
  }

  const specie = data[0];

  return (
    <li>
      <Link
        href={getUrl(specie)}
        className={clsx(
          "group/tem-link flex items-center gap-4 pl-2 pr-4 min-h-[6rem] rounded-lg cursor-pointer whitespace-nowrap text-sm",
          "outline-none appearance-none hover:bg-neutral-800/70 focus-visible:bg-neutral-800/70 focus-visible:ring-1 hover:ring-1 ring-inset ring-white/10"
        )}
        onClick={closeSidebar}
      >
        <div className="flex w-16 h-16">
          <Image
            alt={specie.name + " image"}
            src={specie.wikiRenderStaticUrl}
            height={64}
            width={64}
            quality={100}
            className="flex object-contain h-full w-full"
          />
        </div>
        <span className="flex flex-col gap-1 flex-1">
          <span className="flex text-base font-bold">
            <span className="relative top-[-1px] text-[18px] [line-height:1.5rem] text-neutral-600 font-extrabold font-mono pr-1">
              {zeroPad(specie.number, 3)}
            </span>
            <span className="text">{formatTemName(specie.name)}</span>
          </span>
          <span className="flex gap-2">
            {specie.types[0] && <ElementTypeLabel type={specie.types[0]} />}
            {specie.types[1] && <ElementTypeLabel type={specie.types[1]} />}
          </span>
        </span>
        <div
          className={clsx(
            "flex rounded-xl text-neutral-600",
            "group-hover/tem-link:animate-bounce-origin-right group-focus-visible/tem-link:animate-bounce-origin-right"
          )}
        >
          <IconChevronRight />
        </div>
      </Link>
    </li>
  );
};
