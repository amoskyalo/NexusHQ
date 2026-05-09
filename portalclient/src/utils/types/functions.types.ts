import { FormikProps } from "formik";
import { APIResponse } from "@/hooks/types/hooks.types";
import * as Yup from "yup";

export type AnonymousObject = {
    [index: string]: string | number;
};

export type GetFormikFieldPropsArgs<Type> = {
    formik: FormikProps<Type>;
    field: keyof Type;
    isAutoComplete?: boolean;
    isGroupedCheckbox?: boolean;
    isOTP?: boolean;
    isDateTimePicker?: boolean;
    isPhone?: boolean;
    isSelect?: boolean;
    isFile?: boolean;
};

export type MutateOptionsProps<TData> = {
    successAsyncCallback?: (arg: APIResponse<TData>) => Promise<void>;
    successCallback?: (arg: APIResponse<TData>) => void;
    errorCallback?: (arg: APIResponse<TData>) => void;
    hideSuccessToast?: boolean;
};

export type MaskStringProps = {
    originalString: string;
    visibleCharCount?: number;
    maskCharacter?: string;
};

type OTPField = {
    type: "otp";
    name: string;
    length: number;
};

type MinMax = {
    num_type: "min_max";
    min: number;
    max: number;
};

type Min = {
    num_type: "min";
    min: number;
};

type Max = {
    num_type: "max";
    max: number;
};

type Default = {
    num_type: "default";
};

export type NumberField = { name: string; type: "number" } & (MinMax | Min | Max | Default);

export type OtherFields = {
    type: "email" | "password" | "array" | "string" | "phone_number";
    name: string;
};

export type FileField = {
    type: "file";
    name: string;
    allowedFileTypes?: string[];
    maxFileSize?: number;
};

export type YupExtension = {
    extend?: (schema: Yup.AnySchema, yup: typeof Yup) => Yup.AnySchema;
};

export type FieldTypes = { errorMessage?: string } & (OTPField | OtherFields | NumberField | FileField) & YupExtension;
