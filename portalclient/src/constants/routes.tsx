import { SideNavRoute } from "@/components/navigation";
import {
    Home,
    Users,
    Settings,
    Building2,
    Calendar,
    Briefcase,
    FileText,
    BarChart,
    DollarSign,
    CreditCard,
    Receipt,
    TrendingUp,
    Monitor,
    Key,
    HardDrive,
    Wifi,
    LayoutDashboard,
    Ticket,
    FolderKanban,
    GitPullRequest,
    Timer,
    Network,
} from "lucide-react";

export const ROUTES: SideNavRoute[] = [
    // ─── MAIN ───────────────────────────────────────────
    {
        title: "Main",
        kind: "header",
    },
    {
        title: "Dashboard",
        kind: "item",
        segment: "/dashboard",
        icon: <Home size={16} />,
    },
    {
        title: "Organizations",
        kind: "item",
        segment: "/organizations",
        icon: <Building2 size={16} />,
    },

    // ─── HR ─────────────────────────────────────────────
    {
        title: "HR",
        kind: "header",
    },
    {
        title: "Departments",
        kind: "item",
        segment: "/departments",
        icon: <Network size={16} />,
    },
    {
        title: "Employees",
        kind: "item",
        segment: "/employees",
        icon: <Users size={16} />,
    },
    {
        title: "Leave Management",
        kind: "item",
        segment: "/leave",
        icon: <Calendar size={16} />,
    },
    {
        title: "Recruitment",
        kind: "item",
        segment: "/recruitment",
        icon: <Briefcase size={16} />,
    },
    {
        title: "Documents",
        kind: "item",
        segment: "/documents",
        icon: <FileText size={16} />,
    },
    {
        title: "HR Reports",
        kind: "item",
        segment: "/hr/reports",
        icon: <BarChart size={16} />,
    },

    // ─── FINANCE ────────────────────────────────────────
    {
        title: "Finance",
        kind: "header",
    },
    {
        title: "Payroll",
        kind: "item",
        segment: "/payroll",
        icon: <DollarSign size={16} />,
    },
    {
        title: "Expenses",
        kind: "item",
        segment: "/expenses",
        icon: <Receipt size={16} />,
    },
    {
        title: "Payments",
        kind: "item",
        segment: "/payments",
        icon: <CreditCard size={16} />,
    },
    {
        title: "Finance Reports",
        kind: "item",
        segment: "/finance/reports",
        icon: <TrendingUp size={16} />,
    },

    // ─── TECH ───────────────────────────────────────────
    {
        title: "Tech",
        kind: "header",
    },
    {
        title: "Devices",
        kind: "item",
        segment: "/devices",
        icon: <Monitor size={16} />,
    },
    {
        title: "User Accounts",
        kind: "item",
        segment: "/accounts",
        icon: <Key size={16} />,
    },
    {
        title: "Asset Inventory",
        kind: "item",
        segment: "/assets",
        icon: <HardDrive size={16} />,
    },
    {
        title: "Network & Access",
        kind: "item",
        segment: "/network",
        icon: <Wifi size={16} />,
    },

    // ─── AGILE ──────────────────────────────────────────
    {
        title: "Agile",
        kind: "header",
    },
    {
        title: "Board",
        kind: "item",
        segment: "/board",
        icon: <LayoutDashboard size={16} />,
    },
    {
        title: "Projects",
        kind: "item",
        segment: "/projects",
        icon: <FolderKanban size={16} />,
    },
    {
        title: "Tickets",
        kind: "item",
        segment: "/tickets",
        icon: <Ticket size={16} />,
    },
    {
        title: "Sprints",
        kind: "item",
        segment: "/sprints",
        icon: <GitPullRequest size={16} />,
    },
    {
        title: "Time Tracking",
        kind: "item",
        segment: "/time-tracking",
        icon: <Timer size={16} />,
    },

    // ─── GENERAL ────────────────────────────────────────
    {
        title: "General",
        kind: "header",
    },
    {
        title: "Settings",
        kind: "item",
        segment: "/settings",
        icon: <Settings size={16} />,
    },
];
