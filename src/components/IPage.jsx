import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pageSelector, pageValues } from "../redxSlice/pageHandlerSlice";

export default function IPage() {

    const dispatch = useDispatch();

    const pageForm = useSelector(pageSelector);

    const [localPage, setlocalPage] = useState({
        pageNumber: pageForm.pageNumber,
        pageSize: pageForm.pageSize,
        totalPages: pageForm.totalPages,
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setlocalPage({
            ...pageForm,
            [name]: value
        });


    }

    useEffect(() => {
        setlocalPage({
            pageNumber: pageForm.pageNumber,
            pageSize: pageForm.pageSize,
            totalPages: pageForm.totalPages,
        });
    }, [pageForm]);

    const submitForm = () => {
        dispatch(pageValues({
            pageNumber: localPage.pageNumber,
            pageSize: localPage.pageSize,
            totalPages: localPage.totalPages,
        }));
    }

    return (
        <>
            <br></br>
            <div style={{ width: 'auto', backgroundColor: 'lightgray', alignItems: 'center', boxShadow: '2px 2px' }}>
                <label>Page Size: &emsp;</label>
                <select value={localPage.pageSize} onChange={handleChange} name="pageSize">
                    <option value="">Choose Option</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
                &emsp;
                &emsp;
                <label>Page Number: &emsp;0 - {localPage.totalPages}
                    <input type="text" placeholder='Enter Page Number here' className="form-control" value={localPage.pageNumber} onChange={handleChange} name="pageNumber" style={{ width: '200px' }} />
                </label>
                &emsp;
                &emsp;
                <button className="btn btn-success" onClick={submitForm}>Change</button>
                &emsp;
                &emsp;
            </div>
            <br></br>
        </>
    )
}