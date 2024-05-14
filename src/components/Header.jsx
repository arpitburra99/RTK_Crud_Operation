import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='navbar bg-primary'>
      <div className='container-fluid justify-content-center'>
        <NavLink to={'/'} className='navbar-brand mb-0 h1'>
          RTK Redux Crud
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
