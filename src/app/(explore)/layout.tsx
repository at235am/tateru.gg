import { TemSearchSidebar } from "../../components/TemSearchSidebar/TemSearchSidebar.component";
import { Fields, Temtem } from "../../utils/augmented-types/temtems";
import { fetchTemtem } from "../../utils/fetch-temtem";

export const metadata = {
  title: "Tem Search | Tempal",
  description:
    "Use our advanced search to search for temtems by name, types, traits, techniques, and number then sort the results by base stats or training values.",
};

type SpecieLayoutProps = {
  children: React.ReactNode;
};

const fields: Fields[] = [
  "name",
  "number",
  "types",
  "traits",
  "stats",
  "tvYields",
  "techniques",
  "evolution",
  "wikiRenderStaticUrl",
];

export type MinTemtem = Pick<
  Temtem,
  | "name"
  | "number"
  | "types"
  | "traits"
  | "stats"
  | "tvYields"
  | "techniques"
  | "evolution"
  | "wikiRenderStaticUrl"
>;

export default async function SpecieLayout({ children }: SpecieLayoutProps) {
  const allSpecies: MinTemtem[] = await fetchTemtem({ fields });

  return (
    <div className="pack-content flex flex-col md:flex-row gap-8 h-full">
      <TemSearchSidebar species={allSpecies} />
      <div className="z-0 relative flex flex-col gap-4 py-4 flex-1">
        {children}
      </div>
    </div>
  );
}
