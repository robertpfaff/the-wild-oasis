import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { 
  HiOutlineCalendarDays, 
  HiOutlineCog6Tooth, 
  HiOutlineHomeModern,
  HiOutlineUsers,
 } from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;  
  flex-direction: column;
  list-style-type: none;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  && {
    color: #4b5563;
    font-family: 'Poppins', sans-serif;
    display: flex;
    justify-content: flex-start;
    text-decoration-line: none;
    gap: 1rem;
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }
  &&:hover {
    color: #4f46e5 !important;
    background-color: #f9fafb;
    border-radius: 5px;
  }
  &&:active {
    color: #4f46e5 !important;
    background-color: #f9fafb;
    border-radius: 5px;
  }
  &&.active:link {
    color: #4f46e5 !important;
    background-color: #f9fafb;
    border-radius: 5px;
  }
  &&.active:visited {
    color: #4f46e5 !important;
    background-color: #f9fafb;
    border-radius: 5px;
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #9ca3af;
    transition: all 0.3s;
  }
  &&:hover svg {
    color: #4f46e5;
  }
  &&:active svg {
    color: #4f46e5;
  }
  &&.active:link svg {
    color: #4f46e5;
  }
  &&.active:visited svg {
    color: #4f46e5;
  }
`;

  function MainNav() {
    return (
      <nav>
        <NavList>
          <li ><StyledNavLink to='/dashboard'>
          <HiOutlineCalendarDays /> <span>Home</span></StyledNavLink></li>
          
          <li ><StyledNavLink to='/bookings'>
          <HiOutlineCalendarDays /> <span>Bookings</span></StyledNavLink></li>
          
          <li ><StyledNavLink to='/cabins'>
          <HiOutlineHomeModern /> <span>Cabins</span></StyledNavLink></li>
          
          <li ><StyledNavLink to='/users'>
          <HiOutlineUsers /> <span>Users</span></StyledNavLink></li>
          
          <li ><StyledNavLink to='/settings'>
          <HiOutlineCog6Tooth /> <span>Settings</span></StyledNavLink></li>
        </NavList> 
      </nav>
    );
  }

export default MainNav;

