import {
    Dialog,
    Button,
    DialogTitle,
    DialogActions,
    DialogContent,
    CircularProgress,
    DialogContentText,
    Stack,
    Typography,
} from "@mui/material";
import { ActionDialogProps } from "../types/dialogs.types";

export const ActionDialog = (props: ActionDialogProps) => {
    const {
        open,
        loading,
        onCancel,
        onOkay,
        dialogTitle,
        contentText,
        onCancelButtonText,
        onOkayButtonText = "Delete",
        blur,
        color = "primary",
    } = props;

    const handleCancel = () => {
        if (!loading) {
            onCancel();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            maxWidth="xs"
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                backdropFilter: blur ? "blur(4px)" : "none",
                "& .MuiDialog-paper": {
                    borderRadius: "16px",
                },
            }}
        >
            <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 600 }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {dialogTitle ?? "Delete item?"}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography variant="body2">
                        {contentText ?? "Are you sure you want to delete this item? This action is irreversible!"}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={2} sx={{ pb: 2, px: 2 }}>
                    <Button
                        color="inherit"
                        disabled={loading}
                        onClick={onCancel}
                        disableElevation
                        sx={{ backgroundColor: "action.hover", px: 2 }}
                    >
                        {onCancelButtonText ?? "Cancel"}
                    </Button>
                    <Button
                        onClick={onOkay}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={14} color="inherit" /> : ""}
                        color={
                            ["Delete", "Disable", "Deactivate"].includes(onOkayButtonText) ? "error" : (color as any)
                        }
                        variant="contained"
                        disableElevation
                        sx={{ color: "white" }}
                    >
                        {onOkayButtonText}
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};
