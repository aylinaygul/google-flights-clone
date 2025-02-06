import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Flight {
    skyId: string;
    price: string;
    departure: string;
    arrival: string;
    origin: string;
    destination: string;
    flightDuration: number;
    carrier: string;
    flightNumber: string;
}

interface FlightState {
    flights: Flight[];
    isLoading: boolean;
    error: string | null;
}

const initialState: FlightState = {
    flights: [],
    isLoading: false,
    error: null,
};

const flightSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {
        fetchFlightsStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchFlightsSuccess: (state, action: PayloadAction<Flight[]>) => {
            state.isLoading = false;
            state.flights = action.payload;
        },
        fetchFlightsFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchFlightsStart, fetchFlightsSuccess, fetchFlightsFailure } = flightSlice.actions;
export default flightSlice.reducer;
