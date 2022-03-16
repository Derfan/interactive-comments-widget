import PropTypes from 'prop-types';

import { Counter, Button } from '../../../../components';
import cn from './styles.module.sass';

const Controls = ({ createdByCurrentUser, onReply, onDelete, onEdit }) => (
    <div className={cn.controls}>
        {createdByCurrentUser
            ? <Button type="reply" onClick={onReply}>Reply</Button>
            : (
                <>
                    <Button type="delete" onClick={onDelete}>Delete</Button>
                    <Button type="edit" onClick={onEdit}>Edit</Button>
                </>
            )
        }
    </div>
);

Controls.propTypes = {
    createdByCurrentUser: PropTypes.bool,
    onReply: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export const Footer = ({ score, createdByCurrentUser, onScoreChange, onReply, onDelete, onEdit }) => (
    <footer className={cn.root}>
        <Counter initialCount={score} onChange={onScoreChange} />

        <Controls
            createdByCurrentUser={createdByCurrentUser}
            onReply={onReply}
            onDelete={onDelete}
            onEdit={onEdit}
        />
    </footer>
);

Footer.defaultProps = {
    createdByCurrentUser: false,
};

Footer.propTypes = {
    score: PropTypes.number.isRequired,
    createdByCurrentUser: PropTypes.bool,
    onScoreChange: PropTypes.func.isRequired,
    onReply: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};
