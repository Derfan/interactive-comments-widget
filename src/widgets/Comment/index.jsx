import { useState, useRef, useMemo } from 'react';

import { useUserContext, useCommentsContext } from '../../contexts';
import { Card, Textarea, Counter } from '../../components';
import { AuthorInfo, Content, Controls } from './components';
import { CommentForm } from '../CommentForm';
import { DeleteModal } from '../DeleteModal';
import cn from './styles.module.sass';

export const Comment = ({ id, user, createdAt, content, score, replyingTo }) => {
    const editableField = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isReplyVisible, setIsReplyVisible] = useState(false);
    const currentUser = useUserContext();
    const {
        handleAddComment,
        handleDeleteComment,
        handleEditComment,
        handleCommentScoreChange,
    } = useCommentsContext();
    const createdByCurrentUser = useMemo(
        () => user.username === currentUser.username,
        [user.username, currentUser.username],
    );

    const handleSaveModifiedComment = () => {
        handleEditComment({ id, content: editableField.current.value });
        setIsEditable(false);
    };
    const handleSubmitReply = (content) => {
        handleAddComment({ content, replyingTo: { commentId: id, username: user.username } }, currentUser);
        setIsReplyVisible(false);
    }
    const handleScoreChange = (operationType) => handleCommentScoreChange({ id, operationType });
    const handleReplyButtonClick = () => setIsReplyVisible(true);
    const handleEditButtonClick = () => setIsEditable(true);
    const handleOpenDeleteModal = () => setIsModalOpen(true);
    const handleCloseDeleteModal = () => setIsModalOpen(false);
    const handleConfirmDeletion = () => {
        handleDeleteComment({ id });
        handleCloseDeleteModal();
    };

    return (
        <>
            <Card className={cn.root}>
                <div className={cn.info}>
                    <AuthorInfo
                        author={user}
                        createdAt={createdAt}
                        createdByCurrentUser={createdByCurrentUser}
                    />

                    {isEditable
                        ? <Textarea ref={editableField} defaultValue={content} />
                        : <Content content={content} replyingTo={replyingTo} />
                    }
                </div>

                <Counter
                    className={cn.score}
                    count={score}
                    onChange={handleScoreChange}
                />

                <Controls
                    className={cn.controls}
                    createdByCurrentUser={createdByCurrentUser}
                    isEditable={isEditable}
                    isReplyVisible={isReplyVisible}
                    onSave={handleSaveModifiedComment}
                    onReply={handleReplyButtonClick}
                    onDelete={handleOpenDeleteModal}
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

            <DeleteModal
                isOpen={isModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDeletion}
            />
        </>
    );
};
