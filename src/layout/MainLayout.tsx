import React from "react";

import Header from "./Header.tsx";
import { Box, ThemeProvider, createTheme, Container } from '@mui/material';

import { Outlet } from "react-router-dom";

const defaultTheme = createTheme({
    typography: {
        fontSize: 12,
        fontFamily: ['Roboto', 'sans-serif'].join(','),
    },
    components: {
        MuiButton: {
            styleOverrides: {
                outlined: {
                    borderRadius: "20px",
                    textTransform: "none",
                    fontSize: "14px",
                    borderColor: "#DADCE0",
                    color: "#3C4043",
                    "&:hover": { borderColor: "#A8B0B9" }
                },
                contained: {
                    borderRadius: "20px",
                    textTransform: "none",
                    fontSize: "14px",
                    backgroundColor: "#1A73E8",
                    color: "white",
                    "&:hover": { backgroundColor: "#1765C3" },
                },
            },
        },
    },
});
export default function MainLayout() {
    const [useContainer, setUseContainer] = React.useState(true);

    function getOutlet() {
        if (useContainer)
            return (
                <Container component="main" maxWidth={false}
                    sx={{
                        height: "100%",
                        maxHeight: "100%",
                        overflowY: "scroll",
                        overflowX: "hidden",
                        pt: 4, pb: 5, pl: { xs: 5, sm: 7, lg: 15 }, pr: { xs: 5, lg: 15 }
                    }}>
                    <Outlet context={[useContainer, setUseContainer]} />
                </Container>
            );

        return <Outlet context={[useContainer, setUseContainer]} />;
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ height: '100%', maxHeight: '100vh', overflowY: "auto", width: "100vw" }} >
                <Header />
                {getOutlet()}
            </Box>
        </ThemeProvider>
    );
}