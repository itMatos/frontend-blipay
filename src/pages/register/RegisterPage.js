import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useRouter } from 'next/router';

const RegisterPage = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerNewUser = (newUser) => {
        const arrayUsers = [newUser];
        const usersList = JSON.parse(localStorage.getItem('users')) || {};
        arrayUsers.push(usersList);
        localStorage.setItem('users', JSON.stringify(arrayUsers));
        console.log('Cadastro realizado com sucesso.');
    };

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
                return;
            } else {
                const hidePassword = password.replace(/./g, '*');
                registerNewUser({ name, email, password: hidePassword });
                router.push('/home');
            }
        } else {
            const hidePassword = password.replace(/./g, '*');
            registerNewUser({ name, email, password: hidePassword });
            router.push('/home');
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
                    Register
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Nome"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                        label="Senha"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '16px' }}
                        sx={{
                            backgroundColor: '#591ca6',
                            borderRadius: 5,
                            fontWeight: '600',
                        }}
                    >
                        Cadastrar
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
                    variant="outlined"
                    onClick={() => router.push('/')}
                    fullWidth
                    sx={{
                        color: '#591ca6',
                        borderRadius: 5,
                    }}
                >
                    Já possui uma conta? Faça login
                </Button>
            </Box>
        </Container>
    );
};

export default RegisterPage;
