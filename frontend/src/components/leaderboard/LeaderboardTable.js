import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import Pagination from '../Pagination';

const LeaderboardTable = props => {
    const { data } = props;
    const [currentPage, setCurrentPage] = useState(0);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setTableData(data.slice(currentPage*10, (currentPage+1)*10));
    }, [data, currentPage]);

    return (
        <div className="container">
            { data.length > 0 ?
                <div className="table-responsive mb-5">
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
                            { tableData.map((ele, index) => (
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
                    <Stack direction="row" justifyContent="flex-end">
                        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalCount={data.length} pageSize={10} />
                    </Stack>
                </div> :
                <div className="d-flex w-100 justify-content-center bottom-area mt-60 mb-5">
                    <h5>No history to display.</h5>
                </div>
            }
        </div>
    )
}

export default LeaderboardTable;