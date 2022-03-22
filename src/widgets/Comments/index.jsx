import { useCommentsContext } from '../../contexts';
import { Comment } from '../Comment';
import { TreeList } from '../../components';
import { useCallback, useMemo } from 'react';

const byScore = (a, b) => b.score - a.score;

export const Comments = () => {
    const { comments } = useCommentsContext();
    const rootComments = useMemo(
        () => comments.filter(({ parentId }) => parentId === null).sort(byScore),
        [comments]
    );

    const getRepliesById = useCallback(
        (id) => comments.filter(({ parentId }) => parentId === id).sort(byScore),
        [comments],
    );

    return (
        <TreeList
            entities={rootComments}
            component={Comment}
            getChildren={getRepliesById}
        />
    );
};
