'use client';
import React from 'react';
import LoginPage from './LoginPage';
import { UserProvider } from './../../app/context/UserContext';

export default function Login() {
    return (
        <UserProvider>
            <LoginPage />
        </UserProvider>
    );
}
