import React from "react";
import ISearchForm from "./ISearchForm";
import ISort from "./ISort";
import IITable from './IITable';

export default function ReduxSearch(){  
        return (
            <>
                {ISearchForm()}
                <br></br>
                {ISort()}
                <br></br>
                {IITable()}
            </>
        )
}