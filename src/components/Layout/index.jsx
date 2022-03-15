import cn from './styles.module.sass';

export const Layout = ({ children }) =>
    <div className={cn.root}>{children}</div>;
