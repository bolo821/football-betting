import React from 'react';

const CollateralsTable = props => {
    const { data } = props;

    return (
        <div className="container">
            { data.length > 0 ?
                <div className="table-responsive">
                    <table className="table history-table-rt">
                        <thead>
                            <tr>
                                <th scope="col">Crypto</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Deposit</th>
                                <th scope="col">Withdraw</th>
                            </tr>
                        </thead>
                        <tbody>
                            { data.map((ele, index) => (
                                <tr key={index}>
                                    <td>{ele.crypto}</td>
                                    <td>{ele.amount}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="cmn-btn reg set-bn-rt"
                                            onClick={() => {}}
                                        >
                                            Deposit
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="cmn-btn reg set-bn-rt"
                                            onClick={() => {}}
                                        >
                                            Withdraw
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> :
                <div className="d-flex w-100 justify-content-center bottom-area mt-60 mb-5">
                    <h5>No collateral to display.</h5>
                </div>
            }
        </div>
    )
}

export default CollateralsTable;