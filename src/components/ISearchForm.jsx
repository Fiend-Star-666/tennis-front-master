import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchName, resetSearch, searchSelector } from '../redxSlice/searchNameSlice';
import { useEffect } from 'react';

export default function ISearchForm() {

    const dispatch = useDispatch();

    const searchForm = useSelector(searchSelector);

    const [localsearch, setlocalSearch] = useState({
        searchName: searchForm.searchName
    });

    useEffect(() => {
        setlocalSearch({
            searchName: searchForm.searchName
        });
    }, [searchForm])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setlocalSearch({
            ...localsearch,
            [name]: value
        });
    }

    const resetForm = () => {
        dispatch(resetSearch());
        setlocalSearch({
            searchName: searchForm.searchName
        })
    }

    const submitForm = (e) => {
        dispatch(searchName({
            searchName: localsearch.searchName
        }));

    }

    return (
        <>
            <br></br>
            <br></br>
            <div className='card' style={{ width: 'auto', backgroundColor: 'lightgray', alignItems: 'center', boxShadow: '2px 2px' }}>
                <div className="row">
                    <div className='col'>
                        <label>Search By Name</label>
                        <input type="text" placeholder='Enter Name here' className="form-control"
                            value={localsearch.searchName} onChange={handleChange} name="searchName"
                            style={{ width: '200px' }}
                        />
                        <button type="button" className='button mb-2' onClick={submitForm}>Search</button>
                        &emsp;
                        &emsp;
                        <button type="button" className='button mb-2' onClick={resetForm}>Reset</button>
                    </div>
                </div>
            </div>
        </>
    )

}
