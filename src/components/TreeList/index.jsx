import { Fragment } from 'react';

import cn from './styles.module.sass';

export const TreeList = ({ entities, nestedField, component: Component }) => {
    if (!entities.length) return null;

    return (
        <>
            {entities.map((entitie) => {
                const { [nestedField]: nestedList } = entitie;

                return (
                    <Fragment key={entitie.id}>
                        <Component {...entitie} />

                        {Boolean(nestedList && nestedList.length) && (
                            <div className={cn.nestedList}>
                                <TreeList
                                    entities={nestedList}
                                    nestedField={nestedField}
                                    component={Component}
                                />
                            </div>
                        )}
                    </Fragment>
                );
            })}
        </>
    );
};
