export const createEmployeeValidator = {
    email: {
        in: "body" as const,
        trim: true,
        notEmpty: {
            errorMessage: "Email is required",
            bail: true,
        },
        isString: {
            errorMessage: "Email must be a string",
            bail: true,
        },
        isEmail: {
            errorMessage: "Invalid email address",
            bail: true,
        },
        normalizeEmail: true,
    },

    firstName: {
        in: "body" as const,
        trim: true,
        notEmpty: {
            errorMessage: "First name is required",
            bail: true,
        },
        isString: {
            errorMessage: "First name must be a string",
            bail: true,
        },
        isLength: {
            options: { min: 2, max: 255 },
            errorMessage: "First name must be between 2 and 255 characters",
        },
    },

    lastName: {
        in: "body" as const,
        trim: true,
        notEmpty: {
            errorMessage: "Last name is required",
            bail: true,
        },
        isString: {
            errorMessage: "Last name must be a string",
            bail: true,
        },
        isLength: {
            options: { min: 2, max: 255 },
            errorMessage: "Last name must be between 2 and 255 characters",
        },
    },

    phoneNumber: {
        in: "body" as const,
        trim: true,
        notEmpty: {
            errorMessage: "Phone number is required",
            bail: true,
        },
        isString: {
            errorMessage: "Phone number must be a string",
            bail: true,
        },
        isLength: {
            options: { max: 50 },
            errorMessage: "Phone number too long",
        },
    },
};
