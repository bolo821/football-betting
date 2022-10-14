import React from 'react';

const HistoryTable = props => {
    const { data } = props;

    return (
        <section className="mt-3 pt-5 history-section-rt">
            <div className="container">
                { data.length > 0 ?
                    <div className="table-responsive">
                        <table className="table history-table-rt">
                            <thead>
                                <tr>
                                    <th scope="col">Match</th>
                                    <th scope="col">Choice</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Bet Amount</th>
                                    <th scope="col">Reward</th>
                                </tr>
                            </thead>
                            <tbody>
                                { data.map((ele, index) => (
                                    <tr key={index}>
                                        <td>{ele.team1} / {ele.team2}</td>
                                        <td>{ele.choice}</td>
                                        <td>{ele.status}</td>
                                        <td>{ele.betAmount}</td>
                                        <td>{ele.profit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> :
                    <div className="d-flex w-100 justify-content-center bottom-area mt-60 mb-5">
                        <h5>No history to display.</h5>
                    </div>
                }
            </div>
        </section>
    )
}

export default HistoryTable;