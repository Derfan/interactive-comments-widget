import PropTypes from 'prop-types';
import cns from 'classnames';

import { Modal, Button } from '../../components';
import cn from './styles.module.sass';

export const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} handleClose={onClose}>
            <h3 className={cn.title}>Delete comment</h3>

            <p className={cn.description}>
                Are you sure you want to delete this comment? This will remove the comment and can't be undone
            </p>

            <div className={cn.controls}>
                <Button
                    type="cta"
                    onClick={onClose}
                    className={cns(cn.button, cn.cancel)}
                >
                    No, cancel
                </Button>
                <Button
                    type="cta"
                    onClick={onConfirm}
                    className={cns(cn.button, cn.confirm)}
                >
                    Yes, delete
                </Button>
            </div>
        </Modal>
    );
};

DeleteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};
