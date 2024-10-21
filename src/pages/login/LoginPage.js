import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useRouter } from 'next/router';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const usersListLocal = JSON.parse(localStorage.getItem('users'));

        if (usersListLocal !== null) {
            const usersArray = [];
            usersArray.push(usersListLocal);

            const userRegistred = usersArray.find(
                (user) => user.email === email,
            );
            if (userRegistred) {
                router.push('/home');
            }
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="70vh"
            >
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '16px' }}
                        sx={{ backgroundColor: '#591ca6', borderRadius: 5 }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
            <Box
                mt={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="20vh"
            >
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ backgroundColor: '#591ca6', borderRadius: 5 }}
                    onClick={() => router.push('/register')}
                >
                    Ainda não tem conta? Cadastre-se aqui
                </Button>
            </Box>
        </Container>
    );
};

export default LoginPage;
