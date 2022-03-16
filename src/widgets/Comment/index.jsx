import { useState, useRef } from 'react';

import { useUserContext } from '../../contexts';
import { Card, Textarea, Counter } from '../../components';
import { Header, Content, Controls } from './components';
import { CommentForm } from '../CommentForm';
import cn from './styles.module.sass';

export const Comment = ({ id, user, createdAt, content, score, replyingTo }) => {
    const editableField = useRef(null);
    const [isEditable, setIsEditable] = useState(false);
    const [isReplyVisible, setIsReplyVisible] = useState(false);
    const { username } = useUserContext();
    const createdByCurrentUser = user.username === username;
    const commentMessage = replyingTo ? `@${replyingTo} ${content}` : content;

    const handleScoreChange = () => {};
    const handleSave = () => {
        console.log('new value:', editableField.current.value);
        setIsEditable(false);
    };
    const handleReply = () => {
        setIsReplyVisible(true);
    };
    const handleDelete = () => {};
    const handleEdit = () => {
        setIsEditable(true);
    };
    const handleSubmit = (value) => {
        console.log('reply value:', value);
        setIsReplyVisible(false);
    };

    return (
        <>
            <Card className={cn.root}>
                <Header
                    author={user}
                    createdAt={createdAt}
                    createdByCurrentUser={createdByCurrentUser}
                />

                {isEditable
                    ? <Textarea ref={editableField} defaultValue={commentMessage} />
                    : <Content content={content} replyingTo={replyingTo} />
                }

                <Counter initialCount={score} onChange={handleScoreChange} />

                <Controls
                    createdByCurrentUser={createdByCurrentUser}
                    isEditable={isEditable}
                    isReplyVisible={isReplyVisible}
                    onSave={handleSave}
                    onReply={handleReply}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            </Card>

            {isReplyVisible && (
                <CommentForm
                    placeholder="Add a comment..."
                    buttonLabel="Reply"
                    onSubmit={handleSubmit}
                />
            )}
        </>
    );
};
