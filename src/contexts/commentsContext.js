import { createContext, useContext } from 'react';

import mockData from '../data.json';

const defaultValue = [];

const CommentsContext = createContext(defaultValue);

export const CommentsContextProvider = ({ children }) => {
    return (
        <CommentsContext.Provider value={mockData.comments}>
            {children}
        </CommentsContext.Provider>
    );
}

export const useCommentsContext = () => useContext(CommentsContext);
