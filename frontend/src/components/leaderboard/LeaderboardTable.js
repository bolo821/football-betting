import React from 'react';

const LeaderboardTable = props => {
    const { data } = props;

    return (
        <div className="container">
            { data.length > 0 ?
                <div className="table-responsive">
                    <table className="table history-table-rt">
                        <thead>
                            <tr>
                                <th scope="col">Account</th>
                                <th scope="col">Total Bet ETH</th>
                                <th scope="col">Total Claim ETH</th>
                                <th scope="col">Total Bet WCI</th>
                                <th scope="col">Total Claim WCI</th>
                            </tr>
                        </thead>
                        <tbody>
                            { data.map((ele, index) => (
                                <tr key={index}>
                                    <td>{ele.account}</td>
                                    <td>{ele.totalBet}</td>
                                    <td>{ele.totalClaim}</td>
                                    <td>{ele.totalBetWci}</td>
                                    <td>{ele.totalClaimWci}</td>
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
    )
}

export default LeaderboardTable;