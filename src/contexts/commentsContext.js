import { createContext, useContext, useReducer } from 'react';

import { findElement } from '../helpers';
import mockData from '../data.json';

const CommentsContext = createContext([]);

const initialState = mockData.comments;

const actions = {
    ADD_COMMENT: 'ADD_COMMENT',
    EDIT_COMMENT: 'EDIT_COMMENT',
    DELETE_COMMENT: 'DELETE_COMMENT',
    REPLY_TO_COMMENT: 'REPLY_TO_COMMENT',
};

const reducer = (state, action) => {
    switch (action.type) {
        case actions.ADD_COMMENT:
            return [...state, action.payload];
        case actions.REPLY_TO_COMMENT: {
            const comment = findElement(state, action.payload.replyingTo.commentId);

            action.payload.replyingTo = action.payload.replyingTo.username;

            if (comment.replies) {
                comment.replies.push(action.payload);
            } else {
                comment.replies = [action.payload];
            }

            return Array.from(state);
        }
        case actions.EDIT_COMMENT: {
            const { id, content } = action.payload;
            const comment = findElement(state, id);

            comment.content = content;

            return Array.from(state);
        }
        case actions.DELETE_COMMENT:
            return [...state];
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

export const CommentsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CommentsContext.Provider value={{ comments: state, dispatch }}>
            {children}
        </CommentsContext.Provider>
    );
};

let nextId = 5;

export const useCommentsContext = () => {
    const { comments, dispatch } = useContext(CommentsContext);

    const handleAddComment = ({ content, replyingTo }, user) => {
        const payload = {
            user,
            content,
            id: nextId,
            createdAt: "just now",
            score: 0,
            replies: [],
        };
        let type = actions.ADD_COMMENT;

        if (replyingTo) {
            payload.replyingTo = replyingTo;
            type = actions.REPLY_TO_COMMENT;
        }

        dispatch({ type, payload });
        nextId += 1;
    };
    const handleDeleteComment = (payload) => dispatch({ type: actions.DELETE_COMMENT, payload });
    const handleEditComment = (payload) => dispatch({ type: actions.EDIT_COMMENT, payload });

    return { comments, handleAddComment, handleDeleteComment, handleEditComment };
};
