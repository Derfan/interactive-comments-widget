import { createContext, useContext, useReducer } from 'react';

import { normalizeData } from '../helpers';
import mockData from '../data.json';

const CommentsContext = createContext([]);

const initialState = normalizeData(mockData.comments);

const actions = {
    ADD_COMMENT: 'ADD_COMMENT',
    EDIT_COMMENT: 'EDIT_COMMENT',
    DELETE_COMMENT: 'DELETE_COMMENT',
    REPLY_TO_COMMENT: 'REPLY_TO_COMMENT',
    CHANGE_SCORE: 'CHANGE_SCORE',
};

const reducer = (state, action) => {
    switch (action.type) {
        case actions.ADD_COMMENT:
            return [...state, action.payload];
        case actions.REPLY_TO_COMMENT: {
            const { replyingTo: { username } } = action.payload;

            return [
                ...state,
                { ...action.payload, replyingTo: username }
            ];
        }
        case actions.EDIT_COMMENT: {
            const { id, content } = action.payload;

            return state.map(
                comment => comment.id === id
                    ? { ...comment, content }
                    : comment,
            );
        }
        case actions.DELETE_COMMENT: {
            const { id } = action.payload;

            return state.filter(comment => comment.id !== id);
        }
        case actions.CHANGE_SCORE: {
            const { id, operationType } = action.payload;
            
            return state.map(comment => {
                if (comment.id !== id) return comment;

                let score = comment.score;

                if (operationType === 'increment') {
                    score += 1;
                }
                if (operationType === 'decrement') {
                    score -= 1;
                }

                return { ...comment, score };
            });
        }
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
            parentId: replyingTo?.commentId || null,
            id: nextId,
            user,
            content,
            createdAt: "just now",
            score: 0,
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
    const handleCommentScoreChange = (payload) => dispatch({ type: actions.CHANGE_SCORE, payload });

    return {
        comments,
        handleAddComment,
        handleDeleteComment,
        handleEditComment,
        handleCommentScoreChange,
    };
};
