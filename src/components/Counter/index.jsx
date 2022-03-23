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
            <button
                aria-label="increment"
                className={cn.button}
                onClick={handleChange('increment')}
            >
                <Plus />
            </button>

            <div className={cn.result}>{count}</div>

            <button
                aria-label="decrement"
                className={cn.button}
                onClick={handleChange('decrement')}
            >
                <Minus />
            </button>
        </div>
    );
};
