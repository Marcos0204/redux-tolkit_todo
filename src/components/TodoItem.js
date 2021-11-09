import React from 'react';
import { useDispatch } from 'react-redux'
import { toggleCompleteAsync, deleteTodoAsync } from '../redux/todoSlice'

const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch()

	const haldleCompleteClick = () => {
		dispatch(toggleCompleteAsync({
			id: id,
			completed: !completed
		}))
	}

	const handleDeleteTOdo = () =>{
		dispatch(deleteTodoAsync({
			id
		}))
	}

	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input type='checkbox' className='mr-3' checked={completed}
						onChange={haldleCompleteClick}
					></input>
					{title}
				</span>
				<button className='btn btn-danger' onClick={handleDeleteTOdo}>Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
