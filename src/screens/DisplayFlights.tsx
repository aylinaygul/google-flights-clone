import React from "react";

import { Container } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store.ts";
import { fetchFlights } from "../redux/thunks.ts";

import SearchBar from "../components/SearchBar.tsx";
import CustomDataGrid from "../components/CustomDataGrid.tsx";

const DisplayFlights: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { originSkyId, destinationSkyId, date, originEntityId, destinationEntityId } = useSelector((state: RootState) => state.filter);

    const handleSearch = () => {
        if (!originSkyId || !destinationSkyId || !date) return;
        const filters = {
            originSkyId,
            destinationSkyId,
            date,
            adults: "1",
            originEntityId,
            destinationEntityId,
            currency: "USD",
            market: "US",
            countryCode: "US"
        };
        dispatch(fetchFlights(filters));
    };

    return (
        <Container sx={{ mt: 4 }}>
            <SearchBar handleSearch={handleSearch} />
            <CustomDataGrid />
        </Container>
    );
};

export default DisplayFlights;
