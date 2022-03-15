import { createContext, useContext } from 'react';

const defaultValue = {
    image: null,
    username: null,
};

export const UserContext = createContext(defaultValue);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
    const currentUser = {
        image: { 
            png: "avatars/image-juliusomo.png",
            webp: "avatars/image-juliusomo.webp",
        },
        username: "juliusomo"
    };

    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    );
};
