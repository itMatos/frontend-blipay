'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { User_Data } from './../../context/UserContext';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function DeniedRequest() {
    const { userName, userEmail } = useContext(User_Data);
    const [timeRemaining, setTimeRemaining] = useState(0);

    useEffect(() => {
        if (userEmail && userName) {
            const savedRequests = JSON.parse(
                localStorage.getItem('userRequests'),
            );
            const userRequest = savedRequests.find(
                (request) => request.email === userEmail,
            );
            if (userRequest.status.status === 'DENIED') {
                const currentDate = new Date();
                const expiryDate = new Date(userRequest.expiry_date);
                const diff = expiryDate - currentDate;
                const timeRemainingInDays = Math.floor(diff / (1000 * 60));
                setTimeRemaining(timeRemainingInDays);
            }
        }
    }, [userEmail, userName]);

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                minHeight="50vh"
            >
                <Box m={2}>
                    <ErrorOutlineIcon color="error" sx={{ fontSize: 50 }} />
                </Box>

                <Box>
                    <Typography
                        variant="h4"
                        gutterBottom
                        data-testid="denied-response"
                    >
                        {userName} ({userEmail}), sua solicitação foi negada!
                    </Typography>
                </Box>
            </Box>

            <Box>
                <Typography variant="h5" gutterBottom>
                    Você pode tentar novamente em {timeRemaining} minutos.
                </Typography>
            </Box>
        </Container>
    );
}
