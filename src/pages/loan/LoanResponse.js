'use client';
import React, { useContext, useEffect, useState } from 'react';
import { User_Data } from './../../context/UserContext';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Typography,
} from '@mui/material';
import { getScore } from './../../app/api/MockApi';
import ApprovedRequest from './ApprovedRequest';
import DeniedRequest from './DeniedRequest';
import { useRouter } from 'next/router';

export default function LoanResponse() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { userName, userIncome, userEmail } = useContext(User_Data);
    const [status, setStatus] = useState('');

    const saveUserRequest = (res) => {
        const currentDate = new Date();
        const newDate = new Date(currentDate);
        const userRequest = {
            name: userName,
            email: userEmail,
            status: res,
            expiry_date: newDate.setMinutes(newDate.getMinutes() + 10),
        };

        let userRequests = [];
        if (localStorage.getItem('userRequests')) {
            userRequests = JSON.parse(localStorage.getItem('userRequests'));

            const existingUserIndex = userRequests.findIndex(
                (request) => request.email === userEmail,
            );

            if (existingUserIndex !== -1) {
                const existingRequest = userRequests[existingUserIndex];
                const existingExpiryDate = new Date(
                    existingRequest.expiry_date,
                );

                if (existingExpiryDate > currentDate) {
                    userRequest.expiry_date = existingRequest.expiry_date;
                } else {
                    userRequests[existingUserIndex] = userRequest;
                }
            } else {
                userRequests.push(userRequest);
            }
        } else {
            userRequests.push(userRequest);
        }

        localStorage.setItem('userRequests', JSON.stringify(userRequests));
    };

    useEffect(() => {
        if (loading && userIncome) {
            const payload = { income: userIncome };

            getScore(payload).then((res) => {
                setStatus(res);
                saveUserRequest(res);
                setLoading(false);
            });
        }
    }, [loading, userIncome]);

    return (
        <>
            <Container maxWidth="sm">
                {loading && (
                    <Typography
                        variant="h4"
                        gutterBottom
                        data-testid="text-wait"
                    >
                        Aguarde um momento! Estamos analisando sua solicitação!
                    </Typography>
                )}

                {loading && (
                    <CircularProgress
                        color="secondary"
                        data-testid="circular-progress"
                    />
                )}

                {status?.status === 'APPROVED' && !loading && (
                    <ApprovedRequest data-testid="component-approved" />
                )}

                {status?.status === 'DENIED' && !loading && (
                    <DeniedRequest data-testid="component-denied" />
                )}

                {!loading && (
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        minHeight="20vh"
                    >
                        <Button
                            onClick={() => router.push('/')}
                            variant="contained"
                            color="primary"
                            data-testid="button-back-home"
                        >
                            Voltar para o início
                        </Button>
                    </Box>
                )}
            </Container>
        </>
    );
}
