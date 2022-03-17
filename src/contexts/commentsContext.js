import { createContext, useContext, useReducer } from 'react';

import mockData from '../data.json';

const CommentsContext = createContext([]);

const initialState = mockData.comments;

const actions = {
    ADD_COMMENT: 'ADD_COMMENT',
    EDIT_COMMENT: 'EDIT_COMMENT',
    DELETE_COMMENT: 'DELETE_COMMENT',
    REPLY_TO_COMMENT: 'REPLY_TO_COMMENT',
};

const findComment = (entities, id) => {
  if (!entities?.length) return null;

  let comment = null;

  for (let i = 0; i < entities.length; i++) {
    const item = entities[i];

    if (item.id === id) {
      comment = item;
      break;
    }

    comment = findComment(item.replies, id);
  }

  return comment;
};

const reducer = (state, action) => {
    switch (action.type) {
        case actions.ADD_COMMENT:
            return [...state, action.payload];
        case actions.REPLY_TO_COMMENT: {
            const comment = findComment(state, action.payload.replyingTo);

            if (comment.replies) {
                comment.replies.push(action.payload);
            } else {
                comment.replies = [action.payload];
            }

            return Array.from(state);
        }
        case actions.EDIT_COMMENT: {
            const comment = findComment(state, action.payload.id);

            comment.content = action.payload.content;

            return [...state];
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

    const handleAddComment = ({ content, idForReply }, user) => {
        const payload = {
            user,
            content,
            id: nextId,
            createdAt: "just now",
            score: 0,
            replies: [],
        };
        let type = actions.ADD_COMMENT;

        if (idForReply) {
            payload.replyingTo = idForReply;
            type = actions.REPLY_TO_COMMENT;
        }

        dispatch({ type, payload });
        nextId += 1;
    };
    const handleDeleteComment = (payload) => dispatch({ type: actions.DELETE_COMMENT, payload });
    const handleEditComment = (payload) => dispatch({ type: actions.EDIT_COMMENT, payload });

    return { comments, handleAddComment, handleDeleteComment, handleEditComment };
};
