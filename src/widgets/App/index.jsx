import { useCommentsContext, useUserContext } from '../../contexts';
import { Layout } from '../../components';
import { Comments } from '../Comments';
import { CommentForm } from '../CommentForm';

export const App = () => {
    const currentUser = useUserContext();
    const { handleAddComment } = useCommentsContext();

    return (
        <Layout>
            <Comments />

            <CommentForm
                placeholder="Add a comment..."
                buttonLabel="Send"
                onSubmit={(content) => handleAddComment({ content }, currentUser)}
            />
        </Layout>
    );
}
