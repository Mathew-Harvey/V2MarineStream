import { serviceNav } from "./navigation";

/** @deprecated Use serviceNav — sales items now live under /services */
export const salesCategories = serviceNav
  .filter((s) =>
    ["/services/hardware", "/services/software", "/services/training", "/services/professional-services"].includes(
      s.href,
    ),
  )
  .map((s) => ({
    href: s.href,
    label: s.label,
    menuLabel: s.label,
    description: s.description,
    features: [] as string[],
  }));

export const imsExpertise = {
  href: "/services/expertise",
  label: "IMS expertise",
  menuLabel: "IMS expertise",
  description:
    "Marine scientists for invasive species identification, biosecurity risk assessment, and treatment guidance.",
  features: [
    "Invasive marine species identification",
    "Biosecurity risk assessment",
    "Treatment guidance aligned to regulation",
    "Field team training and verification",
  ],
} as const;

export const salesNav = serviceNav.map((item) => ({
  href: item.href,
  label: item.label,
  group: item.href === "/services/expertise" ? ("ims" as const) : ("sales" as const),
}));
