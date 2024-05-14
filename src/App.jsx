import React from 'react';
import Header from './components/Header';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './feature/store';
import ListGroup from './components/ListGroup';
import Form from './components/Form';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Outlet />
    </Provider>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ListGroup />,
      },
      {
        path: '/form',
        element: <Form />,
      },
      {
        path: '/edit/:_id',
        element: <Form />,
      },
    ],
  },
]);

export default App;
