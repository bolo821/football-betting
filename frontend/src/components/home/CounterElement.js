import React from "react";

const CounterElement = props => {
    const { count, unit } = props;

    return (
        <div className="counter-element-container-rt">
            <div className="number">
                {count}
            </div>
            <div className="unit">
                {unit}
            </div>
        </div>
    )
}

export default CounterElement;