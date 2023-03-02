import { ReactNode } from "react";

export const metadata = {
  title: "Teambuilder | Tempal",
  description:
    "Build your team up choosing your temtems, traits, gears, techniques, training values (TV), single values (SV), and more.",
};

export default function Teambuilderlayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
