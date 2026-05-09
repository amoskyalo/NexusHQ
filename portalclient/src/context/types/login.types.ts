import { Dispatch, SetStateAction } from "react";

export type Logins = {
    username: string;
    password: string;
    biller_number?: string;
};

export type LoginContextProps = {
    logins: Logins | null;
    setLogins: Dispatch<SetStateAction<Logins | null>>;
};
