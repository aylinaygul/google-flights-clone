import React, { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, Container } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";

const CustomDataGrid: React.FC = () => {
    const { flights, isLoading: flightsLoading } = useSelector((state: RootState) => state.flights);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const columns = [
        { field: "carrier", headerName: "Airline", flex: 1 },
        { field: "departure", headerName: "Departure Time", flex: 1 },
        { field: "arrival", headerName: "Arrival Time", flex: 1 },
        { field: "price", headerName: "Price", flex: 1 },
    ];

    return (
        <Container sx={{ mt: 4, width: '100%' }}>
            {flightsLoading ? (
                <CircularProgress sx={{ display: 'block', margin: 'auto' }} />
            ) : (
                <DataGrid
                    rows={flights.map((flight, index) => ({ id: index, ...flight }))}
                    columns={columns}
                    pagination
                    paginationModel={{ page, pageSize }}
                    onPaginationModelChange={(model) => {
                        setPage(model.page);
                        setPageSize(model.pageSize);
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    autoHeight
                    disableRowSelectionOnClick
                    sx={{
                        boxShadow: 2,
                        borderRadius: 2,
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#f0f0f0',
                            color: '#333',
                        },
                        '& .MuiDataGrid-cell': {
                            padding: '10px',
                        },
                        '& .MuiPaginationItem-root': {
                            borderRadius: 3,
                        },
                    }}
                />
            )}
        </Container>
    );
};

export default CustomDataGrid;
