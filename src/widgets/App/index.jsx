import { UserContextProvider, CommentsContextProvider } from '../../contexts';
import { Layout } from '../../components';
import { Comments } from '../Comments';
import { CommentForm } from '../CommentForm';

export const App = () => (
    <UserContextProvider>
        <CommentsContextProvider>
            <Layout>
                <Comments />

                <CommentForm
                    placeholder="Add a comment..."
                    buttonLabel="Send"
                />
            </Layout>
        </CommentsContextProvider>
    </UserContextProvider>
);
