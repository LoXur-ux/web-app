import { createTheme } from "@mui/material/styles";
import { lightGreen, orange } from "@mui/material/colors";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: lightGreen[500],
    },
    secondary: {
      main: orange[600],
    },
  },
});

// const darkTheme = createTheme({
//   palette: {
//     primary: {
//       main: "#212121",
//     },
//     secondary: {
//       main: "#bdbdbd",
//     },
//   },
// });

let theme = lightTheme;

export default theme;
