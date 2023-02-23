//file for creating custom theme with theme provider
import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#556cd6",
        },  
        secondary: {

            main: "#19857b",
        },
        error: {
            main: red.A400,
        },
        background: {
            default: "#fff",
        },
    },
});

export default function Theme() {
    return(
        <ThemeProvider theme={theme}>
            <App />
            
            
        </ThemeProvider>

    )
}


//export default theme;

