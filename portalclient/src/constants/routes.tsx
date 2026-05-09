import { SideNavRoute } from "@/components/navigation";
import {
    Home,
    Gauge,
    Search,
    Monitor,
    ShieldCheck,
    ShieldAlert,
    Phone,
    Ban,
    Users,
    BarChart3,
    Scale,
    Landmark,
    AlertTriangle,
    TrendingUp,
    FileBarChart,
    Settings,
} from "lucide-react";

const SI = "Safaricom Internal";
const CS = "Customer Support";
const FR = "Franchise";
const CC = "Call Centre";
const CCA = "Call Centre Analyst";
const RA = "RA";
const AML = "AML";
const AT = "AssistingTeam";
const FD = "Fraud";

const P = (controller: string, action: string) => ({ controller: `Analytica.Controllers.${controller}`, action });

export const ROUTES: SideNavRoute[] = [
    {
        title: "Main",
        kind: "header",
    },
    {
        title: "Dashboards",
        kind: "item",
        segment: "/dashboards",
        icon: <Home size={16} />,
        accessGroups: [SI, RA, AML, FD],
        children: [
            { title: "Overall", segment: "/dashboards/overall", permission: P("HomeController", "Index") },
            {
                title: "WorryFree Summaries",
                segment: "/dashboards/worry-free-summaries",
                permission: P("HomeController", "WorryFreeReports"),
            },
            { title: "Analytics", segment: "/dashboards/analytics", permission: P("HomeController", "Analytics") },
        ],
    },
    {
        title: "Monitoring",
        kind: "item",
        segment: "/monitoring",
        icon: <Gauge size={16} />,
        accessGroups: [SI, AT, FD],
        children: [
            {
                title: "Dynamic Rules",
                segment: "/monitoring/dynamic-rules",
                accessGroups: [FD],
                permission: P("HomeController", "RuleMaster"),
            },
            {
                title: "Action Manager",
                segment: "/monitoring/action-manager",
                accessGroups: [AT, FD],
                permission: P("HomeController", "AlarmManager"),
            },
            {
                title: "Bulk Actions",
                segment: "/monitoring/bulk-actions",
                accessGroups: [AT, FD],
                permission: P("HomeController", "BulkActions"),
            },
            {
                title: "B2C High Risk",
                segment: "/monitoring/b2c-monitoring/b2c-high-risk",
                accessGroups: [FD],
                permission: P("Rules", "B2CHighRisk"),
            },
            {
                title: "B2C Checker Summaries",
                segment: "/monitoring/b2c-monitoring/b2c-checker-summaries",
                accessGroups: [FD],
                permission: P("Reports", "HighRiskPaybills"),
            },
            {
                title: "P2P High Risk",
                segment: "/monitoring/p2p-high-risk",
                accessGroups: [AT, FD],
                permission: P("Rules", "P2PMonitoring"),
            },
            {
                title: "ATM High Risk",
                segment: "/monitoring/atm-high-risk",
                accessGroups: [AT, FD],
                permission: P("Rules", "ATMHighRisk"),
            },
            {
                title: "Offnet Exit Model",
                segment: "/monitoring/offnet-exit-model",
                accessGroups: [AT, FD],
                permission: P("Monitoring", "SuspiciousOffnetExit"),
            },
            {
                title: "High Risk Withdrawals",
                segment: "/monitoring/high-risk-withdrawals",
                accessGroups: [AT, FD],
                permission: P("Monitoring", "SuspiciousWithdrawals"),
            },
            {
                title: "B2C Umbrella",
                segment: "/monitoring/b2c-umbrella",
                accessGroups: [FD],
                permission: P("B2CUmbrella", "B2CExceptions"),
            },
            {
                title: "Walk-Ins",
                segment: "/monitoring/walk-ins",
                accessGroups: [SI, AT, FD],
                permission: P("Reports", "WalkingsRecords"),
            },
            {
                title: "Monitoring Notes",
                segment: "/monitoring/monitoring-notes",
                accessGroups: [FD],
                permission: P("Reports", "MonitoringNotes"),
            },
            {
                title: "Global Pay",
                segment: "/monitoring/global-pay",
                accessGroups: [FD],
                permission: P("HomeController", "GlobalPay"),
            },
        ],
    },
    {
        title: "Investigations",
        kind: "item",
        segment: "/investigations",
        icon: <Search size={16} />,
        accessGroups: [AT, FD],
        children: [
            {
                title: "Data Analysis",
                segment: "/investigations/data-analysis",
                permission: P("Reports", "OnDemandScripts"),
            },
            {
                title: "Investigations",
                segment: "/investigations/investigations",
                permission: P("WorryFree", "InvestigationClaimMaster"),
            },
            {
                title: "MMIU Reports",
                segment: "/investigations/mmiu-reports",
                permission: P("Investigations", "MMIUReports"),
            },
            {
                title: "SimSwap Details",
                segment: "/investigations/simswap-details",
                accessGroups: [FD],
                permission: P("Investigations", "GetSimSwapDetails"),
            },
            {
                title: "Mpesa App Data",
                segment: "/investigations/mpesa-app-data",
                accessGroups: [FD],
                permission: P("Investigations", "MpesaAppData"),
            },
            {
                title: "Access Review",
                segment: "/investigations/access-review",
                permission: P("Operations", "AccessReviewSubmission"),
            },
            {
                title: "Merchant Search",
                segment: "/investigations/merchant-search",
                permission: P("Investigations", "MerchantSearch"),
            },
            {
                title: "Legal Demands",
                segment: "/investigations/legal-demands",
                permission: P("AMLDynamicRules", "ExternalDemands"),
            },
            {
                title: "Link Analysis",
                segment: "/investigations/link-analysis",
                permission: P("ExternalServices", "DisputeManager"),
            },
        ],
    },
    {
        title: "Operations",
        kind: "item",
        segment: "/operations",
        icon: <Monitor size={16} />,
        accessGroups: [FD],
        children: [
            {
                title: "Due Diligence",
                segment: "/operations/due-diligence",
                permission: P("Operations", "DueDiligence"),
            },
        ],
    },
    {
        title: "Worry Free",
        kind: "item",
        segment: "/worry-free",
        icon: <ShieldCheck size={16} />,
        accessGroups: [AT, CS, FR, FD],
        children: [
            {
                title: "Claim Master",
                segment: "/worry-free/claim-master",
                accessGroups: [FD],
                permission: P("WorryFree", "ClaimMaster"),
            },
            {
                title: "Indemnity",
                segment: "/worry-free/indemnity",
                accessGroups: [CS, FR, FD],
                permission: P("WorryFree", "DocumentsApproval"),
            },
            {
                title: "Worry-Free Refunds List",
                segment: "/worry-free/refunds-list",
                accessGroups: [FD],
                permission: P("FraudServices", "WorryFreeRefunds"),
            },
            {
                title: "Reconciliation Panel",
                segment: "/worry-free/reconciliation-panel",
                accessGroups: [AT, FD],
                permission: P("Operations", "LossReconciliation"),
            },
            {
                title: "Refund Management",
                segment: "/worry-free/refund-management",
                accessGroups: [FD],
                permission: P("FraudServices", "ApprovedRefund"),
            },
            {
                title: "Valid Reports",
                segment: "/worry-free/valid-reports",
                accessGroups: [FD],
                permission: P("WorryFree", "ValidReports"),
            },
            {
                title: "All Reports",
                segment: "/worry-free/all-reports",
                accessGroups: [FD],
                permission: P("WorryFree", "Interractions"),
            },
            {
                title: "Profile",
                segment: "/worry-free/profile",
                accessGroups: [FD],
                permission: P("Insurance", "CustomerProfile"),
            },
        ],
    },
    {
        title: "Fraud Services",
        kind: "item",
        segment: "/fraud-services",
        icon: <ShieldAlert size={16} />,
        accessGroups: [SI, CS, CC, CCA, AML, FD],
        children: [
            {
                title: "Mpesa Location Register",
                segment: "/fraud-services/mpesa-location-register",
                accessGroups: [CS, CC, CCA, FD],
                permission: P("ExternalServices", "MpesaLocationRegister"),
            },
            {
                title: "Hotline Case Manager",
                segment: "/fraud-services/hotline-case-manager",
                accessGroups: [FD],
                permission: P("FraudServices", "HotlineCases"),
            },
            {
                title: "Recovery Till Access",
                segment: "/fraud-services/recovery-till-access",
                accessGroups: [SI, AML, FD],
                permission: P("FraudServices", "FraudRecovery"),
            },
        ],
    },
    {
        title: "Number Manager",
        kind: "item",
        segment: "/number-manager",
        icon: <Phone size={16} />,
        accessGroups: [SI, CS, FR, AT, AML, FD],
        children: [
            {
                title: "Primary Number",
                segment: "/number-manager/primary-number",
                permission: P("HomeController", "NumberManager"),
            },
            {
                title: "106 Manager",
                segment: "/number-manager/106-manager",
                accessGroups: [SI, CS, AT, AML, FD],
                permission: P("HomeController", "FlagMaster"),
            },
        ],
    },
    {
        title: "Blacklist Manager",
        kind: "item",
        segment: "/blacklist-manager",
        icon: <Ban size={16} />,
        accessGroups: [AT, FD],
        children: [
            {
                title: "ID Blacklist",
                segment: "/blacklist-manager/id-blacklist",
                permission: P("FraudServices", "FraudBlackList"),
            },
            {
                title: "Number Blacklist",
                segment: "/blacklist-manager/number-blacklist",
                permission: P("FraudServices", "NumberBlacklist"),
            },
        ],
    },
    {
        title: "Agent Manager",
        kind: "item",
        segment: "/agent-manager",
        icon: <Users size={16} />,
        accessGroups: [SI, AML, FD],
        children: [
            {
                title: "Approved Relocation",
                segment: "/agent-manager/approved-relocation",
                permission: P("Reports", "ApprovedRelocation"),
            },
            {
                title: "Preferred Location",
                segment: "/agent-manager/preferred-location",
                permission: P("Reports", "PreferredLocationManager"),
            },
            {
                title: "Fraud Vigilant",
                segment: "/agent-manager/fraud-vigilant",
                accessGroups: [SI, FD],
                permission: P("Agents", "FVData"),
            },
            {
                title: "Subreg User Suspension",
                segment: "/agent-manager/subreg-user-suspension",
                accessGroups: [SI, FD],
                permission: P("Agents", "SubregSuspension"),
            },
            {
                title: "Subreg Device Suspension",
                segment: "/agent-manager/subreg-device-suspension",
                accessGroups: [SI, FD],
                permission: P("Agents", "DeviceSuspension"),
            },
        ],
    },
    {
        title: "Fraud External Service",
        kind: "item",
        segment: "/fraud-external-service",
        icon: <BarChart3 size={16} />,
        accessGroups: [SI, CS, AML, FD],
        children: [
            {
                title: "Dispute Manager",
                segment: "/fraud-external-service/dispute-manager",
                permission: P("ExternalServices", "DisputeManager"),
            },
        ],
    },
    {
        title: "Arbitrage",
        kind: "item",
        segment: "/arbitrage",
        icon: <Scale size={16} />,
        accessGroups: [SI, CS, AT, AML, FD],
        children: [
            {
                title: "Transactions",
                segment: "/arbitrage/transactions",
                permission: P("HomeController", "ArbitrageCheck"),
            },
            {
                title: "Historical Transactions",
                segment: "/arbitrage/historical-transactions",
                accessGroups: [AT, FD],
                permission: P("HomeController", "HistoricalArbitrage"),
            },
        ],
    },
    {
        title: "AML",
        kind: "item",
        segment: "/aml",
        icon: <Landmark size={16} />,
        accessGroups: [AML, FD],
        children: [
            {
                title: "Dynamic Queries Rules",
                segment: "/aml/dynamic-queries-rules",
                permission: P("AMLDynamicRules", "DynamicQueries"),
            },
            {
                title: "Dynamic Queries Results",
                segment: "/aml/dynamic-queries-results",
                permission: P("AMLDynamicRules", "RuleResults"),
            },
            {
                title: "AML Escalations",
                segment: "/aml/escalations",
                permission: P("AMLDynamicRules", "AMLEscalations"),
            },
            {
                title: "External Demands",
                segment: "/aml/external-demands",
                permission: P("AMLDynamicRules", "ExternalDemands"),
            },
            {
                title: "Document Expiry",
                segment: "/aml/document-expiry",
                permission: P("AMLDynamicRules", "DocExpiryNotificationTracker"),
            },
        ],
    },
    {
        title: "Fraud/AML Escalations",
        kind: "item",
        segment: "/fraud-aml-escalations",
        icon: <AlertTriangle size={16} />,
        accessGroups: [SI, CS, FR, CC, CCA, AML, AT, FD],
        children: [
            {
                title: "Fraud Escalation",
                segment: "/fraud-aml-escalations/fraud-escalation",
                accessGroups: [SI, CS, FR, CC, CCA, AML, FD],
                permission: P("FraudEscalations", "Escalate"),
            },
            {
                title: "AML Escalation",
                segment: "/fraud-aml-escalations/aml-escalation",
                accessGroups: [SI, CS, FR, CC, CCA, AML, FD],
                permission: P("AMLDynamicRules", "Escalate"),
            },
            {
                title: "Escalations Tracker",
                segment: "/fraud-aml-escalations/escalations-tracker",
                accessGroups: [SI, AML, AT, FD],
                permission: P("FraudEscalations", "Escalations"),
            },
            {
                title: "Team Leader Escalations",
                segment: "/fraud-aml-escalations/team-leader-escalations",
                accessGroups: [SI, CS, FD],
                permission: P("FraudEscalations", "TeamLeaderPanel"),
            },
            {
                title: "Team Leader Shift Manager",
                segment: "/fraud-aml-escalations/team-leader-shift-manager",
                accessGroups: [SI, CS, FD],
                permission: P("FraudEscalations", "TeamLeaderManager"),
            },
        ],
    },
    {
        title: "Revenue Assurance",
        kind: "item",
        segment: "/revenue-assurance",
        icon: <TrendingUp size={16} />,
        accessGroups: [RA, FD],
        children: [
            {
                title: "Device Reviews",
                segment: "/revenue-assurance/device-reviews",
                permission: P("ExternalServices", "DeviceTestingSummary"),
            },
        ],
    },
    {
        title: "Reports",
        kind: "item",
        segment: "/reports",
        icon: <FileBarChart size={16} />,
        accessGroups: [AT, FD],
        children: [
            { title: "Test Paybill", segment: "/reports/test-paybill", permission: P("Reports", "TestPaybill") },
            { title: "333 Reports", segment: "/reports/333-reports", permission: P("Reports", "Valid333Reports") },
        ],
    },
    {
        title: "Admin Panel",
        kind: "item",
        segment: "/admin-panel",
        icon: <Settings size={16} />,
        accessGroups: [SI, CS, CC, CCA, RA, AML, AT, FD],
        roles: ["AnalystAdmin", "Administrator", "SA", "AMLAdmin", "AML Admin"],
        children: [
            {
                title: "Shift Manager",
                segment: "/admin-panel/shift-manager",
                permission: P("Administrator", "ShiftAlloaction"),
            },
            { title: "Timed Shift", segment: "/admin-panel/timed-shift", permission: P("Administrator", "TimedShift") },
            {
                title: "Ticket Assignment Audit",
                segment: "/admin-panel/ticket-assignment-audit",
                roles: ["Administrator", "SA"],
                permission: P("Administrator", "TicketAssignmentAudit"),
            },
            {
                title: "User Management",
                segment: "/admin-panel/user-management",
                roles: ["Administrator", "SA", "FranchiseAdmin"],
                permission: P("Administrator", "Users"),
            },
        ],
    },
];
