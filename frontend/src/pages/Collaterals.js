import React, { useState, useEffect } from 'react';

import Header from '../layouts/Header';
import Section1 from '../components/home/Section1';
import CollateralsTable from '../components/collaterals/CollateralsTable';

const Collaterals = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([
            { crypto: 'USDT', amount: '100' },
            { crypto: 'USDC', amount: '150' },
        ])
    }, []);

    return (
        <>
            <Header />
            <Section1 />
            <section className="pt-5 history-section-rt">
                <div className="bet-this-game all-soccer-bets">
                    <div className="title-rt">
                        <div className="container">
                            <div className="title-container-rt">
                                <div className="text-center">
                                    <h3 className='m-0'>Collaterals</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-rt">
                    <CollateralsTable data={data} />
                </div>
            </section>
        </>
    )
}

export default Collaterals;