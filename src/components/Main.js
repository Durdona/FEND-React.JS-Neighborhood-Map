import React from "react";
import Drawer from "./Drawer";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//Creating theme
const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    }
});

export const Main = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Drawer />
        </MuiThemeProvider>
    )
}