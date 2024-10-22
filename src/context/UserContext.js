'user client';
import React, { createContext, useState } from 'react';

export const User_Data = createContext();

function UserContext({ children }) {
    const [userName, setUserName] = useState('Blipay User');
    const [userEmail, setUserEmail] = useState('italo@gmail.com');
    const [userIncome, setUserIncome] = useState(1000);

    return (
        <User_Data.Provider
            value={{
                userName,
                setUserName,
                userIncome,
                setUserIncome,
                userEmail,
                setUserEmail,
            }}
        >
            {children}
        </User_Data.Provider>
    );
}
export default UserContext;
