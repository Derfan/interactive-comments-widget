import cn from './styles.module.sass';

export const Content = ({ replyingTo, content }) => (
    <main>
        {replyingTo && <span className={cn.replyingTo}>@{replyingTo} </span>}
        {content}
    </main>
);
