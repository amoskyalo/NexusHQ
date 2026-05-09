import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Stack, Tooltip, Box } from "@mui/material";
import { FormDialogProps } from "../types/dialogs.types";
import CloseIcon from "@mui/icons-material/Close";

export const FormDialog = (props: FormDialogProps) => {
    const {
        dialogTitle,
        dialogSubTitle,
        children,
        maxWidth,
        onClose,
        showBottomBorder,
        hideBottomPadding,
        fullWidth,
        blur = false,
        sx,
        ...rest
    } = props;

    return (
        <Dialog
            {...rest}
            sx={{
                backdropFilter: blur ? "blur(4px)" : "none",
                "& .MuiDialog-paper": {
                    borderRadius: "16px",
                },
                ...sx,
            }}
            maxWidth={maxWidth ?? "xs"}
            fullWidth={fullWidth ?? true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ padding: 0 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        pl: 2.5,
                        pr: 2,
                        pt: 2,
                        pb: hideBottomPadding ? 0 : 1.5,
                        borderBottom: showBottomBorder ? 1 : 0,
                        borderColor: "divider",
                    }}
                >
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {dialogTitle}
                        </Typography>
                        {dialogSubTitle && (
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                                {dialogSubTitle}
                            </Typography>
                        )}
                    </Box>

                    <Tooltip title="Close">
                        <IconButton onClick={(e) => onClose?.(e, "backdropClick")} size="small">
                            <CloseIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </DialogTitle>
            <DialogContent id="form-dialog-content">{children}</DialogContent>
        </Dialog>
    );
};
