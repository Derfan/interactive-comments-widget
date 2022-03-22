import { Fragment } from 'react';

import cn from './styles.module.sass';

export const TreeList = ({ entities, component: Component, getChildren }) => {
    if (!entities.length) return null;

    return (
        <>
            {entities.map((entitie) => {
                const children = getChildren(entitie.id);

                return (
                    <Fragment key={entitie.id}>
                        <Component {...entitie} />

                        {Boolean(children && children.length) && (
                            <div className={cn.nestedList}>
                                <TreeList
                                    entities={children}
                                    component={Component}
                                    getChildren={getChildren}
                                />
                            </div>
                        )}
                    </Fragment>
                );
            })}
        </>
    );
};
