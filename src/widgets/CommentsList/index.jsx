import { Card } from '../../components';
import cn from './styles.module.sass';

export const CommentsList = ({ comments }) => {
    if (!comments.length) return null;

    return (
        <>
            {comments.map(({ content, replies }) => (
                <>
                    <Card>{content}</Card>

                    {replies && (
                        <div className={cn.replies}>
                            <CommentsList comments={replies} />
                        </div>
                    )}
                </>
            ))}
        </>
    );
};
