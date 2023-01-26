import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: { 
        users: [],
        filteredusers: [],
        pageIndex: 0
    },
    reducers: {
        //action to add new employee to store
        setNewEmployee: (state, { payload }) => {
            state.users = [...state.users, payload]
        },
        //action to set store of filterd employyes
        setFilteredEmployees: (state, { payload }) => {
            state.filteredusers = payload
        },
        setPageIndex: (state, {payload}) => {
          return {
            ...state,
            pageIndex: payload,
          }
        }
    } 
})

export const { setNewEmployee , setFilteredEmployees, setPageIndex } = userSlice.actions;
export default userSlice.reducer;