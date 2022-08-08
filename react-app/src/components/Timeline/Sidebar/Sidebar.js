import React from 'react';
import { useSelector } from 'react-redux';
import SidebarJokeModal from './SidebarJokeModal';
import LogoutButton from '../../auth/LogoutButton';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {

  const user = useSelector(state => state.session.user);

  return (
    <div className='WholeSidebar'>
      <div>
        <div>
          <p>LOGO</p>
        </div>
        <NavLink to='/jokes'>
          <p>Home</p>
        </NavLink>
      </div>
      <NavLink to={`/users/${user.id}`}>
        <div>
          <p>Profile</p>
        </div>
      </NavLink>
      <div>
        <SidebarJokeModal />
      </div>
      <LogoutButton />
    </div>

  )
}

export default Sidebar
