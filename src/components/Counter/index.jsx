import { useState } from 'react';
import cns from 'classnames';

import { Plus, Minus } from '../../icons';
import cn from './styles.module.sass';

export const Counter = ({ className, initialCount, onChange }) => {
    const [count, setCount] = useState(initialCount);

    const handleChange = (type) => (event) => {
        event.preventDefault();

        if (type === 'increment') setCount(prevCount => prevCount + 1);
        if (type === 'decrement') setCount(prevCount => prevCount - 1);

        onChange({ target: type });
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
