import { useGridApiContext } from "@mui/x-data-grid";
import { useCallback, useState, useEffect } from "react";
import { SearchInput } from "./SearchInput";

export const DataGridSearchInput = ({ placeholder }: { placeholder?: string }) => {
    const apiRef = useGridApiContext();
    const [searchValue, setSearchValue] = useState("");

    const updateSearchValue = useCallback(
        (newSearchValue: string) => {
            apiRef.current.setQuickFilterValues([newSearchValue]);
        },
        [apiRef]
    );

    useEffect(() => {
        updateSearchValue(searchValue);
    }, [searchValue, updateSearchValue]);

    return (
        <SearchInput
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder={placeholder}
        />
    );
};
