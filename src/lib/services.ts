export const PILLARS = [
  "Your business, finally online. And working.",
  "Websites that bring clients. AI that saves time.",
  "Not another agency that disappears after the invoice.",
  "Based in Iași. Working worldwide.",
];

export const SERVICES = [
  {
    slug: "web-design",
    name: "Web Design & Development",
    description:
      "Sites that earn their keep. We design around your customer journey, not just how it looks. Built fast. Built right.",
    areas: ["Strategy", "Design", "Development", "Launch"],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1400&auto=format&fit=crop&q=90",
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    description:
      "Repetitive tasks, lead follow-ups, customer responses, data entry — automated. You hire less, do more, sleep better.",
    areas: ["Workflow", "Integration", "Chatbots", "Analytics"],
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&auto=format&fit=crop&q=90",
  },
  {
    slug: "seo",
    name: "SEO & Growth",
    description:
      "Getting found by the right people, not just more people. Technical SEO, content strategy, and local visibility.",
    areas: ["Technical SEO", "Content", "Local", "Analytics"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&auto=format&fit=crop&q=90",
  },
  {
    slug: "strategy",
    name: "Strategy & Consulting",
    description:
      "Digital direction for your business. What to build, when, and why. No jargon. No surprises.",
    areas: ["Audit", "Roadmap", "Advisory", "Training"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&auto=format&fit=crop&q=90",
  },
] as const;

export type Service = (typeof SERVICES)[number];
