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

        console.log('TextArea value:', input.current.value);
        if (onSubmit) {
            onSubmit(input.current.value);
        }
        input.current.value = '';
    };

    return (
        <Card className={cn.card}>
            <Textarea ref={input} placeholder={placeholder} />

            <Image paths={user.image} alt="avatar" />

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

CommentForm.propTypes = {
    placeholder: PropTypes.string,
    buttonLabel: PropTypes.string,
    onSubmit: PropTypes.func,
};
