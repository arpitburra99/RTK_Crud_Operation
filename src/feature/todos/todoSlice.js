import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ["Todo"],

  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => '/todo',
      providesTags: ["Todo"],
    }),
    getTodo: builder.query({
      query: (_id) => `/todo/${_id}`,
      providesTags: ["Todo"],
    }),
    addTodo: builder.mutation({
      query: (formData) => ({
        url: '/todo',
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation({
      query: (_id) => ({
        url: `/todo/${_id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/todo/${_id}`,
        method: 'PUT',
        body: rest
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodoQuery,
  useUpdateTodoMutation
} = todosApi;