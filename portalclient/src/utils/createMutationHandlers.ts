import { APIResponse } from "@/hooks/types/hooks.types";
import { MutateOptionsProps } from "./types/functions.types";
import { snackbarToast } from "@/components/snackbar";

export function createMutationHandlers<TBody>({
    successCallback,
    successAsyncCallback,
    errorCallback,
    hideSuccessToast,
}: MutateOptionsProps<TBody>) {
    const success = (body: APIResponse<TBody>) => {
        const { message } = body;
        if (!hideSuccessToast) {
            snackbarToast.success(message);
        }
        successCallback?.(body);
    };

    const successAsync = async (body: APIResponse<TBody>) => {
        const { message } = body;
        if (!hideSuccessToast) {
            snackbarToast.success(message);
        }
        await successAsyncCallback?.(body);
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
