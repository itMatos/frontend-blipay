import React, { useContext, useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    FormControl,
} from '@mui/material';
import { useRouter } from 'next/router';
import { User_Data } from './../../context/UserContext';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserEmail } = useContext(User_Data);

    const handleSubmit = (event) => {
        event.preventDefault();
        const currentDate = new Date();

        let userRequests = [];

        if (localStorage.getItem('userRequests')) {
            userRequests = JSON.parse(localStorage.getItem('userRequests'));

            const existingUserIndex = userRequests.findIndex(
                (request) => request.email === email,
            );

            if (existingUserIndex !== -1) {
                const existingRequest = userRequests[existingUserIndex];
                const existingExpiryDate = new Date(
                    existingRequest.expiry_date,
                );

                if (existingExpiryDate > currentDate) {
                    router.push('/loan');
                    return;
                }
            }
        }

        if (email.length > 0) {
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
                    Login
                </Typography>
                <FormControl onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => {
                            setUserEmail(e.target.value);
                            setEmail(e.target.value);
                        }}
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
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                </FormControl>
            </Box>
        </Container>
    );
};

export default LoginPage;
