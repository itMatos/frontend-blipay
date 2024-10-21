import React from 'react';
import RegisterPage from './RegisterPage';
import UserContext from './../../app/context/UserContext';

function Register() {
    return (
        <UserContext>
            <RegisterPage />
        </UserContext>
    );
}

export default Register;
