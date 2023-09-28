import React from 'react';
import {AppBar, Badge, Box, Button, Container, createTheme, CssBaseline, IconButton, ThemeProvider, Toolbar, Typography} from '@mui/material';
import {useRecoilValue} from 'recoil';
import {Link, Outlet} from 'react-router-dom';
import CoffeeIcon from '@mui/icons-material/Coffee';
import CartIcon from '@mui/icons-material/ShoppingCart';
import {cartItemsCountState} from './shop/cart/Cart';
import {SnackbarProvider} from 'notistack';


const defaultTheme = createTheme();

function App() {
  const cartItemsCount = useRecoilValue(cartItemsCountState);

  return (
    <ThemeProvider theme={defaultTheme}>
      <SnackbarProvider>
        <CssBaseline/>
        <AppBar position="static">
          <Toolbar>
            <CoffeeIcon sx={{mr: 1}}/>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: {xs: 'none', md: 'flex'},
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Coffee
            </Typography>

            <Box sx={{flexGrow: 1, display: 'flex'}}>
              <Button
                component={Link}
                to={'/'}
                sx={{my: 2, color: 'white', display: 'block'}}
              >
                Catalogue
              </Button>
              <Button
                component={Link}
                to={'/history'}
                sx={{my: 2, color: 'white', display: 'block'}}
              >
                History
              </Button>
            </Box>

            <Box sx={{flexGrow: 0}}>
              <IconButton component={Link} to={'/cart'}>
                <Badge badgeContent={cartItemsCount} color={'secondary'}>
                  <CartIcon/>
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <main>
          <Container sx={{py: 8}} maxWidth="md">
            <Outlet/>
          </Container>
        </main>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
