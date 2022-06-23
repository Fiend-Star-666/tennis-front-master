import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sortSelector, sortPlayers, resetSort } from "../redxSlice/sortHandlerSlice";

export default function ISort() {

    const dispatch = useDispatch();
    const sortForm = useSelector(sortSelector);
    const [localsort, setlocalsort] = useState({
        sortRequired: sortForm.sortRequired,
        sortType: sortForm.sortType,
        sortOrder: sortForm.sortOrder

    });

    useEffect(() => {
        setlocalsort({
            sortRequired: sortForm.sortRequired,
            sortType: sortForm.sortType,
            sortOrder: sortForm.sortOrder
        });
    }, [sortForm]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setlocalsort({
            ...localsort,
            [name]: value
        });
    }

    const resetForm = () => {
        dispatch(resetSort());
        setlocalsort({
            sortRequired: sortForm.sortRequired,
            sortType: sortForm.sortType,
            sortOrder: sortForm.sortOrder
        })
    }

    const submitForm = (e) => {
        dispatch(sortPlayers({
            sortRequired: localsort.sortRequired,
            sortType: localsort.sortType,
            sortOrder: localsort.sortOrder
        }));
    }

    let SortType;

    if (localsort.sortRequired) {

        SortType = (
            <div className="form-group">
                <select className="form-control" value={localsort.sortType} onChange={handleChange} name="sortType">
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

    if (localsort.sortRequired) {

        SortOrder = (
            <div className="form-group">
                <select className="form-control" value={localsort.sortOrder} onChange={handleChange} name="sortOrder">
                    <option value="">Select Sort Order</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        );
    }

    let SortButton;

    if (localsort.sortRequired) {
        SortButton = (
            <div className="col">
                <button className="btn btn-success" onClick={submitForm}>Sort</button>
                <br></br>
                <br></br>
                <button className="btn btn-danger" onClick={resetForm}>Reset Sort</button>
            </div>
        );
    }


    return (
        <>
            <div style={{ backgroundColor: 'lightgray', alignItems: 'center', boxShadow: '2px 2px' }}>
                <div className="row">
                    <div className="col">
                        <div style={{ textAlign: 'center' }}>
                            <br></br>
                            <label>Sort Required?</label>
                        </div>
                        <input type="checkbox" className="form-control" checked={localsort.sortRequired} onChange={handleChange} name="sortRequired" />
                        <br></br>
                    </div>
                    <div className="col">
                        <br></br>
                        {SortType}
                        {SortOrder}
                    </div>
                    <div className="col">
                        <br></br>
                        {SortButton}
                    </div>
                    <br></br>
                </div>
            </div>
        </>
    )
}