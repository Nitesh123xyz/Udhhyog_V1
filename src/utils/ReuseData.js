import {
  Home,
  ClipboardList,
  FileText,
  Users,
  Users2,
  UserX,
  UserPlus,
  BarChart3,
  ShoppingCart,
  Truck,
  Calculator,
  PieChart,
  Settings,
  Cog,
  HeartHandshake,
  UserPen,
  KeyRound,
} from "lucide-react";

const ICONS = {
  Home,
  ClipboardList,
  FileText,
  Users,
  Users2,
  UserX,
  UserPlus,
  BarChart3,
  ShoppingCart,
  Truck,
  Calculator,
  PieChart,
  Settings,
  Cog,
  HeartHandshake,
  UserPen,
  KeyRound,
};

function transformMenu(apiMenu) {
  if (!Array.isArray(apiMenu)) return [];

  const byParent = {};
  apiMenu.forEach((item) => {
    (byParent[item.parent_id] ||= []).push(item);
  });

  Object.values(byParent).forEach((arr) =>
    arr.sort((a, b) => a.page_id - b.page_id)
  );

  function buildNode(item) {
    const children = byParent[item.page_id] || [];
    const hasKids = children.length > 0;

    return {
      icon: ICONS[item.icon] || null, // map string → Lucide component
      label: item.label,
      path: hasKids ? undefined : item.path || "",
      clickable: hasKids ? false : !!item.clickable,
      hasSubmenu: hasKids,
      submenu: children.map(buildNode),
    };
  }

  return (byParent[0] || []).map(buildNode);
}

export default transformMenu;

// ---------------------------------------------------

export const JOB_TITLES = [
  "Backend Developer",
  "Frontend Developer",
  "Fullstack Developer",
  "Sales",
  "SEO",
  "HR",
];
export const JOB_STATUSES = ["Permanent", "Intern", "Contract", "Trainee"];
export const MARITAL_STATUSES = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
  "Widower",
];
export const BLOOD_GROUP = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// ---------------------------------------------------

// Theme Mode

export const ActiveTheme = [
  { label: "light", value: true, color: "white" },
  { label: "dark", value: false, color: "black" },
];
