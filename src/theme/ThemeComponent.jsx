import { createTheme } from '@mui/material/styles';
import "@fontsource-variable/inter"

export const theme = createTheme({
    typography: {
        heading: {
            fontFamily: 'Inter Variable',
            fontWeight: "500",
            fontStyle: "normal",
            fontSize: "30px"
        },
        p: {
            fontFamily: 'Inter Variable',
            fontWeight: "300",
            fontStyle: "normal",
            fontSize: "15px"
        },
        selected: {
            fontFamily: 'Inter Variable',
            fontWeight: "400",
            fontStyle: "normal",
            fontSize: "15px"
        },
        menu: {
            fontFamily: 'Inter Variable',
            fontWeight: "200",
            fontStyle: "normal",
            fontSize: "20px"
        }
    },
    palette: {
        background: {
            default: "#2F2E4F"
        },
        text: {
            primary: "#faf8f6",
            disabled: "#757575"
        },
        primary: {
            main: "#6464AE",
        },
        secondary: {
            main: "#EE6F4E"
        },
        cards: "#BDE3FF",
    },
    components: {
        MuiContainer: {
            variants: [
                {
                    props: {
                        variant: "flex_cont"
                    },
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                    }
                }

            ]
        }
    }
});
