import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        searchName: '',
//        sortType: '',
//        sortOrder: ''
//        pageNumber: '',
//        pageSize: '',
    }
}

export const searchNameSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        searchName: (state, action) => {
            //console.log('state', state);
           // console.log('action', action);
            state.value.searchName = action.payload.searchName;
            //state.value.pageNumber = action.payload.pageNumber;
           // state.value.pageSize = action.payload.pageSize;
        },
        resetSearch: (state) => {
            state.value.searchName = '';
            //state.value.pageNumber = '';
            //state.value.pageSize = '';
        }
    },
})

// Action creators are generated for each case reducer function
export const { searchName, resetSearch} = searchNameSlice.actions;

export const searchSelector = (state) => state.searchNameHandler.value;

export default searchNameSlice.reducer;