"use client";

import clsx from "clsx";
import Image from "next/image";
import useVirtualScroll from "../../hooks/useVirtualScroll";
import Link from "next/link";
import { forwardRef, useRef } from "react";
import { MinTemtem } from "../../app/species/layout";
import { formatTemName, zeroPad } from "../../utils/utils";
import { ElementTypeLabel } from "../ElementTypeLabel/ElementTypeLabel";
import { SearchInput } from "../SearchInput/SearchInput.component";
import { useList } from "./useList";
import { useUrlQuery } from "./useUrlQuery";
import { IconFilter } from "@tabler/icons-react";
import { SortType } from "./SpecieList.types";
import { SORT_LABELS } from "../SortMenu/SortMenu.component";
import { SORT_TYPE_MAP } from "./SpecieList.utils";

type Props = {
  species: MinTemtem[];
};
export const SpecieList = forwardRef<HTMLDivElement, Props>(function SpecieList(
  { species },
  ref
) {
  const scrollRef = useRef<HTMLDivElement>(null!);

  const { processedList } = useList(species);
  const { query, minimalQueryUrl } = useUrlQuery();

  const { blankHeight, listHeight, renderList } = useVirtualScroll<MinTemtem>({
    scrollContainerRef: scrollRef,
    list: processedList,
    itemHeight: 80,
    itemGutter: 14,
    overscan: 2,
  });

  const getUrl = (tem: MinTemtem) => "/species/" + tem.name + minimalQueryUrl;

  const hasItems = processedList.length > 0;

  return (
    <>
      <SearchInput />
      <div
        ref={ref}
        className="relative flex flex-col w-full overflow-hidden bg-neutral-900"
      >
        {!hasItems && (
          <div className="mt-6 text-neutral-500 text-sm rounded-lg p-4 border border-neutral-500/20">
            {"No temtems found. Try making sure you have your "}
            <span className="text-yellow-500 bg-yellow-800/50 px-1 rounded">
              <IconFilter className="inline" size={16} />
              filter
            </span>
            {" set right."}
          </div>
        )}

        <div
          ref={scrollRef}
          className={clsx(
            "flex flex-col gap-4 py-8 custom-scrollbar-tiny overflow-y-auto overflow-x-hidden",
            "outline-none appearance-none"
          )}
        >
          <ul
            className="relative flex flex-col gap-4"
            style={{
              minHeight: hasItems ? `${listHeight}px` : "auto",
            }}
          >
            <li style={{ height: hasItems ? `${blankHeight}px` : "auto" }} />
            {renderList.map((tem) => (
              <SpecieItemLink
                key={tem.name}
                href={getUrl(tem)}
                specie={tem}
                show={query.sortType}
              />
            ))}
          </ul>
        </div>
        {/* THIS IS THE SHADOW ON THE TOP AND BOTTOM OF THE SCROLL CONTAINER */}
        {hasItems && (
          <div className="absolute inset-0 pointer-events-none [background-image:linear-gradient(180deg,#171717,transparent_4rem,transparent_calc(100%-4rem),#171717_100%),linear-gradient(180deg,#171717,transparent_4rem,transparent_calc(100%-4rem),#171717_100%),linear-gradient(180deg,#171717,transparent_4rem,transparent_calc(100%-4rem),#171717_100%),linear-gradient(180deg,#171717,transparent_4rem,transparent_calc(100%-4rem),#171717_100%)]" />
        )}
      </div>
    </>
  );
});

type ItemProps = {
  href: string;
  specie: MinTemtem;
  show: SortType;
};

const SpecieItemLink = ({ specie, show, href }: ItemProps) => {
  const showSortData =
    show !== "relevance" && show !== "name" && show !== "number";

  const getStat = SORT_TYPE_MAP[show].accessor;

  return (
    <Link
      tabIndex={-1}
      href={href}
      className={clsx(
        "flex items-center gap-4 pl-2 pr-4 min-h-[5rem] rounded-lg cursor-pointer whitespace-nowrap text-sm",
        "outline-none appearance-none hover:bg-neutral-800/80"
        // active ? "bg-neutral-800/80" : "bg-transparent"
      )}
    >
      <div className="flex w-16 h-16">
        <Image
          alt={specie.name + " image"}
          src={specie.wikiRenderStaticUrl}
          height={64}
          width={64}
          quality={100}
          className="flex object-contain w-full h-full"
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
      {showSortData && (
        <div className="flex flex-col gap-1">
          <span className="font-extrabold text-xs text-center text-neutral-600">
            {SORT_LABELS[show]}
          </span>
          <span className="font-bold font-mono rounded-xl py-2 px-4 bg-neutral-800/50zz bg-[#1E1E1E] text-center">
            {getStat(specie)}
          </span>
        </div>
      )}
    </Link>
  );
};
