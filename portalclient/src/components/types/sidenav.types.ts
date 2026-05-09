import type { ReactNode } from "react";

export type SideNavRoute = {
    title: string;
    kind?: "header" | "item";
    segment?: string;
    icon?: ReactNode;
    children?: SideNavRoute[];
    roles?: string[];
    accessGroups?: string[];
    permission?: { controller: string; action: string };
};

export type SideNavProps = {
    routes: SideNavRoute[];
};