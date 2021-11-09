import React from 'react';
import { useSelector } from 'react-redux'

const TotalCompleteItems = () => {
	const todosCompleted = useSelector(
		({todos})=> todos.filter(item => item.completed === true))
	return <h4 className='mt-3'>Total Complete Items: {todosCompleted.length}</h4>;
};

export default TotalCompleteItems;
