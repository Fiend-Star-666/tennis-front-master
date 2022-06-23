import React, { useState } from 'react';
import PlayerService from '../services/PlayerService';
import table from './Table';
import customTable from './CustomTable';

export default function CustomSearch() {

    const [playersData, setPlayersData] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchRank, setSearchRank] = useState('');
    const [pageNumber, setPageNumber] = useState('');
    const [pageSize, setPageSize] = useState('');
    const [totalPages, setTotalPages] = useState('');

    function viewDataName() {
        let url = searchName + '?';
        if (pageSize !== undefined) {
            url += 'size=' + pageSize;
        }
        if (pageNumber !== undefined) {
            url += '&page=' + pageNumber;
        }
        
        if(true){
            url+= '&sort=rankOfPlayer,desc'
        }
        
        console.log('url', url);
        PlayerService.getSearchedPlayers(url).then((res) => {
            console.log(url);
            const playerPage = res.data;
            setPlayersData(playerPage.content);
            setPageNumber(res.data.number);
            setPageSize(res.data.size);
            setTotalPages(res.data.totalPages);
        });
    };

    function viewDataRank() {
        if (searchRank < 506) {
            PlayerService.getPlayerByRank(searchRank).then((res) => {
                const playerPage = res.data;
                setPlayersData(playerPage);
            });
        }
        else alert("Please Enter Valid Rank Value");
    };

    const searchNameHandler = (e) => {
        setSearchName(e.target.value);
    }

    const searchRankHandler = (e) => {
        setSearchRank(e.target.value);
    }


    const pageNumberHandler = (e) => {
        setPageNumber(e.target.value);
    }

    const pageSizeHandler = (e) => {
        setPageSize(e.target.value);
    }



    return (
        <>
            <br></br>
            <br></br>
            <div className='card' style={{ width: 'auto', backgroundColor: 'lightgray', alignItems: 'center', boxShadow: '2px 2px' }}>
                <div className="row">
                    <div className='col'>
                        <label>Search By Name</label>
                        <input type="text" placeholder='Enter Name here' className="form-control" value={searchName} onChange={searchNameHandler} style={{ width: '200px' }} />
                        <button type="submit" className="button mb-2" onClick={() => viewDataName(searchName)}>Submit</button>
                    </div>
                    <div className='col'>
                        <label>Search by Rank </label>
                        <input type="text" pattern="[0-9]*" placeholder='Enter Rank here' className="form-control" value={searchRank} onChange={searchRankHandler} style={{ width: '200px' }} />
                        <button type="submit" className="button mb-2" onClick={() => viewDataRank(searchRank)}>Submit</button>
                    </div>
                </div>
            </div>
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
            </div>
            <br></br>

            {
            table(playersData)
            //customTable(playersData)
            }
        </>
    )
}