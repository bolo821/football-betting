import React from 'react';

const TabItem = props => {
    const { id, className, dataTarget, children } = props;

    return (
        <li className="nav-item" role="presentation">
            <button className={className} id={id} data-bs-target={`#${dataTarget}`} aria-controls={dataTarget}
                aria-selected="false" data-bs-toggle="tab" type="button" role="tab"
            >
                {children}
            </button>
        </li>
    )
}

export default TabItem;