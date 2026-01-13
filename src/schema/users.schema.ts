export const usersValidators = {
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

    password: {
        in: "body" as const,
        notEmpty: {
            errorMessage: "Password is required",
            bail: true,
        },
        isString: {
            errorMessage: "Password must be a string",
            bail: true,
        },
        isLength: {
            options: { min: 8 },
            errorMessage: "Password must be at least 8 characters",
        },
    },

    full_name: {
        in: "body" as const,
        trim: true,
        notEmpty: {
            errorMessage: "Full name is required",
            bail: true,
        },
        isString: {
            errorMessage: "Full name must be a string",
            bail: true,
        },
        isLength: {
            options: { min: 2, max: 255 },
            errorMessage: "Full name must be between 2 and 255 characters",
        },
    },

    phone: {
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
