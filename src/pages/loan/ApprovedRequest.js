'use client';
import React, { useContext } from 'react';
import { Box, Container, Typography } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { User_Data } from './../../context/UserContext';

export default function ApprovedRequest() {
    const { userName } = useContext(User_Data);

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
                    <CheckCircleIcon color="success" sx={{ fontSize: 50 }} />
                </Box>

                <Box>
                    <Typography
                        variant="h4"
                        gutterBottom
                        data-testid="approved-response"
                    >
                        Parabéns, {userName}, sua solicitação foi aprovada!
                    </Typography>
                </Box>
            </Box>

            <Box>
                <Typography variant="h5" gutterBottom>
                    Você tem um limite de R$ 10.000,00 disponível para
                    empréstimo.
                </Typography>
            </Box>
        </Container>
    );
}
