"use client";

import { useEffect, useState, useCallback } from "react";
import { ActionDialog } from "@/components/dialogs/action-dialog";

type Callback = () => void;

const sessionEvents = {
    callbacks: [] as Callback[],

    on(callback: Callback) {
        this.callbacks.push(callback);
    },

    off(callback: Callback) {
        this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    },

    trigger() {
        this.callbacks.forEach((callback) => callback());
    },
};

export const sessionExpired = {
    emit() {
        sessionEvents.trigger();
    },
};

export const SessionExpiredDialog = () => {
    const [open, setOpen] = useState(false);

    const handleSessionExpired = useCallback(() => {
        setOpen(true);
    }, []);

    useEffect(() => {
        sessionEvents.on(handleSessionExpired);
        return () => sessionEvents.off(handleSessionExpired);
    }, [handleSessionExpired]);

    const handleLogin = () => {
        globalThis.location.replace("/auth/login");
    };

    return (
        <ActionDialog
            open={open}
            loading={false}
            dialogTitle="Session Expired"
            contentText="Your session has expired. Please log in again to continue."
            onOkayButtonText="Log In"
            onCancelButtonText="Dismiss"
            onCancel={() => setOpen(false)}
            onOkay={handleLogin}
            blur
        />
    );
};
