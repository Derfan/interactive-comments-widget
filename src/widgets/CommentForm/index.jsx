import { useRef } from 'react';
import PropTypes from 'prop-types';

import { useUserContext } from '../../contexts';
import { Button, Image, Card, Textarea } from '../../components';

import cn from './styles.module.sass';

export const CommentForm = ({ placeholder, buttonLabel, onSubmit }) => {
    const input = useRef();
    const user = useUserContext();

    const clickHandler = () => {
        if (!input.current.value) {
            return input.current.focus();
        }
        onSubmit(input.current.value);
        input.current.value = '';
    };

    return (
        <Card className={cn.card}>
            <Textarea ref={input} className={cn.field} placeholder={placeholder} />

            <Image className={cn.image} paths={user.image} alt="avatar" />

            <Button
                type="cta"
                className={cn.button}
                onClick={clickHandler}
            >
                {buttonLabel}
            </Button>
        </Card>
    );
};

CommentForm.defaultProps = {
    placeholder: '',
};

CommentForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};
