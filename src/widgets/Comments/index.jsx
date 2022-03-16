import { useCommentsContext } from '../../contexts';
import { Comment } from '../Comment';
import { TreeList } from '../../components';

export const Comments = () => {
    const comments = useCommentsContext();

    return (
        <TreeList
            entities={comments}
            nestedField="replies"
            component={Comment}
        />
    );
};
