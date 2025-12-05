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

// Colors in view team

export const COLOR_LIST = [
  { name: "Blue", colorname: "blue", value: "blue-500", hexcode: "#1F75FE" },
  { name: "Green", colorname: "green", value: "green-500", hexcode: "#10B981" },
  { name: "Red", colorname: "red", value: "red-500", hexcode: "#EF4444" },
  {
    name: "Purple",
    colorname: "purple",
    value: "purple-500",
    hexcode: "#8B5CF6",
  },
  { name: "Amber", colorname: "amber", value: "amber-500", hexcode: "#F59E0B" },
  { name: "Slate", colorname: "slate", value: "slate-500", hexcode: "#64748B" },
  { name: "Teal", colorname: "teal", value: "teal-500", hexcode: "#14B8A6" },
  {
    name: "Indigo",
    colorname: "indigo",
    value: "indigo-500",
    hexcode: "#6366F1",
  },
  { name: "Pink", colorname: "pink", value: "pink-500", hexcode: "#EC4899" },
  {
    name: "Yellow",
    colorname: "yellow",
    value: "yellow-400",
    hexcode: "#FBBF24",
  },
  { name: "Cyan", colorname: "cyan", value: "cyan-500", hexcode: "#06B6D4" },
  { name: "Lime", colorname: "lime", value: "lime-500", hexcode: "#84CC16" },
  { name: "Rose", colorname: "rose", value: "rose-500", hexcode: "#FB7185" },
  {
    name: "Orange",
    colorname: "orange",
    value: "orange-500",
    hexcode: "#FB923C",
  },
  {
    name: "Violet",
    colorname: "violet",
    value: "violet-500",
    hexcode: "#7C3AED",
  },
  { name: "Brown", colorname: "brown", value: "brown-500", hexcode: "#8B5E3C" },
  { name: "Olive", colorname: "olive", value: "olive-500", hexcode: "#6B8E23" },
  { name: "Mint", colorname: "mint", value: "mint-500", hexcode: "#3EB489" },
  { name: "Sky", colorname: "sky", value: "sky-500", hexcode: "#38BDF8" },
  { name: "Steel", colorname: "steel", value: "steel-500", hexcode: "#4B5563" },
  {
    name: "Charcoal",
    colorname: "charcoal",
    value: "charcoal-500",
    hexcode: "#2D3748",
  },
  {
    name: "Teal Dark",
    colorname: "teal-dark",
    value: "teal-700",
    hexcode: "#0F766E",
  },
  {
    name: "Mustard",
    colorname: "mustard",
    value: "mustard-500",
    hexcode: "#D97706",
  },
];

// ---------------------------------------------------

export const DepartmentHeading = [
  { id: 0, name: "empid", label: "Profile_Id", status: true, active: false },
  { id: 1, name: "name", label: "Name", status: true, active: false },
  { id: 2, name: "jobtitle", label: "Job_Title", status: true, active: false },
  {
    id: 3,
    name: "department",
    label: "Department",
    status: true,
    active: false,
  },
  { id: 4, name: "salary", label: "Salary", status: true, active: false },
  {
    id: 5,
    name: "joindate",
    label: "Joining_Date",
    status: true,
    active: false,
  },
  {
    id: 6,
    name: "emptype",
    label: "Employment_Type",
    status: true,
    active: false,
  },
  { id: 7, name: "active", label: "Status", status: true, active: false },
];

// ---------------------------------------------------

// Theme Mode

export const ActiveTheme = [
  { label: "light", value: true, color: "white" },
  { label: "dark", value: false, color: "black" },
];
