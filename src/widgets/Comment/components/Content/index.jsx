import { memo } from 'react';

import cn from './styles.module.sass';

export const Content = memo(({ replyingTo, content }) => (
    <main>
        {replyingTo && <span className={cn.replyingTo}>@{replyingTo} </span>}
        {content}
    </main>
));
