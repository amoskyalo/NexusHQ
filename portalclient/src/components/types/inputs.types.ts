import { TextFieldProps, SelectProps, SxProps, AutocompleteProps } from "@mui/material";
import { DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { DateTimePickerProps } from "@mui/x-date-pickers/DateTimePicker";

export type OTPFieldProps = Omit<TextFieldProps, "onChange"> & {
    length?: number;
    onChange?: (arg: string | number) => void;
};

export type TextInputProps = TextFieldProps & {
    label: string;
    isPassword?: boolean;
    isCurrency?: boolean;
    overideLabelStyles?: SxProps;
    info?: string;
};

export type SelectFieldProps = Omit<SelectProps, "onChange"> & {
    options?: { value: string | number; label: string; description?: string }[];
    children?: React.ReactNode;
    helperText?: string | boolean;
    placeholder?: string;
    overideLabelStyles?: SxProps;
    onChange?: (value: any) => void;
    showSearch?: boolean;
    loading?: boolean;
    info?: string;
};

export type PhoneInputProps = Omit<TextFieldProps, "onChange"> &
    Pick<TextInputProps, "info"> & {
        label: string;
        size?: "small" | "medium";
        poperWidth?: number;
        onChange?: (value: any) => void;
        overideLabelStyles?: SxProps;
    };

export type AutocompleteFieldProps = Omit<AutocompleteProps<any, any, any, any>, "renderInput"> & {
    label?: string;
    error?: boolean;
    helperText?: string;
    placeholder?: string;
};

export type DatePickerFieldProps = Omit<DatePickerProps<true>, "slotProps"> & {
    label?: string;
    error?: boolean;
    helperText?: string;
};

export type DateTimePickerFieldProps = Omit<DateTimePickerProps<true>, "slotProps"> & {
    label?: string;
    error?: boolean;
    helperText?: string;
};
