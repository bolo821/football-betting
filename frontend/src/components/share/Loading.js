import React from 'react';
import './index.css';
// import { Spinner } from 'react-bootstrap';

const Loading = props => {
    const { loading, loadingText, children } = props;

    return (
        <>
            <div className={`loading-mask-rt ${!loading && 'd-none'}`}>
                <div>
                    {/* <Spinner animation="border" role="status" /> */}
                    <h3>{loadingText}</h3>
                </div>
            </div>
            { children }
        </>
    );
}

export default Loading;