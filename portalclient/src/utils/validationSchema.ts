import * as Yup from "yup";
import { FieldTypes } from "./types/functions.types";
import { isValidPhoneNumber, validatePhoneNumberLength } from "libphonenumber-js";

const { string, array, object, number, mixed } = Yup;

export function getValidationSchema(args: Array<FieldTypes>) {
    function getFieldValidationType(field: FieldTypes): Yup.AnySchema {
        let schema: Yup.AnySchema;

        switch (field.type) {
            case "email":
                schema = string()
                    .email()
                    .required(field.errorMessage ?? "Email is required");
                break;
            case "password":
                schema = string().required(field.errorMessage ?? "Password is required");
                break;
            case "array":
                schema = array()
                    .of(string())
                    .required(field.errorMessage ?? "Array is required");
                break;
            case "otp":
                schema = string()
                    .length(field.length, `Your OTP must be exactly ${field.length} digits long`)
                    .required(field.errorMessage ?? "Please enter the OTP code to continue");
                break;
            case "number":
                if (field.num_type === "min_max") {
                    schema = number()
                        .required(field.errorMessage ?? "Field is required")
                        .min(field.min, `Value cannot be less than ${field.min}`)
                        .max(field.max, `Value cannot be more than ${field.max}`);
                } else if (field.num_type === "min") {
                    schema = number()
                        .required(field.errorMessage ?? "Field is required")
                        .min(field.min, `Value cannot be less than ${field.min}`);
                } else if (field.num_type === "max") {
                    schema = number()
                        .required(field.errorMessage ?? "Field is required")
                        .max(field.max, `Value cannot be more than ${field.max}`);
                } else {
                    schema = number().required(field.errorMessage ?? "Field is required");
                }
                break;
            case "phone_number":
                schema = string()
                    .required(field.errorMessage ?? "Phone number is required")
                    .typeError("Invalid phone number")
                    .test("isValid", "Invalid phone number", (value) => isValidPhoneNumber(String(value), "KE"))
                    .test(
                        "isValidLength",
                        "Invalid phone number length",
                        (value) => validatePhoneNumberLength(String(value), "KE") === undefined,
                    );
                break;
            case "file":
                schema = mixed()
                    .required(field.errorMessage ?? "File is required")
                    .test("fileType", "Unsupported file format", (value) => {
                        if (!value) return false;
                        const file = value as File;
                        if (!field.allowedFileTypes || field.allowedFileTypes.length === 0) return true;
                        return field.allowedFileTypes.some((type) =>
                            file.name.toLowerCase().endsWith(type.toLowerCase()),
                        );
                    })
                    .test("fileSize", "File size must be less than 10MB", (value) => {
                        if (!value) return false;
                        const file = value as File;
                        const maxSize = field.maxFileSize || 10 * 1024 * 1024;
                        return file.size <= maxSize;
                    });
                break;
            default:
                schema = string().required(field.errorMessage ?? "Field is required");
        }

        if (field.extend) {
            schema = field.extend(schema, Yup);
        }

        return schema;
    }

    const schema = args.reduce<Record<string, Yup.AnySchema>>((acc, arg) => {
        acc[arg.name] = getFieldValidationType(arg);
        return acc;
    }, {});

    return object().shape(schema);
}
