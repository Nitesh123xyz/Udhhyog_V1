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

// Navbar MenuItems Data

// export const menuItems = [
//   {
//     icon: Home,
//     label: "Dashboard",
//     clickable: true,
//     path: "/dashboard",
//     hasSubmenu: false,
//     submenu: [],
//   },
//   {
//     icon: ClipboardList,
//     label: "Tasks",
//     hasSubmenu: true,
//     clickable: false,
//     submenu: [
//       {
//         icon: FileText,
//         label: "Responses",
//         path: "/tasks/responses",
//         clickable: true,
//       },
//     ],
//   },
//   {
//     icon: Users,
//     label: "Leads",
//     hasSubmenu: true,
//     clickable: false,
//     submenu: [
//       {
//         icon: Users2,
//         label: "All Leads",
//         path: "/leads/all-leads",
//         clickable: true,
//       },
//       {
//         icon: UserX,
//         label: "Un-assigned Leads",
//         path: "/leads/un-assigned-leads",
//         clickable: true,
//       },
//       {
//         icon: UserPlus,
//         label: "Add Lead",
//         path: "/leads/add-lead",
//         clickable: true,
//       },
//     ],
//   },
//   {
//     icon: BarChart3,
//     label: "Sales",
//     path: "/sales",
//     clickable: true,
//   },
//   {
//     icon: ShoppingCart,
//     label: "Purchase",
//     path: "/purchase",
//     clickable: true,
//   },
//   {
//     icon: Truck,
//     label: "Dispatch",
//     path: "/dispatch",
//     clickable: true,
//   },
//   {
//     icon: Calculator,
//     label: "Accounts",
//     path: "/accounts",
//     clickable: true,
//   },
//   {
//     icon: PieChart,
//     label: "Reports",
//     path: "/reports",
//     clickable: true,
//   },
//   {
//     icon: Settings,
//     label: "Settings",
//     hasSubmenu: true,
//     clickable: false,
//     submenu: [
//       {
//         icon: Cog,
//         label: "General",
//         path: "/settings/general",
//         clickable: true,
//       },
//       {
//         icon: HeartHandshake,
//         label: "Team",
//         path: "/settings/team",
//         clickable: true,
//       },
//       {
//         icon: Users,
//         label: "Users",
//         path: "/settings/users",
//         clickable: true,
//       },
//       {
//         icon: UserPen,
//         label: "Profile",
//         path: "/settings/profile",
//         clickable: true,
//       },
//       {
//         icon: KeyRound,
//         label: "Permission",
//         path: "/permission",
//         clickable: true,
//       },
//     ],
//   },
// ];

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

// Theme Mode

export const ActiveTheme = [
  { label: "light", value: true, color: "white" },
  { label: "dark", value: false, color: "black" },
];
