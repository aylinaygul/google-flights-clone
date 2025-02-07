import React, { useState } from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery
} from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import HouseIcon from "@mui/icons-material/House";
import SearchIcon from "@mui/icons-material/Search";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

const StyledButton = ({ startIcon, variant, children }) => (
    <Button startIcon={startIcon} variant={variant}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>{children}</Typography>
    </Button>
);

export default function Header() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const menuItems = [
        { icon: <SearchIcon sx={{ color: "blue" }} />, label: "Travel" },
        { icon: <TravelExploreIcon sx={{ color: "blue" }} />, label: "Explore" },
        { icon: <FlightIcon sx={{ color: "blue" }} />, label: "Flights" },
        { icon: <HotelIcon sx={{ color: "blue" }} />, label: "Hotels" },
        { icon: <HouseIcon sx={{ color: "blue" }} />, label: "Vacation Rentals" }
    ];

    return (
        <AppBar
            position="static"
            color="transparent"
            elevation={1}
            sx={{ padding: 1 }}
        >
            <Toolbar sx={{ display: "flex", gap: 1 }}>

                <IconButton size="large" onClick={handleMenuOpen}><MenuIcon /></IconButton>
                <Box component={"img"} src="google-logo.png" width={"74px"} sx={{ pr: { sm: 0, lg: 3 } }} />

                {!isSmallScreen && menuItems.map(({ icon, label }) => (
                    <StyledButton key={label} startIcon={icon} variant="outlined">{label}</StyledButton>
                ))}

            </Toolbar>

            {isSmallScreen && (
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    {menuItems.map(({ icon, label }) => (
                        <MenuItem key={label} onClick={handleMenuClose}>
                            {icon && <Box sx={{ marginRight: 1 }}>{icon}</Box>}
                            <Typography>{label}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            )}

        </AppBar>
    );
}
