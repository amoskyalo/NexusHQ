import { DialogProps } from "@mui/material";

export type MenuDialogProps = {
    anchorEl: null | HTMLElement;
    setAnchorEl: (anchorEl: null | HTMLElement) => void;
    children: React.ReactNode;
};

export type ActionDialogProps = {
    open: boolean;
    loading: boolean;
    dialogTitle?: string;
    contentText?: string;
    onOkayButtonText?: string;
    onCancelButtonText?: string;
    onCancel: () => void;
    onOkay: () => void;
    blur?: boolean;
    color?: string;
};

export type FormDialogProps = DialogProps & {
    dialogTitle: string;
    dialogSubTitle?: string;
    showBottomBorder?: boolean;
    hideBottomPadding?: boolean;
    blur?: boolean;
};
