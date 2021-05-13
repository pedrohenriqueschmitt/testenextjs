  
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#003087',
      },
      secondary: {
        main: '#ffc72c',
        contrastText: '#000000'
      }
    },
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    typography: {
      fontFamily: [
        'Roboto',
      ]
    }
  });

  export default theme;