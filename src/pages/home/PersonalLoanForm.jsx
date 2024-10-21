'use client';
import React, { useContext, useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    FormControl,
    FormHelperText,
} from '@mui/material';
import { User_Data } from './../../context/UserContext';
import { useRouter } from 'next/router';

const PersonalLoanForm = () => {
    const router = useRouter();
    const { setUserName, setUserIncome } = useContext(User_Data);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [income, setIncome] = useState('');
    const [city, setCity] = useState('');
    const [isValid, setIsValid] = useState(false);

    const [nameError, setNameError] = useState(false);
    const [ageError, setAgeError] = useState(false);
    const [incomeError, setIncomeError] = useState(false);
    const [cityError, setCityError] = useState(false);

    const handleValidateForm = () => {
        let valid = true;

        const nameParsed = name.trim();
        if (nameParsed.length < 8) {
            setNameError(true);
            valid = false;
        } else {
            setNameError(false);
            setUserName(nameParsed);
        }

        // Validação da idade
        const parsedAge = parseInt(age, 10);
        if (parsedAge < 18 || parsedAge > 65 || isNaN(parsedAge)) {
            setAgeError(true);
            valid = false;
        } else {
            setAgeError(false);
        }

        // Validação da renda
        const parsedIncome = parseInt(income, 10);
        if (parsedIncome <= 0 || isNaN(parsedIncome)) {
            setIncomeError(true);
            valid = false;
        } else {
            setIncomeError(false);
            setUserIncome(parsedIncome);
        }

        const cityParsed = city.trim();
        if (cityParsed.length <= 0) {
            setCityError(true);
            valid = false;
        } else {
            setCityError(false);
        }

        setIsValid(valid);
    };

    useEffect(() => {
        if (isValid) {
            router.push('/loan');
        }
    }, [isValid]);

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
            >
                <Typography variant="h4" gutterBottom>
                    Formulário Blipay
                </Typography>
                <FormControl style={{ width: '100%' }}>
                    <TextField
                        id="name"
                        label="Nome"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setNameError(false);
                        }}
                        required
                    />
                    {nameError && (
                        <FormHelperText error id="name-error">
                            Digite seu nome completo.
                        </FormHelperText>
                    )}

                    <TextField
                        id="idade"
                        label="Idade"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={age}
                        onChange={(e) => {
                            setAge(e.target.value);
                            setAgeError(false);
                        }}
                        required
                    />
                    {ageError && (
                        <FormHelperText error id="age-error">
                            Você deve ter entre 18 e 65 anos para solicitar um
                            empréstimo.
                        </FormHelperText>
                    )}

                    <TextField
                        id="renda"
                        label="Renda mensal"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={income}
                        onChange={(e) => {
                            setIncome(e.target.value);
                            setIncomeError(false);
                        }}
                        required
                    />
                    {incomeError && (
                        <FormHelperText error id="income-error">
                            Sua renda mensal deve ser maior que zero.
                        </FormHelperText>
                    )}

                    <TextField
                        id="cidade"
                        label="Cidade"
                        fullWidth
                        type="text"
                        margin="normal"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />

                    {cityError && (
                        <FormHelperText error id="city-error">
                            Este campo deve ser preenchido.
                        </FormHelperText>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '16px' }}
                        onClick={handleValidateForm}
                    >
                        Verificar
                    </Button>
                </FormControl>
            </Box>
        </Container>
    );
};

export default PersonalLoanForm;
