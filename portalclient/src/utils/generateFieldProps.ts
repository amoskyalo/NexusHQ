import type { GetFormikFieldPropsArgs } from "./types/functions.types";
import { AsYouType } from "libphonenumber-js";
import dayjs from "dayjs";

export function getFormikFieldProps<Type>(args: GetFormikFieldPropsArgs<Type>): any {
    const { formik, field, isAutoComplete, isGroupedCheckbox, isOTP, isDateTimePicker, isPhone, isSelect, isFile } =
        args;
    const { values, errors, touched, getFieldProps, setFieldValue } = formik;

    const formField = String(field);

    const error = touched[field] && Boolean(errors[field]);
    const helperText = touched[field] && (errors[field] as any);

    const handleAutoCompleteChange = (__: React.SyntheticEvent, newValue: any) => {
        setFieldValue(formField, newValue);
    };

    const handleGroupedCheckboxChange = (__: React.ChangeEvent<HTMLInputElement>, newValue: any) => {
        setFieldValue(formField, newValue);
    };

    const handleOTPChange = (value: string) => {
        setFieldValue(formField, value);
    };

    const handleDateTimePickerChange = (value: any) => {
        if (value) {
            const formatedValue = value.format("YYYY-MM-DD HH:mm:ss");
            setFieldValue(formField, formatedValue);
        } else {
            setFieldValue(formField, "");
        }
    };

    const handlePhoneChange = (onChangeValues: any) => {
        const startIndex = String(onChangeValues?.phone).length > 4 ? 2 : 1;
        const formatedValue = new AsYouType("KE").input(onChangeValues?.phone + onChangeValues?.value);

        setFieldValue(formField, String(formatedValue).split(" ").slice(startIndex).join(" "));
    };

    const handleSelectChange = (value: any) => {
        setFieldValue(formField, value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFieldValue(formField, file);
        }
    };

    const commonProps = {
        error,
        helperText,
    };

    if (isFile) {
        return {
            onChange: handleFileChange,
            value: values[field],
            ...commonProps,
        };
    }

    if (isPhone) {
        return {
            onChange: handlePhoneChange,
            value: values[field],
            ...commonProps,
        };
    }

    if (isDateTimePicker) {
        const rawValue = values[field] as string | number | Date | undefined;
        return {
            onChange: handleDateTimePickerChange,
            value: rawValue ? dayjs(rawValue) : null,
            ...commonProps,
        };
    }

    if (isAutoComplete) {
        return {
            onChange: handleAutoCompleteChange,
            value: values[field],
            multiple: true,
            ...commonProps,
        };
    }

    if (isGroupedCheckbox) {
        return {
            onChange: handleGroupedCheckboxChange,
            value: values[field],
            ...commonProps,
        };
    }

    if (isOTP) {
        return {
            onChange: handleOTPChange,
            ...commonProps,
        };
    }

    if (isSelect) {
        return {
            onChange: handleSelectChange,
            value: values[field],
            ...commonProps,
        };
    }

    return {
        ...commonProps,
        ...getFieldProps(formField),
    };
}
