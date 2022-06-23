import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchSelector, resetSearch, searchName } from "../redxSlice/searchNameSlice";
import PlayerService from '../services/PlayerService';

export default function ITable() {


    function viewDate(data) {
        const rawDate = new Date(data);
        const date = rawDate.toLocaleDateString();
        return date;
    }

    const [playersData, setPlayersData] = useState([]);
    const [pageNumber, setPageNumber] = useState('');
    const [pageSize, setPageSize] = useState('');
    const [totalPages, setTotalPages] = useState('');



    const [sortRequired, setSortRequired] = useState(false);
    const [sortType, setSortType] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    let SortType;

    if (sortRequired) {

        SortType = (
            <div className="form-group">
                <select className="form-control" value={sortType} onChange={(e) => setSortType(e.target.value)}>
                    <option value="">Select Sort Type</option>
                    <option value="name">Name</option>
                    <option value="rankOfPlayer">Rank</option>
                    <option value="dateOfBirth">Date of Birth</option>
                    <option value="points">Points</option>
                </select>
            </div>
        );
    }

    let SortOrder;

    if (sortRequired) {

        SortOrder = (
            <div className="form-group">
                <select className="form-control" onChange={(e) => {
                    setSortOrder(e.target.value);
                }
                }>
                    <option value="">Select Sort Order</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        );
    }

    const pageNumberHandler = (e) => {
        setPageNumber(e.target.value);
    }

    const pageSizeHandler = (e) => {
        setPageSize(e.target.value);
    }

    const dispatch = useDispatch();
    const searchForm = useSelector(searchSelector);


    useEffect(() => {

        if (searchForm.searchName !== '') {
            /*
            dispatch(searchName({
                searchName: searchForm.searchName,
               // pageNumber: pageNumber,
                //pageSize: pageSize
            }));
            */
            let url = searchForm.searchName + '?';
            if (pageSize !== undefined) {
                url += 'size=' + pageSize;
            }
            if (pageNumber !== undefined) {
                url += '&page=' + pageNumber;
            }

            if (sortRequired) {
                url += '&sort='+sortType+','+sortOrder;
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
            setPageNumber('');
            setPageSize('');
            setTotalPages(0);
            setPlayersData([]);
        }
    }, [searchForm,sortType,sortOrder,pageSize,pageNumber]);

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
                <label>Sort Required?
                <div className="row">
                    <input type="checkbox" className="form-control" checked={sortRequired} onChange={() => setSortRequired(!sortRequired)} />
                        <div className="col">{SortType}</div>
                        <div className="col">{SortOrder}</div>
                    </div>
                </label>
            </div>
            <br></br>
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