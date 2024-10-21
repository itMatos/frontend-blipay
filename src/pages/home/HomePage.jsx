import React, { useContext } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { User_Data } from '@/app/context/UserContext';

function HomePage() {
    const { userName } = useContext(User_Data);
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#ff6200' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    ></IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Blipay
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={() => console.log('logout')}
                    >
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Typography
                variant="h4"
                component="h1"
                align="center"
                sx={{ mt: 4 }}
            >
                Olá, {userName}! Seja bem-vindo(a)!
            </Typography>
        </>
    );
}

export default HomePage;
