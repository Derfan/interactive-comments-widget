import cns from 'classnames';

import cn from './styles.module.sass';

export const Card = ({ children, className }) =>
    <div className={cns(cn.root, className)}>{children}</div>;
