import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Card } from '../Card';
import cn from './styles.module.sass';

export const Modal = ({ children, isOpen, handleClose }) => {
    useEffect(() => {
        const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;

        document.addEventListener('keyup', closeOnEscapeKey);

        return () => {
            document.removeEventListener('keyup', closeOnEscapeKey);
        };
    }, [handleClose]);

    if (!isOpen) return null;

    return (
        <div className={cn.overlay}>
            <Card className={cn.card}>
                {children}
            </Card>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
};
