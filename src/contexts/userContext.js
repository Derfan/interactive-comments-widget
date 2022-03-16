import { createContext, useContext } from 'react';

import mockData from '../data.json';

const defaultValue = {
    image: null,
    username: null,
};

const UserContext = createContext(defaultValue);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
    return (
        <UserContext.Provider value={mockData.currentUser}>
            {children}
        </UserContext.Provider>
    );
};
