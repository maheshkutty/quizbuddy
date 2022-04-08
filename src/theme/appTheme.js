import { createTheme, ThemeProvider } from "@mui/material/styles";

const QuizTheme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#ea5455",
      backgroundImage: "linear-gradient(to right bottom, #ea5455, #c1426c, #8c3e73, #563966, #2b2e4a)",
      contrastText: "#fff",
    },
  },
});

export default QuizTheme;