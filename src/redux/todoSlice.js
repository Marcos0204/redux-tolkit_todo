import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getTodosAsync = createAsyncThunk(
	'todos/getTodosAsync',
	async () => {
		const resp = await fetch('http://localhost:7000/todos');
		if (resp.ok) {
			const todos = await resp.json();
			return { todos };
		}
	}
);

export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async (payload) => {
		const resp = await fetch('http://localhost:7000/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: payload.title }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);
export const toggleCompleteAsync = createAsyncThunk(
	'todos/completeTodoAsync',
	async (payload) => {
		const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ completed: payload.completed }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async (payload) => {
		const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
			method: 'DELETE',
		});

		if (resp.ok) {
			return { id: payload.id };
		}
	}
);

const todoSlice = createSlice({
    name:'todos',
    initialState: [
        {id:1, title:'todo 1', completed:false},
        {id:2, title:'todo 2', completed:false},
        {id:3, title:'todo 3', completed:true}
    ],
    reducers: {
        addTodo : (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                complete: false
            }
            state.push(newTodo)
        },
        toggleComplete : (state, action) =>{
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id )
            state[index].completed = action.payload.completed
        },
        deleteTodo : (state, action) => {
           return state.filter(todo => todo.id !== action.payload.id)
        }
    },
    extraReducers: {
		[getTodosAsync.fulfilled]: (state, action) => {
			// state= action.payload.todos
            // return state
            return action.payload.todos;
		},
		[addTodoAsync.fulfilled]: (state, action) => {
			state.push(action.payload.todo);
		},
		[toggleCompleteAsync.fulfilled]: (state, action) => {
			const index = state.findIndex(
				(todo) => todo.id === action.payload.todo.id
			);
			state[index].completed = action.payload.todo.completed;
		},
		[deleteTodoAsync.fulfilled]: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
});

export const { addTodo,
                toggleComplete,
                deleteTodo
                } = todoSlice.actions

export default todoSlice.reducer