import { createTheme } from "@mui/material";

export const authTheme = createTheme({});

const mainTheme = createTheme({
  palette: {
    error: { main: "#B40000" },
    primary: { main: "#618DFF" },
    secondary: { main: "#2EDFCA" },
    background: { default: "#3F3F3F" },
    text: { primary: "rgba(63, 63, 63, 0.72)" },
  },
});

export default mainTheme;
