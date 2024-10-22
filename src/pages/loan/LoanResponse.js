'use client';
import React, { useContext, useEffect, useState } from 'react';
import { User_Data } from './../../context/UserContext';
import { CircularProgress, Container, Typography } from '@mui/material';
import { getScore } from './../../app/api/MockApi';
import ApprovedRequest from './ApprovedRequest';
import DeniedRequest from './DeniedRequest';

export default function LoanResponse() {
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
        let userRequests = new Array();
        if (
            Object.prototype.hasOwnProperty.call(localStorage, 'userRequests')
        ) {
            userRequests = JSON.parse(localStorage.getItem('userRequests'));
        }

        userRequests.push(userRequest);
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
                    <Typography variant="h4" gutterBottom>
                        Aguarde um momento! Estamos analisando sua solicitação!
                    </Typography>
                )}

                {loading && <CircularProgress color="secondary" />}

                {status.status === 'APPROVED' && !loading && (
                    <ApprovedRequest />
                )}
                {status.status === 'DENIED' && !loading && <DeniedRequest />}
            </Container>
        </>
    );
}
