import { APIResponse } from "@/hooks/types/hooks.types";
import { MutateOptionsProps } from "./types/functions.types";
import { snackbarToast } from "@/components/snackbar";

export function createMutationHandlers<TData>({
    successCallback,
    successAsyncCallback,
    errorCallback,
    hideSuccessToast,
}: MutateOptionsProps<TData>) {
    const success = (data: APIResponse<TData>) => {
        const { message } = data;
        if (!hideSuccessToast) {
            snackbarToast.success(message);
        }
        successCallback?.(data);
    };

    const successAsync = async (data: APIResponse<TData>) => {
        const { message } = data;
        if (!hideSuccessToast) {
            snackbarToast.success(message);
        }
        await successAsyncCallback?.(data);
    };

    const onError = (error: any) => {
        const message = error.response?.data?.message ?? "Network error occurred!";
        snackbarToast.error(message);
        errorCallback?.(error);
    };

    return {
        onSuccess: typeof successAsyncCallback == "function" ? successAsync : success,
        onError,
    };
}
