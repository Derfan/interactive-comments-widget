import { memo } from 'react';

import cn from './styles.module.sass';

export const Content = memo(({ replyingTo, content }) => (
    <main className={cn.root}>
        {replyingTo && <span className={cn.replyingTo}>@{replyingTo} </span>}
        {content}
    </main>
));
