import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = props => {
    const { loading, loadingText, children } = props;

    return (
        <>
            <div className={`loading-mask-rt ${!loading && 'd-none'}`}>
                <div>
                    <Spinner animation="border" role="status">
                    </Spinner>
                    <h3>{loadingText}</h3>
                </div>
            </div>
            { children }
        </>
    );
}

export default Loading;