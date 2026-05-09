"use client";

import { Stack, Button } from "@mui/material";
import { FormDialog } from "./form-dialog";
import { LoadingButton } from "../buttons";

type DownloadFilterDialogProps = {
    open: boolean;
    onClose: () => void;
    onDownload: () => void | Promise<void>;
    loading?: boolean;
    dialogTitle?: string;
    dialogSubTitle?: string;
    children: React.ReactNode;
};

/**
 * Modal that collects filter inputs (date range, status, etc.) and triggers a
 * server-side filtered export. Used by grid pages that need range-based
 * Excel downloads — mirrors v1's bs-*-download-modal pattern.
 *
 * The page passes the filter inputs as `children` and an `onDownload` callback
 * that does: fetch BFF route → blob → saveBlob(...).
 */
export const DownloadFilterDialog = ({
    open,
    onClose,
    onDownload,
    loading = false,
    dialogTitle = "Download",
    dialogSubTitle,
    children,
}: DownloadFilterDialogProps) => {
    return (
        <FormDialog
            open={open}
            onClose={onClose}
            dialogTitle={dialogTitle}
            dialogSubTitle={dialogSubTitle}
            maxWidth="sm"
        >
            <Stack spacing={2} sx={{ pt: 1 }}>
                {children}
                <Stack direction="row" justifyContent="flex-end" spacing={1.5} sx={{ pt: 1 }}>
                    <Button variant="outlined" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <LoadingButton variant="contained" color="secondary" loading={loading} onClick={onDownload}>
                        Download
                    </LoadingButton>
                </Stack>
            </Stack>
        </FormDialog>
    );
};
