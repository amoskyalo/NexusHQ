"use client";

import { createContext, useContext, useState } from "react";
import { LoginContextProps, Logins } from "./types/login.types";

const LoginsContext = createContext<LoginContextProps>({
    logins: null,
    setLogins: () => {},
});

const LoginsProvider = ({ children }: { children: React.ReactNode }) => {
    const [logins, setLogins] = useState<Logins | null>(null);

    const value = {
        logins,
        setLogins,
    };

    return <LoginsContext.Provider value={value}>{children}</LoginsContext.Provider>;
};

const useLogins = () => {
    const context = useContext(LoginsContext);
    if (!context) {
        throw new Error("useLogins must be used within an LoginsProvider");
    }
    return context;
};

export { LoginsProvider, useLogins };
