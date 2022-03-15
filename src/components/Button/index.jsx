import cns from 'classnames';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

import { Edit, Reply, Delete } from '../../icons';
import cn from './styles.module.sass';

const icons = {
    reply: Reply,
    edit: Edit,
    delete: Delete,
};

export const Button = ({ children, type, className, onClick }) => {
    const Icon = icons[type] || null;

    const clickHandler = useCallback((event) => {
        event.preventDefault();

        onClick();
    }, [onClick]);

    return (
        <button
            className={
                cns(
                    cn.button,
                    {
                        [cn.cta]: type === 'cta',
                        [cn.delete]: type === 'delete',
                    },
                    className,
                )
            }
            onClick={clickHandler}
        >
            {Icon && <Icon />}
            {children}
        </button>
    )
};

Button.defaultProps = {
    className: '',
};

Button.propTypes = {
    type: PropTypes.oneOf(['cta', 'reply', 'edit', 'delete']).isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
};
