export const salesCategories = [
  {
    href: "/sales/hardware",
    label: "Hardware",
    menuLabel: "Hardware",
    description: "ROV systems, filtration units, and field equipment for inspection and cleaning with capture.",
    features: [
      "ROV inspection systems",
      "Filtration and capture units",
      "Diver and hand-tool kits",
      "Deployment and support",
    ],
  },
  {
    href: "/sales/software",
    label: "Software",
    menuLabel: "Software",
    description: "MarineStream platform access — field capture, workflows, and compliance reporting.",
    features: [
      "Platform subscriptions",
      "Multi-party workflows",
      "Automated BFMP and audit reports",
      "Integration and onboarding",
    ],
  },
  {
    href: "/sales/training",
    label: "Training",
    menuLabel: "Training",
    description: "Operator and supervisor programs for ROV, biofouling management, and platform use.",
    features: [
      "ROV pilot and supervisor courses",
      "Biofouling management training",
      "Platform and reporting workshops",
      "On-site or remote delivery",
    ],
  },
  {
    href: "/sales/professional-services",
    label: "Professional services",
    menuLabel: "Professional services",
    description: "Consulting, program design, and operational support for partners and fleet operators.",
    features: [
      "Compliance program design",
      "Operational consulting",
      "Workflow and reporting setup",
      "Ongoing advisory support",
    ],
  },
] as const;

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

export const salesNav = [
  ...salesCategories.map((item) => ({
    href: item.href,
    label: item.menuLabel,
    group: "sales" as const,
  })),
  {
    href: imsExpertise.href,
    label: imsExpertise.menuLabel,
    group: "ims" as const,
  },
] as const;
