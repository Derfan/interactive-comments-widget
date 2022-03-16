import { useUserContext } from '../../contexts';
import { Card } from '../../components';
import { Header, Content, Footer } from './components';
import cn from './styles.module.sass';

export const Comment = ({ id, user, createdAt, content, score, replyingTo }) => {
    const { username } = useUserContext();
    const createdByCurrentUser = user.username === username;

    const handleScoreChange = () => {};
    const handleReply = () => {};
    const handleDelete = () => {};
    const handleEdit = () => {};

    return (
        <Card className={cn.root}>
            <Header
                author={user}
                createdAt={createdAt}
                createdByCurrentUser={createdByCurrentUser}
            />

            <Content
                content={content}
                replyingTo={replyingTo}
            />

            <Footer
                score={score}
                commentId={id}
                createdByCurrentUser={createdByCurrentUser}
                onScoreChange={handleScoreChange}
                onReply={handleReply}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </Card>
    );
};
