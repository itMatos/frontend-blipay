'user client';
import React, { createContext, useState } from 'react';

export const User_Data = createContext();

function UserContext({ children }) {
    const [userName, setUserName] = useState('Blipay User');
    const [userIncome, setUserIncome] = useState(2000);

    return (
        <User_Data.Provider
            value={{
                userName,
                setUserName,
                userIncome,
                setUserIncome,
            }}
        >
            {children}
        </User_Data.Provider>
    );
}
export default UserContext;
