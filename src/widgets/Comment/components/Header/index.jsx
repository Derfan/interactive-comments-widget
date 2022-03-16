import { memo } from 'react';
import PropTypes from 'prop-types';

import { Image } from '../../../../components';
import cn from './style.module.sass';

export const Header = memo(({ author, createdAt, createdByCurrentUser }) => (
    <header className={cn.root}>
        <Image paths={author.image} alt="avatar" />

        <span className={cn.userName}>{author.username}</span>

        {createdByCurrentUser && <span className={cn.label}>you</span>}

        <span>{createdAt}</span>
    </header>
));

Header.defaultProps = {
    createdAt: '',
    createdByCurrentUser: false,
};

Header.propTypes = {
    author: PropTypes.shape({
        username: PropTypes.string,
        image: PropTypes.shape({
            png: PropTypes.string,
            webp: PropTypes.string,
        }),
    }).isRequired,
    createdAt: PropTypes.string,
    createdByCurrentUser: PropTypes.bool,
};
