'use client';
import React, { useContext, useEffect, useState } from 'react';
import { User_Data } from './../../context/UserContext';
import { CircularProgress, Typography } from '@mui/material';
import { getScore } from './../../app/api/MockApi';

export default function LoanResponse() {
    const [loading, setLoading] = useState(true);
    const { userName, userIncome } = useContext(User_Data);
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (loading && userIncome) {
            const payload = { income: userIncome };
            getScore(payload).then((res) => {
                setStatus(res.status);
                setLoading(false);
            });
        }
    }, [loading, userIncome]);

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Pagina do response
            </Typography>

            {loading && <CircularProgress color="secondary" />}
        </>
    );
}
