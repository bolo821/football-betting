import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import Pagination from '../Pagination';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import config from '../../config';

const LeaderboardTable = props => {
    const { data } = props;
    const [currentPage, setCurrentPage] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [sortBy, setSortBy] = useState(0);
    const [sortDirection, setSortDirection] = useState('down');

    useEffect(() => {
        setTableData(data.sort((a, b) => {
            switch (sortBy) {
                case 0: {
                    if (sortDirection === 'down') return b.totalBet - a.totalBet;
                    else return a.totalBet - b.totalBet;
                }
                case 1: {
                    if (sortDirection === 'down') return b.totalClaim - a.totalClaim;
                    else return a.totalClaim - b.totalClaim;
                }
                case 2: {
                    if (sortDirection === 'down') return b.totalBetWci - a.totalBetWci;
                    else return a.totalBetWci - b.totalBetWci;
                }
                case 3: {
                    if (sortDirection === 'down') return b.totalClaimWci - a.totalClaimWci;
                    else return a.totalClaimWci - b.totalClaimWci;
                }
                default: {
                    return 0;
                }
            }
        }).slice(currentPage*10, (currentPage+1)*10));
    }, [data, currentPage, sortBy, sortDirection]);

    useEffect(() => {
        setSortDirection('down');
    }, [sortBy]);

    const handleSort = (num) => {
        if (sortBy === num) {
            if (sortDirection === 'up') setSortDirection('down');
            else setSortDirection('up');
        }
        else setSortBy(num);
    }

    return (
        <div className="container">
            { data.length > 0 ?
                <div className="table-responsive mb-5">
                    <div className='overflow-auto mb-3'>
                        <table className="table history-table-rt">
                            <thead>
                                <tr>
                                    <th scope="col">Account</th>
                                    <th scope="col" className='th-sortable-header-rt' onClick={() => handleSort(0)}>
                                        <span>
                                            Total Bet ETH
                                            { (sortBy === 0 && sortDirection === 'down') && <ArrowDropDownIcon /> }
                                            { (sortBy === 0 && sortDirection === 'up') && <ArrowDropUpIcon /> }
                                            { sortBy !== 0 && <ArrowDropUpIcon style={{ visibility: 'hidden' }} /> }
                                        </span>
                                    </th>
                                    <th scope="col" className='th-sortable-header-rt' onClick={() => handleSort(1)}>
                                        <span>
                                            Total Claim ETH
                                            { (sortBy === 1 && sortDirection === 'down') && <ArrowDropDownIcon /> }
                                            { (sortBy === 1 && sortDirection === 'up') && <ArrowDropUpIcon /> }
                                            { sortBy !== 1 && <ArrowDropUpIcon style={{ visibility: 'hidden' }} /> }
                                        </span>
                                    </th>
                                    <th scope="col" className='th-sortable-header-rt' onClick={() => handleSort(2)}>
                                        <span>
                                            Total Bet WCI
                                            { (sortBy === 2 && sortDirection === 'down') && <ArrowDropDownIcon /> }
                                            { (sortBy === 2 && sortDirection === 'up') && <ArrowDropUpIcon /> }
                                            { sortBy !== 2 && <ArrowDropUpIcon style={{ visibility: 'hidden' }} /> }
                                        </span>
                                    </th>
                                    <th scope="col" className='th-sortable-header-rt' onClick={() => handleSort(3)}>
                                        <span>
                                            Total Claim WCI
                                            { (sortBy === 3 && sortDirection === 'down') && <ArrowDropDownIcon /> }
                                            { (sortBy === 3 && sortDirection === 'up') && <ArrowDropUpIcon /> }
                                            { sortBy !== 3 && <ArrowDropUpIcon style={{ visibility: 'hidden' }} /> }
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                { tableData.map((ele, index) => (
                                    <tr key={index}>
                                        <td>
                                            <a href={`${config.blockExplorer}/address/${ele.account}`} target="_blank" rel="noreferrer noopener">{ele.account}</a>
                                        </td>
                                        <td>{ele.totalBet}</td>
                                        <td>{ele.totalClaim}</td>
                                        <td>{ele.totalBetWci}</td>
                                        <td>{ele.totalClaimWci}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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