import { memo } from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';

import { Image } from '../../../../components';
import cn from './style.module.sass';

export const AuthorInfo = memo(({ className, author, createdAt, createdByCurrentUser }) => (
    <div className={cns(cn.root, { [cn.self]: createdByCurrentUser },  className)}>
        <Image paths={author.image} alt="avatar" />

        <span className={cn.userName}>{author.username}</span>

        {createdByCurrentUser && <span className={cn.label}>you</span>}

        <span className={cn.createdAt}>{createdAt}</span>
    </div>
));

AuthorInfo.defaultProps = {
    className: '',
    createdAt: '',
    createdByCurrentUser: false,
};

AuthorInfo.propTypes = {
    author: PropTypes.shape({
        username: PropTypes.string,
        image: PropTypes.shape({
            png: PropTypes.string,
            webp: PropTypes.string,
        }),
    }).isRequired,
    className: PropTypes.string,
    createdAt: PropTypes.string,
    createdByCurrentUser: PropTypes.bool,
};
