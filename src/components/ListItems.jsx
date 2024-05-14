import React from 'react';
import { useDeleteTodoMutation } from '../feature/todos/todoSlice';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

const ListItems = ({ todo }) => {
  const [deleteTodo] = useDeleteTodoMutation();

  const handleDelete = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete the item
        deleteTodo(todo._id)
          .then(() => {
            // Show success message after deletion
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
              button: 'ok',
            });
          })
          .catch((error) => {
            // Handle error if deletion fails
            console.error('Error deleting item:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete item. Please try again later.',
              icon: 'error',
              button: 'ok',
            });
          });
      }
    });
  };

  return (
    <div className='col-sm-12 col-md-6 col-lg-3 g-3'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title text-truncate'>{todo.title}</h5>
          <p className='card-text text-truncate'>{todo.description}</p>
          <div className='float-end'>
            <button className='btn btn-warning btn-sm'>
              <NavLink
                to={`edit/${todo._id}`}
                className='text-white text-decoration-none'
              >
                Edit
              </NavLink>
            </button>
            <button
              className='btn btn-danger btn-sm ms-2'
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItems;
