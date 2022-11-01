import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const SwapModal = () => {
    return (
        <Modal
            isOpen={true}
            onRequestClose={() => {}}
            className="swap-modal-rt"
            overlayClassName="myoverlay"
            closeTimeoutMS={500}
        >
            <div className="mb-3">
                <iframe
                    src="https://app.uniswap.org/#/swap?outputCurrency=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"
                    height="600px"
                    width="100%"
                    style={{
                        border: '0',
                        margin: '0 auto',
                        display: 'block',
                        borderRadius: '10px',
                        maxWidth: '600px',
                    }}
                />
            </div>
        </Modal>
    );
}

export default SwapModal;