import {
  LayoutGrid,
  Users,
  FileText,
  Book,
  ChartPie,
} from "lucide-react";

export const navigationItems = [
  {
    label: "Home",
    href: "/",
    icon: LayoutGrid,
  },
  {
    label: "My Groups",
    href: "/groups",
    icon: Users,
  },
  {
    label: "Assignments",
    href: "/assignments",
    icon: FileText,
  },
  {
    label: "AI Teacher's Toolkit",
    href: "/toolkit",
    icon: Book,
  },
  {
    label: "My Library",
    href: "/library",
    icon: ChartPie,
  },
];