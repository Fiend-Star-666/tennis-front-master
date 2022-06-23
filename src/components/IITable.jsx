import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchSelector, resetSearch } from "../redxSlice/searchNameSlice";
import { resetSort, sortSelector } from "../redxSlice/sortHandlerSlice";
import PlayerService from '../services/PlayerService';
import { pageSelector, pageValues, resetPageValues } from "../redxSlice/pageHandlerSlice";
import ITableHeader from "./ITableHeader";

export default function IITable() {


    function viewDate(data) {
        const rawDate = new Date(data);
        const date = rawDate.toLocaleDateString();
        return date;
    }

    const [playersData, setPlayersData] = useState([]);


    const dispatch = useDispatch();

    const searchForm = useSelector(searchSelector);

    const sortForm = useSelector(sortSelector);

    const pageForm = useSelector(pageSelector);

    useEffect(() => {

        if (searchForm.searchName !== '') {

            let url = searchForm.searchName + '?';
            if (pageForm.pageSize !== undefined) {
                url += 'size=' + pageForm.pageSize;
            }
            if (pageForm.pageNumber !== undefined) {
                url += '&page=' + pageForm.pageNumber;
            }

            if (sortForm.sortRequired) {
                url += '&sort=' + sortForm.sortType + ',' + sortForm.sortOrder;
            }

            PlayerService.getSearchedPlayers(url).then((res) => {
                //console.log(res);
                const playerPage = res.data;
                setPlayersData(playerPage.content);
                dispatch(pageValues({
                    pageNumber: playerPage.number,
                    pageSize: playerPage.size,
                    totalPages: playerPage.totalPages,
                }));
            });
        }
        else {
            dispatch(resetSearch());
            dispatch(resetSort());
            dispatch(resetPageValues());
            setPlayersData([]);
        }
    }, [searchForm, sortForm, pageForm, dispatch]);

    return (
        <>
            <br></br>
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">
                    {ITableHeader()}
                    <tbody>
                        {
                            playersData.map(
                                playerData =>
                                    <tr key={Math.random()}>
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

/*

    const [pageNumber, setPageNumber] = useState('');
    const [pageSize, setPageSize] = useState('');
    const [totalPages, setTotalPages] = useState('');


    const pageNumberHandler = (e) => {
        setPageNumber(e.target.value);
    }

    const pageSizeHandler = (e) => {
        setPageSize(e.target.value);
    }
*/