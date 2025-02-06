import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Airport {
    skyId: string;
    entityId: string;
    title: string;
    suggestionTitle: string;
    subtitle: string;
    entityType: string;
    localizedName: string;
}

interface AirportState {
    airports: Airport[];
    isLoading: boolean;
    error: string | null;
}

const initialState: AirportState = {
    airports: [],
    isLoading: false,
    error: null,
};

const airportSlice = createSlice({
    name: "airports",
    initialState,
    reducers: {
        fetchAirportsStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchAirportsSuccess: (state, action: PayloadAction<Airport[]>) => {
            state.isLoading = false;
            state.airports = action.payload;
        },
        fetchAirportsFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchAirportsStart, fetchAirportsSuccess, fetchAirportsFailure } = airportSlice.actions;
export default airportSlice.reducer;
