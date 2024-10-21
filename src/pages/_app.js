import UserContext from '../context/UserContext';
import React from 'react';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <UserContext>
                <Component {...pageProps} />
            </UserContext>
        </>
    );
}

export default MyApp;
