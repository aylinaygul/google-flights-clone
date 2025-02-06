import { AppDispatch, RootState } from './store.ts';
import { fetchAirportsStart, fetchAirportsSuccess, fetchAirportsFailure, Airport } from './slices/airportSlice.ts';
import { fetchFlightsStart, fetchFlightsSuccess, fetchFlightsFailure, Flight } from './slices/flightSlice.ts';
import { FilterState } from './slices/filterSlice.ts';

const API_HEADERS = {
    "X-RapidAPI-Key": process.env.REACT_APP_KEY || '',
    "X-RapidAPI-Host": process.env.REACT_APP_HOST || ''
};

const API_URLS = {
    AIRPORTS: "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport",
    FLIGHTS: "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightsComplete"
};

const fetchData = async <T>(url: string, params: Record<string, string>, errorMessage: string): Promise<T> => {
    try {
        const response = await fetch(`${url}?${new URLSearchParams(params).toString()}`, { headers: API_HEADERS });

        if (!response.ok) {
            throw new Error(`${errorMessage}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : errorMessage);
    }
};

export const fetchAirports = (query: string) => async (dispatch: AppDispatch) => {
    const params = { query, locale: 'en-US' };

    dispatch(fetchAirportsStart());

    try {
        const data = await fetchData<{ data: any[] }>(API_URLS.AIRPORTS, params, "Failed to fetch airports");

        if (data?.data?.length) {
            const formattedAirports: Airport[] = data.data.map((airport) => ({
                skyId: airport.skyId,
                entityId: airport.entityId,
                title: airport.presentation?.title || "",
                suggestionTitle: airport.presentation?.suggestionTitle || "",
                subtitle: airport.presentation?.subtitle || "",
                entityType: airport.navigation?.entityType || "",
                localizedName: airport.navigation?.localizedName || "",
            }));

            dispatch(fetchAirportsSuccess(formattedAirports));
        } else {
            dispatch(fetchAirportsFailure("No airports found."));
        }
    } catch (error) {
        dispatch(fetchAirportsFailure(error.message));
    }
};

export const fetchFlights = (filters: Partial<FilterState>) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(fetchFlightsStart());

    try {
        const data = await fetchData<{ data: { itineraries: any[] } }>(
            API_URLS.FLIGHTS,
            { ...filters, limit: "10" } as Record<string, string>,
            "Failed to fetch flights"
        );

        if (data?.data?.itineraries?.length) {
            const formattedFlights: Flight[] = data.data.itineraries.map((flight) => ({
                skyId: flight.id,
                price: flight.price?.formatted || "",
                departure: flight.legs?.[0]?.departure || "",
                arrival: flight.legs?.[0]?.arrival || "",
                origin: flight.legs?.[0]?.origin?.name || "",
                destination: flight.legs?.[0]?.destination?.name || "",
                flightDuration: flight.legs?.[0]?.durationInMinutes || 0,
                carrier: flight.legs?.[0]?.carriers?.marketing?.[0]?.name || "",
                flightNumber: flight.legs?.[0]?.segments?.[0]?.flightNumber || "",
            }));

            dispatch(fetchFlightsSuccess(formattedFlights));
        } else {
            dispatch(fetchFlightsFailure("No flights found."));
        }
    } catch (error) {
        dispatch(fetchFlightsFailure(error.message));
    }
};
