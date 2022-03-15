import { UserContextProvider } from '../../contexts';
import { Layout } from '../../components';
import { CommentsList } from '../CommentsList';
import { CommentForm } from '../CommentForm';

export const App = () => (
    <UserContextProvider>
        <Layout>
            <CommentsList />

            <CommentForm
                placeholder="Add a comment..."
                buttonLabel="Send"
            />
        </Layout>
    </UserContextProvider>
);
