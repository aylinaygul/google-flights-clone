import React from "react";

import { Grid, Button, TextField, Autocomplete } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store.ts";
import { fetchAirports } from "../redux/thunks.ts";
import { setFilter } from "../redux/slices/filterSlice.ts";
import { Airport } from "../redux/slices/airportSlice.ts";

interface SearchBarProps {
    handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { airports } = useSelector((state: RootState) => state.airports);
    const { date } = useSelector((state: RootState) => state.filter);

    const handleSearchTermChange = (key: "fromSearchTerm" | "toSearchTerm", value: string) => {
        dispatch(setFilter({ key, value }));
        dispatch(fetchAirports(value.length > 0 ? value : "a"));
    };

    return (
        <Grid container spacing={2} justifyContent="center" alignItems={"center"}>
            <Grid item xs={11} sm={3}>
                <Autocomplete
                    options={airports}
                    getOptionLabel={(option: Airport) => option.title}
                    renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
                    onInputChange={(event, value) => handleSearchTermChange("fromSearchTerm", value)}
                    onChange={(event, value: Airport | null) => {
                        if (value) {
                            dispatch(setFilter({ key: "originSkyId", value: value.skyId || "" }));
                            dispatch(setFilter({ key: "originEntityId", value: value.entityId || "" }));
                        }
                    }}
                />
            </Grid>
            <Grid item xs={11} sm={3}>
                <Autocomplete
                    options={airports}
                    getOptionLabel={(option: Airport) => option.title}
                    renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
                    onInputChange={(event, value) => handleSearchTermChange("toSearchTerm", value)}
                    onChange={(event, value: Airport | null) => {
                        if (value) {
                            dispatch(setFilter({ key: "destinationSkyId", value: value.skyId || "" }));
                            dispatch(setFilter({ key: "destinationEntityId", value: value.entityId || "" }));
                        }
                    }}
                />
            </Grid>
            <Grid item xs={11} sm={3}>
                <TextField
                    label="Date"
                    type="date"
                    value={date}
                    onChange={(e) => dispatch(setFilter({ key: "date", value: e.target.value }))}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
            </Grid>
            <Grid item xs={11} sm={2}>
                <Button variant="contained" fullWidth onClick={handleSearch}>
                    Search
                </Button>
            </Grid>
        </Grid>
    );
};

export default SearchBar;
