import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
    originSkyId: string;
    destinationSkyId: string;
    date: string;
    adults: string;
    sortBy: string;
    originEntityId: string;
    destinationEntityId: string;
    currency: string;
    market: string;
    countryCode: string;
    fromSearchTerm: string;
    toSearchTerm: string;
}

const initialState: FilterState = {
    originSkyId: "",
    destinationSkyId: "",
    date: "",
    adults: "1",
    sortBy: "best",
    originEntityId: "",
    destinationEntityId: "",
    currency: "USD",
    market: "US",
    countryCode: "US",
    fromSearchTerm: "",
    toSearchTerm: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilter: <K extends keyof FilterState>(state, action: PayloadAction<{ key: K; value: FilterState[K] }>) => {
            state[action.payload.key] = action.payload.value;
        },
        clearFilters: () => initialState,
    },
});

export const { setFilter, clearFilters } = filterSlice.actions;

export default filterSlice.reducer;
