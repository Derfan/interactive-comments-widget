import PropTypes from 'prop-types';
import cns from 'classnames';

import { Button } from '../../../../components';
import cn from './styles.module.sass';

export const Controls = ({
    className,
    createdByCurrentUser,
    isEditable,
    isReplyVisible,
    onSave,
    onReply,
    onDelete,
    onEdit,
}) => {
    if (isEditable) {
        return (
            <div className={cns(cn.controls, className)}>
                <Button type="cta" onClick={onSave}>Update</Button>
            </div>
        )
    }

    return (
        <div className={cns(cn.controls, className)}>
            {createdByCurrentUser
                ? (
                    <>
                        <Button type="delete" onClick={onDelete}>Delete</Button>
                        <Button type="edit" onClick={onEdit}>Edit</Button>
                    </>
                )
                : !isReplyVisible && <Button type="reply" onClick={onReply}>Reply</Button>
            }
        </div>
    );
}

Controls.defaultProps = {
    createdByCurrentUser: false,
    isEditable: false,
    isReplyVisible: false,
};

Controls.propTypes = {
    createdByCurrentUser: PropTypes.bool,
    isEditable: PropTypes.bool,
    isReplyVisible: PropTypes.bool,
    onSave: PropTypes.func.isRequired,
    onReply: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};