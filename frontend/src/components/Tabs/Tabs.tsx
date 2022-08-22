
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Tabs.scss';

export interface Tab {
    path: string;
    name?: string;
    info?: any // TODO: Show extra info. For the number of product in the basket
}

interface TabsProps {
    tabs: Array<Tab>;
}

export const Tabs: React.FunctionComponent<TabsProps> = ({ tabs }) => {
    return (
        <div className='tabs separator'>
            {tabs.map((tab, index) => 
                tab.name ?
                    <NavLink
                        key={index}
                        className='tab-link'
                        activeClassName="tab-active"
                        style={{ pointerEvents: 'inherit' }}
                        to={{ pathname: tab.path }}
                        exact
                    >
                        {tab.name}
                    </NavLink>
                : undefined
            )}
        </div>
    );
};
