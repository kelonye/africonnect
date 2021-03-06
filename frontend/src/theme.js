import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import primary from '@material-ui/core/colors/blue';
import secondary from '@material-ui/core/colors/pink';
import { darken } from '@material-ui/core/styles/colorManipulator';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary,
    secondary: {
      // Darken so we reach the AA contrast ratio level.
      main: darken(secondary.A400, 0.08)
    }
  },
  typography: {
    useNextVariants: true
  }
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
