import { configureStore } from '@reduxjs/toolkit';

import airportReducer from './slices/airportSlice.ts';
import flightReducer from './slices/flightSlice.ts';
import filterReducer from './slices/filterSlice.ts';

export const store = configureStore({
    reducer: {
        airports: airportReducer,
        flights: flightReducer,
        filter: filterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;