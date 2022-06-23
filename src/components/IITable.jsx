import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchSelector, resetSearch } from "../redxSlice/searchNameSlice";
import { resetSort, sortSelector } from "../redxSlice/sortHandlerSlice";
import PlayerService from '../services/PlayerService';

export default function IITable() {


    function viewDate(data) {
        const rawDate = new Date(data);
        const date = rawDate.toLocaleDateString();
        return date;
    }

    const [playersData, setPlayersData] = useState([]);
    const [pageNumber, setPageNumber] = useState('');
    const [pageSize, setPageSize] = useState('');
    const [totalPages, setTotalPages] = useState('');


    const pageNumberHandler = (e) => {
        setPageNumber(e.target.value);
    }

    const pageSizeHandler = (e) => {
        setPageSize(e.target.value);
    }

    const dispatch = useDispatch();

    const searchForm = useSelector(searchSelector);
    
    const sortForm = useSelector(sortSelector);

    useEffect(() => {

        if (searchForm.searchName !== '') {

            let url = searchForm.searchName + '?';
            if (pageSize !== undefined) {
                url += 'size=' + pageSize;
            }
            if (pageNumber !== undefined) {
                url += '&page=' + pageNumber;
            }

            if (sortForm.sortRequired) {
                url += '&sort=' + sortForm.sortType + ',' + sortForm.sortOrder;
            }

            PlayerService.getSearchedPlayers(url).then((res) => {
                console.log(res);
                const playerPage = res.data;
                setPlayersData(playerPage.content);
                setPageNumber(res.data.number);
                setPageSize(res.data.size);
                setTotalPages(res.data.totalPages);
            });
        }
        else {
            dispatch(resetSearch());
            dispatch(resetSort());
            setPageNumber('');
            setPageSize('');
            setTotalPages(0);
            setPlayersData([]);
        }
    }, [searchForm, sortForm, pageSize, pageNumber, dispatch]);

    return (
        <>
            <br></br>
            <div style={{ width: 'auto', backgroundColor: 'lightgray', alignItems: 'center', boxShadow: '2px 2px' }}>
                <label>Page Size: &emsp;</label>
                <select value={pageSize} onChange={pageSizeHandler} >
                    <option value="">Choose Option</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
                &emsp;
                &emsp;
                &emsp;
                &emsp;
                <label>Page Number: &emsp;0 - {totalPages}
                    <input type="text" placeholder='Enter Page Number here' className="form-control" value={pageNumber} onChange={pageNumberHandler} style={{ width: '200px' }} />
                </label>
                &emsp;
                &emsp;
                &emsp;
                &emsp;
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            playersData.map(
                                playerData =>
                                    <tr key={playerData.id}>
                                        <td>    {playerData.rankOfPlayer}                                </td>
                                        <td>    {playerData.name}                                        </td>
                                        <td style={{ width: '200px' }}>{viewDate(playerData.dateOfBirth)}</td>
                                        <td>    {playerData.points}                                      </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}