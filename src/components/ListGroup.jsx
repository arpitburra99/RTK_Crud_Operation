import React from 'react';
import ListItems from './ListItems';
import { useGetAllTodosQuery } from '../feature/todos/todoSlice';
import { NavLink } from 'react-router-dom';

const ListGroup = () => {
  const { data: todoList, isError, isLoading } = useGetAllTodosQuery();

  return (
    <div className='container p-5'>
      <div className='d-flex align-items-center justify-content-between'>
        <h5>Todo List</h5>
        <NavLink to={'/form'} className='btn btn-secondary'>
          Add Todo
        </NavLink>
      </div>
      <div className='row'>
        {isLoading ? (
          <span className='text-center'>Loading...</span>
        ) : isError ? (
          <span className='text-center'>Something Went Wrong!</span>
        ) : todoList && todoList.length > 0 ? (
          todoList.map((todo) => <ListItems key={todo._id} todo={todo} />)
        ) : (
          <div className='container p-5'>
            <h5 className='text-center'>No Todo Data Yet!</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListGroup;
