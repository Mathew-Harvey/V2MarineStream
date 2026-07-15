/** Primary site IA — aligned to UAVISUALS: Home · Portfolio · Services · About · Contact */

export const serviceNav = [
  {
    href: "/services/inspection",
    label: "Inspection",
    description: "ROV and diver surveys with live access and fouling ratings.",
  },
  {
    href: "/services/cleaning",
    label: "Cleaning with capture",
    description: "In-water cleaning with 10μ filtration and UV.",
  },
  {
    href: "/services/platform",
    label: "Platform",
    description: "Field capture, parallel approvals, automated reports.",
  },
  {
    href: "/services/hardware",
    label: "Hardware",
    description: "ROV systems, filtration units, and field equipment.",
  },
  {
    href: "/services/software",
    label: "Software",
    description: "Platform subscriptions, onboarding, and integration.",
  },
  {
    href: "/services/training",
    label: "Training",
    description: "ROV, biofouling management, and platform programs.",
  },
  {
    href: "/services/professional-services",
    label: "Professional services",
    description: "Consulting, program design, and operational support.",
  },
  {
    href: "/services/expertise",
    label: "IMS expertise",
    description: "Marine science for identification, risk, and treatment.",
  },
] as const;

export const tools = [
  {
    href: "/tools/ims-species-guide/",
    label: "IMS Species Guide",
    menuLabel: "IMS Species Guide",
    description: "Identify invasive marine species on hulls and structures.",
  },
  {
    href: "/interactive-tools/hullCalc.html",
    label: "Fouling Cost Calculator",
    menuLabel: "Fouling Cost Calculator",
    description: "Estimate fuel and emissions impact of hull fouling.",
  },
  {
    href: "/interactive-tools/bfmpGen.html",
    label: "Biofouling Management Plan Generator",
    menuLabel: "BFMP Generator",
    description: "Generate an IMO-aligned biofouling management plan.",
  },
  {
    href: "/core-pages/rov-autoconnect.html",
    label: "ROV AutoConnect",
    menuLabel: "ROV AutoConnect",
    description: "Detect ROV streams and launch video viewing automatically.",
  },
] as const;
