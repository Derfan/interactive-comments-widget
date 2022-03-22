import cns from 'classnames';

import { Plus, Minus } from '../../icons';
import cn from './styles.module.sass';

export const Counter = ({ className, count, onChange }) => {
    const handleChange = (type) => (event) => {
        event.preventDefault();

        onChange(type);
    };

    return (
        <div className={cns(cn.root, className)}>
            <button className={cn.button} onClick={handleChange('increment')}>
                <Plus />
            </button>

            <div className={cn.result}>{count}</div>

            <button className={cn.button} onClick={handleChange('decrement')}>
                <Minus />
            </button>
        </div>
    );
};
