import { useCallback, forwardRef } from 'react';
import cns from 'classnames';
import PropTypes from 'prop-types';

import cn from './styles.module.sass';

export const Textarea = forwardRef(({ name, className, placeholder, onChange, ...props }, ref) => {
    const changeHandler = useCallback((event) => {
        event.preventDefault();

        if (onChange) {
            onChange({
                name: event.target.name,
                value: event.target.value,
            });
        }
    }, [onChange]);

    return (
        <textarea
            ref={ref}
            name={name}
            className={cns(cn.field, className)}
            placeholder={placeholder}
            onChange={changeHandler}
            {...props}
        />
    )
});

Textarea.defaultProps = {
    name: 'textarea',
    className: '',
    placeholder: '',
};

Textarea.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
};
