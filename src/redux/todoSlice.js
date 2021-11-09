import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
    name:'todos',
    initialState: [
        {id:1, title:'todo 1', complete:false},
        {id:2, title:'todo 2', complete:false},
        {id:3, title:'todo 3', complete:true}
    ],
    reducers: {
        addTodo : (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                complete: false
            }
            state.push(newTodo)
        }  
    }
});

export const { addTodo } = todoSlice.actions

export default todoSlice.reducer