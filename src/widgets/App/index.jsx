import { UserContextProvider } from '../../contexts';
import { Layout } from '../../components';
import { CommentsList } from '../CommentsList';
import { CommentForm } from '../CommentForm';

const mock = [
    { content: 'Comment 1' },
    { 
        content: 'Comment 2',
        replies: [
            { content: 'SubSomment 1' },
            { content: 'SubSomment 2', replies: [{ content: 'SubSubSomment 1' }, { content: 'SubSubSomment 2' }] },
        ],
    },
    { content: 'Comment 3' },
];

export const App = () => (
    <UserContextProvider>
        <Layout>
            <CommentsList comments={mock} />

            <CommentForm
                placeholder="Add a comment..."
                buttonLabel="Send"
            />
        </Layout>
    </UserContextProvider>
);
