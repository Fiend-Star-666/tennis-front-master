import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        sortRequired: false,
        sortType: 'rankOfPlayer',
        sortOrder: 'asc'
    }
}

export const sortHandlerSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        sortPlayers: (state,action) => {
            state.value.sortRequired = action.payload.sortRequired;
            state.value.sortType = action.payload.sortType;
            state.value.sortOrder = action.payload.sortOrder;
        },
        resetSort: (state) => {
            state.value.sortRequired = false;
            state.value.sortType = 'rankOfPlayer';
            state.value.sortOrder = 'asc';
        }
    },
})

// Action creators are generated for each case reducer function
export const { sortPlayers, resetSort } = sortHandlerSlice.actions;

export const sortSelector = (state) => state.sortHandler.value;


export default sortHandlerSlice.reducer;