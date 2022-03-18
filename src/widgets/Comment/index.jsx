import { useState, useRef } from 'react';

import { useUserContext, useCommentsContext } from '../../contexts';
import { Card, Textarea, Counter } from '../../components';
import { AuthorInfo, Content, Controls } from './components';
import { CommentForm } from '../CommentForm';
import cn from './styles.module.sass';

export const Comment = ({ id, user, createdAt, content, score, replyingTo }) => {
    const editableField = useRef(null);
    const [isEditable, setIsEditable] = useState(false);
    const [isReplyVisible, setIsReplyVisible] = useState(false);
    const currentUser = useUserContext();
    const { handleAddComment, handleDeleteComment, handleEditComment } = useCommentsContext();
    const createdByCurrentUser = user.username === currentUser.username;

    const handleSaveModifiedComment = () => {
        handleEditComment({ id, content: editableField.current.value });
        setIsEditable(false);
    };
    const handleSubmitReply = (content) => {
        handleAddComment({ content, replyingTo: { commentId: id, username: user.username } }, currentUser);
        setIsReplyVisible(false);
    }
    const handleDeleteButtonClick = () => handleDeleteComment({ id });
    const handleScoreChange = () => {};
    const handleReplyButtonClick = () => setIsReplyVisible(true);
    const handleEditButtonClick = () => setIsEditable(true);

    return (
        <>
            <Card className={cn.root}>
                <AuthorInfo
                    author={user}
                    createdAt={createdAt}
                    createdByCurrentUser={createdByCurrentUser}
                />

                {isEditable
                    ? <Textarea ref={editableField} defaultValue={content} />
                    : <Content content={content} replyingTo={replyingTo} />
                }

                <Counter className={cn.score} initialCount={score} onChange={handleScoreChange} />

                <Controls
                    className={cn.controls}
                    createdByCurrentUser={createdByCurrentUser}
                    isEditable={isEditable}
                    isReplyVisible={isReplyVisible}
                    onSave={handleSaveModifiedComment}
                    onReply={handleReplyButtonClick}
                    onDelete={handleDeleteButtonClick}
                    onEdit={handleEditButtonClick}
                />
            </Card>

            {isReplyVisible && (
                <CommentForm
                    placeholder="Add a comment..."
                    buttonLabel="Reply"
                    onSubmit={handleSubmitReply}
                />
            )}
        </>
    );
};
