import { memo } from 'react';
import cns from 'classnames';

import cn from './styles.module.sass';

export const Content = memo(({ className, replyingTo, content }) => (
    <div className={cns(cn.root, className)}>
        {replyingTo && <span className={cn.replyingTo}>@{replyingTo} </span>}
        {content}
    </div>
));
