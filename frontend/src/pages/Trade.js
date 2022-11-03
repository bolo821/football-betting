import React from 'react';

import Header from '../layouts/Header';
import Section1 from '../components/home/Section1';

import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';

const Trade = () => {
    const handleBuyCrypto = () => {
        new RampInstantSDK({
            hostAppName: 'WorldCupInu',
            hostLogoUrl: 'https://wcibets.club:8443/logo.png',
            variant: 'auto'
        }).show();
    }

    return (
        <>
            <Header />
            <Section1 />
            <section className="dashboard-content pt-2">
                <div className="overlay">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="dashboard-heading-rt dashboard-heading p-3 w-100">
                                    <ul className="nav league-nav-rt" role="tablist">
                                        <li className="nav-item active" role="presentation">
                                            <button className="nav-link active mr-2" id='aaaaaa' data-bs-target='#bbbbbb' aria-controls='bbbbbb'
                                                aria-selected="false" data-bs-toggle="tab" type="button" role="tab"
                                            >
                                                Swap
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id='cc' data-bs-target='#dd' aria-controls='dd'
                                                aria-selected="false" data-bs-toggle="tab" type="button" role="tab"
                                                onClick={handleBuyCrypto}
                                            >
                                                Buy Crypto
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content pt-4">
                        <div className='tab-pane fade show active' id='bbbbbb' role="tabpanel" aria-labelledby='aaaaaa'>
                            <div className="container mb-3">
                                <iframe
                                    src="https://app.uniswap.org/#/swap?outputCurrency=0xC5a9BC46A7dbe1c6dE493E84A18f02E70E2c5A32"
                                    height="660px"
                                    width="100%"
                                    style={{
                                        border: '0',
                                        margin: '0 auto',
                                        display: 'block',
                                        borderRadius: '10px',
                                        maxWidth: '100%',
                                        minWidth: '300px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Trade;