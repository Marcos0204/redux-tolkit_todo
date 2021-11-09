import { createAsyncThunk } from '@reduxjs/toolkit'

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
