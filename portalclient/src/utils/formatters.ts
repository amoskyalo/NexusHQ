import dayjs from "dayjs";

export const formatters = () => {
    const lowerCaseString = (str: string) => {
        const trimmedStr = str.trim();
        return trimmedStr.charAt(0).toUpperCase() + trimmedStr.slice(1).toLowerCase();
    };

    const formatDate = (date: Date | string | number, hideTime = false) => {
        const defaultOptions: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "short",
            day: "numeric",
            ...(hideTime ? {} : { hour: "2-digit", minute: "2-digit" }),
        };
        return new Intl.DateTimeFormat("en-US", defaultOptions).format(new Date(date));
    };

    const formatCurrency = (currency: string, amount: number | string) => {
        const numericAmount = typeof amount === "string" ? Number.parseFloat(amount) : amount;
        const options: Intl.NumberFormatOptions = {
            currency,
            style: "currency",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        };
        return new Intl.NumberFormat("en-US", options).format(numericAmount);
    };

    const formatPhoneNumber = (phoneNumber: string) => {
        return `254${phoneNumber.replaceAll(" ", "")}`;
    };

    const getGreeting = () => {
        const currentHour = dayjs().hour();

        if (currentHour < 12) {
            return "Good morning";
        } else if (currentHour < 18) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    };

    const getDateRange = (period: "last7days" | "last3months" | "last6months") => {
        const endDate = dayjs().format("YYYY-MM-DD");
        let startDate = "";

        switch (period) {
            case "last7days":
                startDate = dayjs().subtract(7, "days").format("YYYY-MM-DD");
                break;
            case "last3months":
                startDate = dayjs().subtract(3, "months").format("YYYY-MM-DD");
                break;
            case "last6months":
                startDate = dayjs().subtract(6, "months").format("YYYY-MM-DD");
                break;
        }

        return { startDate, endDate };
    };

    const getDisplayDates = (dateRange: { startDate: string; endDate: string }) => {
        return {
            startDisplay: dayjs(dateRange.startDate).format("MMM DD"),
            endDisplay: dayjs(dateRange.endDate).format("MMM DD"),
        };
    };

    const capitalizeText = (text: string) => {
        const fChar = text.charAt(0);
        const restChar = text.slice(1).toLowerCase();

        return fChar + restChar;
    };

    const getColumnTypes = (name: string) => {
        const string = name.toLowerCase();

        if (string.includes("date added")) {
            return "date";
        }

        if (string.includes("status")) {
            return "status";
        }

        if (string.includes("owner")) {
            return "owner";
        }

        if (string.includes("amount") || string.includes("amt")) {
            return "currency";
        }
    };

    return {
        lowerCaseString,
        formatDate,
        formatCurrency,
        formatPhoneNumber,
        getGreeting,
        getDateRange,
        getDisplayDates,
        capitalizeText,
        getColumnTypes,
    };
};
