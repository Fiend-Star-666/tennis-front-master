import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        pageNumber: '',
        pageSize: '',
        totalPages: '',
    }
}

export const pageHandlerSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        pageValues: (state,action) => {
            state.value.pageNumber = action.payload.pageNumber;
            state.value.pageSize = action.payload.pageSize;
            state.value.totalPages = action.payload.totalPages;
        },
        resetPageValues: (state) => {
            state.value.pageNumber = '';
            state.value.pageSize = '';
            state.value.totalPages = '';
        }
    },
})

// Action creators are generated for each case reducer function
export const { pageValues, resetPageValues } = pageHandlerSlice.actions;

export const pageSelector = (state) => state.pageHandler.value;


export default pageHandlerSlice.reducer;