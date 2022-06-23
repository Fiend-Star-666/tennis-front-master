import React from "react";
import ISearchForm from "./ISearchForm";
import ISort from "./ISort";
import IITable from './IITable';
import IPage from './IPage';

export default function ReduxSearch(){  
        return (
            <>
                {ISearchForm()}
                {ISort()}
                {IPage()}
                {IITable()}
            </>
        )
}