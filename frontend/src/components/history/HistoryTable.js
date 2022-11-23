import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import Pagination from '../Pagination';

const HistoryTable = props => {
    const { data } = props;
    const [currentPage, setCurrentPage] = useState(0);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        let inversedData = [];
        for (let i=data.length-1; i>=0; i--) {
            inversedData.push(data[i]);
        }

        setTableData(inversedData.slice(currentPage*10, (currentPage+1)*10));
    }, [data, currentPage]);

    return (
        <div className="container">
            { data.length > 0 ?
                <div className="table-responsive mb-5">
                    <table className="table history-table-rt">
                        <thead>
                            <tr>
                                <th scope="col">Match</th>
                                <th scope="col">Choice</th>
                                <th scope="col">Status</th>
                                <th scope="col">Bet Amount</th>
                                <th scope="col">Reward</th>
                                <th scope="col">Token</th>
                            </tr>
                        </thead>
                        <tbody>
                            { tableData.map((ele, index) => (
                                <tr key={index}>
                                    <td>{ele.team1} / {ele.team2}</td>
                                    <td>{ele.choice}</td>
                                    <td>{ele.status}</td>
                                    <td>{ele.betAmount}</td>
                                    <td>{ele.profit}</td>
                                    <td>{ele.token}</td>
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

export default HistoryTable;