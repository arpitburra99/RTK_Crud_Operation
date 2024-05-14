import React, { useEffect, useState } from 'react';
import {
  useAddTodoMutation,
  useGetAllTodosQuery,
  useGetTodoQuery,
  useUpdateTodoMutation,
} from '../feature/todos/todoSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Form = () => {
  // const { refetch } = useGetAllTodosQuery();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [editTodo, setEditTodo] = useState();

  const navigate = useNavigate();
  const { _id } = useParams();
  const { data } = useGetTodoQuery(_id);
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  useEffect(() => {
    if (_id && data) {
      setEditTodo(true);
      setFormData({ ...data });
    } else {
      setEditTodo(false);
    }
  }, [_id, data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editTodo) {
      await updateTodo(formData);
      Swal.fire({
        icon: 'success',
        title: 'Todo Updated Successfully',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
    } else {
      await addTodo(formData);
      Swal.fire({
        icon: 'success',
        title: 'Todo Added Successfully',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
      setFormData('');
    }
    // refetch();
    navigate('/');
    setEditTodo(false);
  };

  return (
    <div className='container p-5 bg-light mt-5'>
      <h4 className='text-center'>{editTodo ? 'Update' : 'Todo'} Form</h4>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='exampleFormControlInput1' className='form-label'>
            Title
          </label>
          <input
            type='text'
            className='form-control'
            id='exampleFormControlInput1'
            placeholder='Enter Title...'
            name='title'
            onChange={handleChange}
            value={formData.title}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleFormControlTextarea1' className='form-label'>
            Description
          </label>
          <textarea
            className='form-control'
            id='exampleFormControlTextarea1'
            rows='3'
            placeholder='Enter Desc...'
            name='description'
            onChange={handleChange}
            value={formData.description}
          ></textarea>
          <button className='btn btn-success w-100 my-2' type='submit'>
            {editTodo ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
