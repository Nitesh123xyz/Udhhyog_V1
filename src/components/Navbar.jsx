import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  Users,
  BarChart3,
  Settings,
  FileText,
  ShoppingBag,
  Bell,
  Calendar,
  MessageSquare,
  LogOut,
  ChevronRight,
  ChevronDown,
  UserPlus,
  UserCheck,
  Shield,
  TrendingUp,
  PieChart,
  Activity,
  Globe,
  Users2,
  Eye,
  MousePointer,
  Package,
  ShoppingCart,
  Package2,
  FileCheck,
  ClipboardList,
  Receipt,
  Cog,
  Database,
  Lock,
  Zap,
  FileSpreadsheet,
  FileImage,
  Download,
  Upload,
  Archive,
  Folder,
  Search,
  Filter,
  DollarSign,
  Building,
  User,
  CreditCard,
  Truck,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Tag,
  Percent,
  Calculator,
  Bookmark,
  Flag,
  Hash,
  Link,
  PlusCircle,
  MinusCircle,
  Edit,
  Trash,
  Copy,
  Share,
  Send,
  Save,
  FileCode,
  FileX,
  FileArchive,
  Key,
  Car,
  Coffee,
} from "lucide-react";

const Navbar = ({ isExpanded, setIsExpanded }) => {
  const leaveTimer = useRef(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedSubSections, setExpandedSubSections] = useState({});
  const [expandedSubSubSections, setExpandedSubSubSections] = useState({});
  const [expandedSubSubSubSections, setExpandedSubSubSubSections] = useState(
    {}
  );

  const handleMouseEnter = () => {
    // Cancel pending close
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    // Start 10s delay before closing
    leaveTimer.current = setTimeout(() => {
      setIsExpanded(false);
      leaveTimer.current = null;
    }, 800);
  };

  // Reset all expanded states when navbar is collapsed
  useEffect(() => {
    if (!isExpanded) {
      setExpandedSections({});
      setExpandedSubSections({});
      setExpandedSubSubSections({});
      setExpandedSubSubSubSections({});
    }

    return () => {
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current);
      }
    };
  }, [isExpanded]);

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      active: false,
      path: "/dashboard",
    },
    {
      icon: Users,
      label: "User Management",
      hasSubmenu: true,
      submenu: [
        {
          icon: UserPlus,
          label: "Add Users",
          hasSubmenu: true,
          submenu: [
            {
              icon: User,
              label: "Individual User",
              path: "/users/add/individual",
            },
            { icon: Users2, label: "Bulk Import", path: "/users/add/bulk" },
            { icon: Upload, label: "CSV Upload", path: "/users/add/csv" },
            { icon: Link, label: "API Integration", path: "/users/add/api" },
          ],
        },
        {
          icon: UserCheck,
          label: "Active Users",
          // active: true, // Set as default active
          hasSubmenu: true,
          submenu: [
            { icon: Eye, label: "View All", path: "/users/active/all" },
            {
              icon: Search,
              label: "Search Users",
              path: "/users/active/search",
            },
            {
              icon: Filter,
              label: "Filter Users",
              path: "/users/active/filter",
            },
            {
              icon: Download,
              label: "Export Users",
              path: "/users/active/export",
            },
          ],
        },
        {
          icon: Shield,
          label: "Permissions",
          hasSubmenu: true,
          submenu: [
            {
              icon: Lock,
              label: "Role Management",
              path: "/users/permissions/roles",
            },
            {
              icon: Key,
              label: "Access Control",
              path: "/users/permissions/access",
            },
            {
              icon: Settings,
              label: "Permission Sets",
              path: "/users/permissions/sets",
            },
          ],
        },
      ],
    },
    {
      icon: BarChart3,
      label: "Analytics",
      hasSubmenu: true,
      submenu: [
        {
          icon: TrendingUp,
          label: "Traffic",
          hasSubmenu: true,
          submenu: [
            {
              icon: Globe,
              label: "Website Traffic",
              hasSubmenu: true,
              submenu: [
                {
                  icon: Eye,
                  label: "Page Views",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: Clock,
                      label: "Real-time Views",
                      path: "/analytics/traffic/website/pageviews/realtime",
                    },
                    {
                      icon: Calendar,
                      label: "Daily Views",
                      path: "/analytics/traffic/website/pageviews/daily",
                    },
                    {
                      icon: TrendingUp,
                      label: "Weekly Trends",
                      path: "/analytics/traffic/website/pageviews/weekly",
                    },
                    {
                      icon: Archive,
                      label: "Historical Data",
                      path: "/analytics/traffic/website/pageviews/historical",
                    },
                  ],
                },
                {
                  icon: Users2,
                  label: "Unique Visitors",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: Globe,
                      label: "New Visitors",
                      path: "/analytics/traffic/website/unique/new",
                    },
                    {
                      icon: Bookmark,
                      label: "Returning Visitors",
                      path: "/analytics/traffic/website/unique/returning",
                    },
                    {
                      icon: MapPin,
                      label: "Geographic Distribution",
                      path: "/analytics/traffic/website/unique/geo",
                    },
                  ],
                },
                {
                  icon: Clock,
                  label: "Session Duration",
                  path: "/analytics/traffic/website/duration",
                },
                {
                  icon: MousePointer,
                  label: "Bounce Rate",
                  path: "/analytics/traffic/website/bounce",
                },
              ],
            },
            {
              icon: Users2,
              label: "User Sessions",
              hasSubmenu: true,
              submenu: [
                {
                  icon: Clock,
                  label: "Active Sessions",
                  path: "/analytics/traffic/sessions/active",
                },
                {
                  icon: Calendar,
                  label: "Session History",
                  path: "/analytics/traffic/sessions/history",
                },
                {
                  icon: Activity,
                  label: "Session Analysis",
                  path: "/analytics/traffic/sessions/analysis",
                },
              ],
            },
            {
              icon: MousePointer,
              label: "Click Analytics",
              path: "/analytics/traffic/clicks",
            },
          ],
        },
        {
          icon: PieChart,
          label: "Revenue",
          hasSubmenu: true,
          submenu: [
            {
              icon: DollarSign,
              label: "Total Revenue",
              path: "/analytics/revenue/total",
            },
            {
              icon: TrendingUp,
              label: "Revenue Growth",
              path: "/analytics/revenue/growth",
            },
            {
              icon: Calendar,
              label: "Monthly Reports",
              path: "/analytics/revenue/monthly",
            },
            {
              icon: Calculator,
              label: "Profit Margins",
              path: "/analytics/revenue/margins",
            },
          ],
        },
        {
          icon: Activity,
          label: "Reports",
          hasSubmenu: true,
          submenu: [
            {
              icon: FileText,
              label: "Generate Reports",
              path: "/analytics/reports/generate",
            },
            {
              icon: Archive,
              label: "Report Archive",
              path: "/analytics/reports/archive",
            },
            {
              icon: Download,
              label: "Export Data",
              path: "/analytics/reports/export",
            },
            {
              icon: Calendar,
              label: "Scheduled Reports",
              path: "/analytics/reports/scheduled",
            },
          ],
        },
      ],
    },
    {
      icon: ShoppingBag,
      label: "E-commerce",
      hasSubmenu: true,
      submenu: [
        {
          icon: Package,
          label: "Products",
          hasSubmenu: true,
          submenu: [
            {
              icon: PlusCircle,
              label: "Add Product",
              path: "/ecommerce/products/add",
            },
            { icon: Eye, label: "View All", path: "/ecommerce/products/all" },
            {
              icon: Tag,
              label: "Categories",
              path: "/ecommerce/products/categories",
            },
            {
              icon: Star,
              label: "Featured Products",
              path: "/ecommerce/products/featured",
            },
            {
              icon: Percent,
              label: "Discounts",
              path: "/ecommerce/products/discounts",
            },
          ],
        },
        {
          icon: ShoppingCart,
          label: "Orders",
          hasSubmenu: true,
          submenu: [
            {
              icon: CheckCircle,
              label: "Completed Orders",
              hasSubmenu: true,
              submenu: [
                {
                  icon: Receipt,
                  label: "Order Details",
                  path: "/ecommerce/orders/completed/details",
                },
                {
                  icon: Download,
                  label: "Export Orders",
                  path: "/ecommerce/orders/completed/export",
                },
                {
                  icon: FileText,
                  label: "Invoice Generation",
                  path: "/ecommerce/orders/completed/invoices",
                },
              ],
            },
            {
              icon: Clock,
              label: "Pending Orders",
              path: "/ecommerce/orders/pending",
            },
            {
              icon: XCircle,
              label: "Cancelled Orders",
              path: "/ecommerce/orders/cancelled",
            },
            {
              icon: Truck,
              label: "Shipping Status",
              path: "/ecommerce/orders/shipping",
            },
          ],
        },
        {
          icon: Package2,
          label: "Inventory",
          hasSubmenu: true,
          submenu: [
            {
              icon: Eye,
              label: "Stock Levels",
              path: "/ecommerce/inventory/stock",
            },
            {
              icon: AlertCircle,
              label: "Low Stock Alerts",
              path: "/ecommerce/inventory/alerts",
            },
            {
              icon: Upload,
              label: "Stock Updates",
              path: "/ecommerce/inventory/updates",
            },
            {
              icon: Archive,
              label: "Warehouse Management",
              path: "/ecommerce/inventory/warehouse",
            },
          ],
        },
      ],
    },
    {
      icon: FileText,
      label: "Documents",
      hasSubmenu: true,
      submenu: [
        {
          icon: FileCheck,
          label: "Invoices",
          hasSubmenu: true,
          submenu: [
            {
              icon: PlusCircle,
              label: "Create Invoice",
              hasSubmenu: true,
              submenu: [
                {
                  icon: User,
                  label: "Customer Invoice",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: FileText,
                      label: "Standard Invoice",
                      hasSubmenu: true,
                      submenu: [
                        {
                          icon: DollarSign,
                          label: "Product Invoice",
                          path: "/documents/invoices/create/customer/standard/product",
                        },
                        {
                          icon: Clock,
                          label: "Service Invoice",
                          path: "/documents/invoices/create/customer/standard/service",
                        },
                        {
                          icon: Percent,
                          label: "Discount Invoice",
                          path: "/documents/invoices/create/customer/standard/discount",
                        },
                        {
                          icon: CreditCard,
                          label: "Recurring Invoice",
                          path: "/documents/invoices/create/customer/standard/recurring",
                        },
                      ],
                    },
                    {
                      icon: Star,
                      label: "Premium Invoice",
                      hasSubmenu: true,
                      submenu: [
                        {
                          icon: Building,
                          label: "Corporate Template",
                          path: "/documents/invoices/create/customer/premium/corporate",
                        },
                        {
                          icon: Globe,
                          label: "International Template",
                          path: "/documents/invoices/create/customer/premium/international",
                        },
                        {
                          icon: Shield,
                          label: "Legal Template",
                          path: "/documents/invoices/create/customer/premium/legal",
                        },
                      ],
                    },
                    {
                      icon: Calculator,
                      label: "Tax Invoice",
                      path: "/documents/invoices/create/customer/tax",
                    },
                    {
                      icon: AlertCircle,
                      label: "Overdue Invoice",
                      path: "/documents/invoices/create/customer/overdue",
                    },
                  ],
                },
                {
                  icon: Building,
                  label: "Business Invoice",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: FileSpreadsheet,
                      label: "B2B Invoice",
                      path: "/documents/invoices/create/business/b2b",
                    },
                    {
                      icon: Truck,
                      label: "Wholesale Invoice",
                      path: "/documents/invoices/create/business/wholesale",
                    },
                    {
                      icon: Globe,
                      label: "Export Invoice",
                      path: "/documents/invoices/create/business/export",
                    },
                    {
                      icon: Archive,
                      label: "Bulk Order Invoice",
                      path: "/documents/invoices/create/business/bulk",
                    },
                  ],
                },
                {
                  icon: FileSpreadsheet,
                  label: "Bulk Invoice",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: Upload,
                      label: "CSV Import",
                      path: "/documents/invoices/create/bulk/csv",
                    },
                    {
                      icon: Database,
                      label: "Database Import",
                      path: "/documents/invoices/create/bulk/database",
                    },
                    {
                      icon: Link,
                      label: "API Import",
                      path: "/documents/invoices/create/bulk/api",
                    },
                  ],
                },
                {
                  icon: Copy,
                  label: "Duplicate Invoice",
                  path: "/documents/invoices/create/duplicate",
                },
              ],
            },
            {
              icon: Search,
              label: "Manage Invoices",
              hasSubmenu: true,
              submenu: [
                {
                  icon: CheckCircle,
                  label: "Paid Invoices",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: Calendar,
                      label: "This Month",
                      hasSubmenu: true,
                      submenu: [
                        {
                          icon: Eye,
                          label: "View All",
                          path: "/documents/invoices/paid/month/all",
                        },
                        {
                          icon: Download,
                          label: "Export PDF",
                          path: "/documents/invoices/paid/month/pdf",
                        },
                        {
                          icon: FileSpreadsheet,
                          label: "Export Excel",
                          path: "/documents/invoices/paid/month/excel",
                        },
                        {
                          icon: Mail,
                          label: "Email Summary",
                          path: "/documents/invoices/paid/month/email",
                        },
                      ],
                    },
                    {
                      icon: Archive,
                      label: "Last Quarter",
                      hasSubmenu: true,
                      submenu: [
                        {
                          icon: BarChart3,
                          label: "Quarterly Report",
                          path: "/documents/invoices/paid/quarter/report",
                        },
                        {
                          icon: TrendingUp,
                          label: "Growth Analysis",
                          path: "/documents/invoices/paid/quarter/growth",
                        },
                        {
                          icon: PieChart,
                          label: "Revenue Breakdown",
                          path: "/documents/invoices/paid/quarter/breakdown",
                        },
                      ],
                    },
                    {
                      icon: Folder,
                      label: "Annual Archive",
                      hasSubmenu: true,
                      submenu: [
                        {
                          icon: Calendar,
                          label: "2024 Archive",
                          path: "/documents/invoices/paid/annual/2024",
                        },
                        {
                          icon: Calendar,
                          label: "2023 Archive",
                          path: "/documents/invoices/paid/annual/2023",
                        },
                        {
                          icon: Calendar,
                          label: "2022 Archive",
                          path: "/documents/invoices/paid/annual/2022",
                        },
                        {
                          icon: Archive,
                          label: "Older Archives",
                          path: "/documents/invoices/paid/annual/older",
                        },
                      ],
                    },
                    {
                      icon: Download,
                      label: "Export Paid",
                      path: "/documents/invoices/paid/export",
                    },
                  ],
                },
                {
                  icon: Clock,
                  label: "Pending Invoices",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: AlertCircle,
                      label: "Overdue",
                      hasSubmenu: true,
                      submenu: [
                        {
                          icon: Flag,
                          label: "30+ Days Overdue",
                          path: "/documents/invoices/pending/overdue/30plus",
                        },
                        {
                          icon: AlertCircle,
                          label: "60+ Days Overdue",
                          path: "/documents/invoices/pending/overdue/60plus",
                        },
                        {
                          icon: XCircle,
                          label: "90+ Days Overdue",
                          path: "/documents/invoices/paid/quarter/breakdown",
                        },
                        {
                          icon: Trash,
                          label: "Bad Debt",
                          path: "/documents/invoices/pending/overdue/baddebt",
                        },
                      ],
                    },
                    {
                      icon: Bell,
                      label: "Reminders",
                      hasSubmenu: true,
                      submenu: [
                        {
                          icon: Send,
                          label: "Send Reminder",
                          path: "/documents/invoices/pending/reminders/send",
                        },
                        {
                          icon: Calendar,
                          label: "Schedule Reminder",
                          path: "/documents/invoices/pending/reminders/schedule",
                        },
                        {
                          icon: Mail,
                          label: "Email Templates",
                          path: "/documents/invoices/pending/reminders/templates",
                        },
                        {
                          icon: Phone,
                          label: "Call List",
                          path: "/documents/invoices/pending/reminders/calls",
                        },
                      ],
                    },
                    {
                      icon: Send,
                      label: "Send Invoice",
                      path: "/documents/invoices/pending/send",
                    },
                    {
                      icon: Edit,
                      label: "Edit Invoice",
                      path: "/documents/invoices/pending/edit",
                    },
                  ],
                },
                {
                  icon: XCircle,
                  label: "Cancelled Invoices",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: Eye,
                      label: "View Cancelled",
                      path: "/documents/invoices/cancelled/view",
                    },
                    {
                      icon: FileText,
                      label: "Cancellation Reports",
                      path: "/documents/invoices/cancelled/reports",
                    },
                    {
                      icon: Archive,
                      label: "Archive Cancelled",
                      path: "/documents/invoices/cancelled/archive",
                    },
                  ],
                },
                {
                  icon: Flag,
                  label: "Disputed Invoices",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: AlertCircle,
                      label: "Active Disputes",
                      path: "/documents/invoices/disputed/active",
                    },
                    {
                      icon: CheckCircle,
                      label: "Resolved Disputes",
                      path: "/documents/invoices/disputed/resolved",
                    },
                    {
                      icon: Users,
                      label: "Mediation Cases",
                      path: "/documents/invoices/disputed/mediation",
                    },
                  ],
                },
              ],
            },
            {
              icon: Settings,
              label: "Invoice Settings",
              hasSubmenu: true,
              submenu: [
                {
                  icon: FileText,
                  label: "Templates",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: Building,
                      label: "Corporate Templates",
                      path: "/documents/invoices/settings/templates/corporate",
                    },
                    {
                      icon: Star,
                      label: "Premium Templates",
                      path: "/documents/invoices/settings/templates/premium",
                    },
                    {
                      icon: Globe,
                      label: "International Templates",
                      path: "/documents/invoices/settings/templates/international",
                    },
                    {
                      icon: Edit,
                      label: "Custom Templates",
                      path: "/documents/invoices/settings/templates/custom",
                    },
                  ],
                },
                {
                  icon: Hash,
                  label: "Numbering",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: Calculator,
                      label: "Auto Numbering",
                      path: "/documents/invoices/settings/numbering/auto",
                    },
                    {
                      icon: Edit,
                      label: "Custom Format",
                      path: "/documents/invoices/settings/numbering/custom",
                    },
                    {
                      icon: Archive,
                      label: "Number Series",
                      path: "/documents/invoices/settings/numbering/series",
                    },
                  ],
                },
                {
                  icon: CreditCard,
                  label: "Payment Methods",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: CreditCard,
                      label: "Credit Cards",
                      path: "/documents/invoices/settings/payments/cards",
                    },
                    {
                      icon: Building,
                      label: "Bank Transfer",
                      path: "/documents/invoices/settings/payments/bank",
                    },
                    {
                      icon: Globe,
                      label: "PayPal",
                      path: "/documents/invoices/settings/payments/paypal",
                    },
                    {
                      icon: DollarSign,
                      label: "Cash Payments",
                      path: "/documents/invoices/settings/payments/cash",
                    },
                  ],
                },
                {
                  icon: Mail,
                  label: "Email Templates",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: Send,
                      label: "Invoice Email",
                      path: "/documents/invoices/settings/email/invoice",
                    },
                    {
                      icon: Bell,
                      label: "Reminder Email",
                      path: "/documents/invoices/settings/email/reminder",
                    },
                    {
                      icon: CheckCircle,
                      label: "Payment Confirmation",
                      path: "/documents/invoices/settings/email/confirmation",
                    },
                    {
                      icon: AlertCircle,
                      label: "Overdue Notice",
                      path: "/documents/invoices/settings/email/overdue",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          icon: ClipboardList,
          label: "Contracts",
          hasSubmenu: true,
          submenu: [
            {
              icon: PlusCircle,
              label: "Create Contract",
              hasSubmenu: true,
              submenu: [
                {
                  icon: FileText,
                  label: "Service Contract",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: Clock,
                      label: "Hourly Service",
                      path: "/documents/contracts/create/service/hourly",
                    },
                    {
                      icon: Package,
                      label: "Project Based",
                      path: "/documents/contracts/create/service/project",
                    },
                    {
                      icon: Calendar,
                      label: "Monthly Retainer",
                      path: "/documents/contracts/create/service/retainer",
                    },
                    {
                      icon: Shield,
                      label: "Maintenance Contract",
                      path: "/documents/contracts/create/service/maintenance",
                    },
                  ],
                },
                {
                  icon: Building,
                  label: "Vendor Contract",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: Truck,
                      label: "Supply Contract",
                      path: "/documents/contracts/create/vendor/supply",
                    },
                    {
                      icon: Globe,
                      label: "Distribution Agreement",
                      path: "/documents/contracts/create/vendor/distribution",
                    },
                    {
                      icon: Shield,
                      label: "Exclusive Partnership",
                      path: "/documents/contracts/create/vendor/exclusive",
                    },
                  ],
                },
                {
                  icon: Users,
                  label: "Employment Contract",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: User,
                      label: "Full-time Employee",
                      path: "/documents/contracts/create/employment/fulltime",
                    },
                    {
                      icon: Clock,
                      label: "Part-time Employee",
                      path: "/documents/contracts/create/employment/parttime",
                    },
                    {
                      icon: FileText,
                      label: "Contractor Agreement",
                      path: "/documents/contracts/create/employment/contractor",
                    },
                    {
                      icon: Calendar,
                      label: "Internship Contract",
                      path: "/documents/contracts/create/employment/internship",
                    },
                  ],
                },
                {
                  icon: Shield,
                  label: "NDA Contract",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: User,
                      label: "Employee NDA",
                      path: "/documents/contracts/create/nda/employee",
                    },
                    {
                      icon: Building,
                      label: "Business NDA",
                      path: "/documents/contracts/create/nda/business",
                    },
                    {
                      icon: Users,
                      label: "Mutual NDA",
                      path: "/documents/contracts/create/nda/mutual",
                    },
                  ],
                },
              ],
            },
            {
              icon: Folder,
              label: "Contract Management",
              hasSubmenu: true,
              submenu: [
                {
                  icon: CheckCircle,
                  label: "Active Contracts",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: Eye,
                      label: "View All",
                      path: "/documents/contracts/active/view",
                    },
                    {
                      icon: Search,
                      label: "Search Contracts",
                      path: "/documents/contracts/active/search",
                    },
                    {
                      icon: Filter,
                      label: "Filter Contracts",
                      path: "/documents/contracts/active/filter",
                    },
                  ],
                },
                {
                  icon: Clock,
                  label: "Pending Contracts",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: Send,
                      label: "Send for Review",
                      path: "/documents/contracts/pending/review",
                    },
                    {
                      icon: Edit,
                      label: "Edit Drafts",
                      path: "/documents/contracts/pending/edit",
                    },
                    {
                      icon: AlertCircle,
                      label: "Expiring Soon",
                      path: "/documents/contracts/pending/expiring",
                    },
                  ],
                },
                {
                  icon: Archive,
                  label: "Archived Contracts",
                  hasSubmenu: true,
                  submenu: [
                    {
                      icon: Calendar,
                      label: "2024 Archive",
                      path: "/documents/contracts/archive/2024",
                    },
                    {
                      icon: Calendar,
                      label: "2023 Archive",
                      path: "/documents/contracts/archive/2023",
                    },
                    {
                      icon: Archive,
                      label: "Older Archives",
                      path: "/documents/contracts/archive/older",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      icon: Settings,
      label: "Settings",
      hasSubmenu: true,
      submenu: [
        { icon: Cog, label: "General Settings", path: "/settings/general" },
        { icon: Lock, label: "Security Settings", path: "/settings/security" },
        { icon: Database, label: "Data Management", path: "/settings/data" },
        { icon: Zap, label: "Integrations", path: "/settings/integrations" },
      ],
    },
    {
      icon: LogOut,
      label: "Logout",
      path: "/logout",
    },
  ];

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleSubSection = (sectionIndex, subIndex) => {
    setExpandedSubSections((prev) => ({
      ...prev,
      [`${sectionIndex}-${subIndex}`]: !prev[`${sectionIndex}-${subIndex}`],
    }));
  };

  const toggleSubSubSection = (sectionIndex, subIndex, subSubIndex) => {
    setExpandedSubSubSections((prev) => ({
      ...prev,
      [`${sectionIndex}-${subIndex}-${subSubIndex}`]:
        !prev[`${sectionIndex}-${subIndex}-${subSubIndex}`],
    }));
  };

  const toggleSubSubSubSection = (
    sectionIndex,
    subIndex,
    subSubIndex,
    subSubSubIndex
  ) => {
    setExpandedSubSubSubSections((prev) => ({
      ...prev,
      [`${sectionIndex}-${subIndex}-${subSubIndex}-${subSubSubIndex}`]:
        !prev[`${sectionIndex}-${subIndex}-${subSubIndex}-${subSubSubIndex}`],
    }));
  };

  const renderMenuItem = (item, index, level = 0, parentIndices = []) => {
    const Icon = item.icon;
    const isSectionExpanded =
      level === 0
        ? expandedSections[index]
        : level === 1
        ? expandedSubSections[`${parentIndices[0]}-${index}`]
        : level === 2
        ? expandedSubSubSections[
            `${parentIndices[0]}-${parentIndices[1]}-${index}`
          ]
        : expandedSubSubSubSections[
            `${parentIndices[0]}-${parentIndices[1]}-${parentIndices[2]}-${index}`
          ];

    return (
      <div
        key={`${parentIndices.join("-")}-${index}`}
        className={`ml-${level * 4}`}
      >
        <div
          className={`flex items-center p-3 rounded-xl hover:bg-white/10 cursor-pointer transition-all duration-200 ${
            item.active ? "bg-white/20 text-white" : "text-gray-800"
          }`}
          onClick={() => {
            if (item.hasSubmenu) {
              if (level === 0 && isExpanded) toggleSection(index);
              else if (level === 1) toggleSubSection(parentIndices[0], index);
              else if (level === 2)
                toggleSubSubSection(parentIndices[0], parentIndices[1], index);
              else if (level === 3)
                toggleSubSubSubSection(
                  parentIndices[0],
                  parentIndices[1],
                  parentIndices[2],
                  index
                );
            }
          }}
        >
          <Icon className="w-5 h-5 mr-3 text-gray-800" />
          <span className={`${isExpanded ? "font-medium" : "hidden"}`}>
            {item.label}
          </span>
          {item.hasSubmenu && (
            <div className={`ml-auto ${isExpanded ? "block" : "hidden"}`}>
              {isSectionExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-800" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-800" />
              )}
            </div>
          )}
        </div>
        {item.hasSubmenu && isSectionExpanded && (
          <div className="ml-4">
            {item.submenu.map((subItem, subIndex) =>
              renderMenuItem(subItem, subIndex, level + 1, [
                ...parentIndices,
                index,
              ])
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`bg-white/10 backdrop-blur-lg border-white/40 fixed z-[999] h-screen 
              shadow-xl border-r  flex flex-col
              transition-all duration-300
              ${isExpanded ? "w-72 delay-[3ms]" : "w-20 delay-[300ms]"}`}
    >
      <div className="p-4 pb-4 bg-white/10 backdrop-blur-2xl flex items-center gap-5">
        <img
          src="/logo.png"
          alt="company_logo"
          className={`rounded-full shadow-md transition-all duration-200 ease-in ${
            isExpanded ? "h-[40px] w-[40px]" : "h-[40px] w-[40px]"
          }`}
        />
        <span
          className={`font-bold text-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text ${
            isExpanded ? "" : "hidden"
          }`}
        >
          UDHHYOG
        </span>
      </div>
      <div className="px-3 flex-1 overflow-y-auto">
        {menuItems.map((item, index) => renderMenuItem(item, index))}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`p-1 rounded-full flex ${
          isExpanded ? "justify-end" : "justify-center"
        }   mr-2 mb-2`}
      >
        {}
        <ChevronRight
          className={`text-gray-800 bg-yellow-400 w-7 h-7 transform p-1 rounded-full ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
    </nav>
  );
};

export default Navbar;
