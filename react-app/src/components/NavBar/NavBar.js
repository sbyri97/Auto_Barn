import React, {useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { FaCaretDown, FaCaretUp, FaRegIdCard, FaSearch } from "react-icons/fa";
import { BiSearch } from 'react-icons/bi'
import { RiUserShared2Line } from 'react-icons/ri'
import LogoutButton from '../auth/LogoutButton';
import './navbar.css'
import LoginFormModal from '../auth/LoginFormModal';
import logo from '../../images/Transparent-logo.png'
import DemoButton from './demo';
import SignUpFormModal from '../auth/SignUpFormModal';
// import { searchCars } from '../../store/car';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session?.user)
  const dispatch = useDispatch()
  const history = useHistory()
  // const wrapperRef = useRef(null);

  const [yesDrpDwn, setYesDrpDown] = useState(false)

  useEffect(() => {
    setYesDrpDown(false);
  }, []);

  useEffect(() => {
    if (!yesDrpDwn) return;

    const closeMenu = () => {
      setYesDrpDown(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [yesDrpDwn]);

  const searchButton = (e) => {
    e.preventDefault()
    history.push('/search')
  }

  return (
    <nav className='main-navbar-container'>
      <div className='navbar-logo-container'>
        <NavLink to='/' exact={true} className='navbar-navlink-home'>
            <img className='navbar-ab-logo' src={logo} alt='ab_logo' />
        </NavLink>
      </div>
      {(!sessionUser) ?
      <div className='main-navbar-logout-items-container'>
        <div className='navbar-demo-container'>
          <div className='demo-btn'>
            <DemoButton />
          </div>
        </div>
        <div className='navbar-line'></div>
        <div className='navbar-signup-login-container'>
          <div className='navbar-signup'>
            <SignUpFormModal />
          </div>
          <div className='navbar-line'></div>
          <div className='navbar-login'>
            <div className='login-btn'>
              <LoginFormModal />
            </div>
          </div>
        </div>
      </div>
      :
      <div className='navbar-login-btn-container'>
        <div className='navbar-searchbar'>
          <button className='search-btn' onClick={searchButton}>
            Search &nbsp; <FaSearch />
          </button>
        </div>
        <div className='navbar-all-vehicles'>
          <NavLink to='/allcars' exact={true} className='navlink-allcars'>
              Vehicles
          </NavLink>
        </div>
        <div className='navbar-sell-vehicle'>
          <NavLink to='/newcar' exact={true} className='navlink-sell'>
              Sell Your Vehicle
          </NavLink>
        </div>
        <button className='navbar-login-btn' onClick={(e)=> setYesDrpDown(!yesDrpDwn)}>
          <div className='navbar-btn-div'>
            <div className='navbar-user-div'>
              <RiUserShared2Line />
            </div>
            <div className='navbar-username-container'>
              {sessionUser.username}
            </div>
            {(!yesDrpDwn ?
            <div className='navbar-drpdwn-btn'>
              <FaCaretDown />
            </div>
            :
            <div className='navbar-drpdwn-btn'>
            <FaCaretUp />
            </div>
            )}
          </div>
        </button>
        {yesDrpDwn && (
          <div className='navbar-menu-div'>
            <div className='navbar-menu-profile-btn'>
              <NavLink to={`/myaccount`} exact={true} className='navbar-user-btn'>
                <h3 className='navbar-profile-head'>MyAccount</h3>
                <FaRegIdCard />
              </NavLink>
            </div>
            <div className='navbar-menu-logout-btn'>
              <LogoutButton />
            </div>
          </div>
        )}
      </div>
      }
    </nav>
  );
}

export default NavBar;

// const NavBar = () => {
//   const sessionUser = useSelector((state) => state.session?.user)

//   const [yesDrpDwn, setYesDrpDown] = useState(false)


  // useEffect(() => {
  //   setYesDrpDown(false);
  // }, []);

  // useEffect(() => {
  //   if (!yesDrpDwn) return;

  //   const closeMenu = () => {
  //     setYesDrpDown(false);
  //   };

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [yesDrpDwn]);


//   return (
//     <nav className='main-navbar-container'>
//       {(!sessionUser) ?
//           <div className='main-navbar-logout-items-container'>
//             <div className='navbar-demo-container'>
//               <NavLink to='/about' id='demo-btn'>
//                 <div className='abt-btn'>
//                   ABOUT US
//                 </div>
//               </NavLink>
//             </div>
//             <div className='navbar-line'></div>
//             <div className='navbar-demo-container'>
//                 <div className='demo-btn'>
//                   <DemoUser />
//                 </div>
//             </div>
//             <div className='navbar-line'></div>
//             <div className='navbar-signup-login-container'>
//               <div className='navbar-signup'>
//                 <div className='signup-btn'>
//                   <SignUpFormModal />
//                 </div>
//               </div>
//               <div className='navbar-login'>
//                 <div className='login-btn'>
//                   <LoginFormModal />
//                 </div>
//               </div>
//             </div>
//           </div>
//       :
      // <div className='navbar-login-btn-container'>
      //     <button className='navbar-login-btn' onClick={(e)=> setYesDrpDown(!yesDrpDwn)}>
      //     {/* // need to have a state with onclick changing that state */}
      //       <div className='navbar-btn-div'>
      //         <div className='navbar-user-div'>
      //           <FaUserCircle />
      //         </div>
      //         <div className='navbar-username-container'>
      //           {sessionUser.first_name} {sessionUser.last_name}
      //         </div>
      //         {(!yesDrpDwn ?
      //         <div className='navbar-drpdwn-btn'>
      //           <FaCaretDown />
      //         </div>
      //         :
      //         <div className='navbar-drpdwn-btn'>
      //         <FaCaretUp />
      //         </div>
      //         )}
      //       </div>
      //     </button>
      //     {yesDrpDwn && (
      //       <div className='navbar-menu-div'>
      //         <div className='navbar-menu-profile-btn'>
      //           <NavLink to={`/users/${sessionUser.id}`} exact={true} className='navbar-user-btn'>
      //             <h3 className='navbar-profile-head'>Profile</h3>
      //             <FaRegIdCard />
      //           </NavLink>
      //         </div>
      //         <div className='navbar-menu-logout-btn'>
      //           <LogoutButton />
      //         </div>
      //       </div>
      //     )}
      // </div>
//     }
//     </nav>
//   );
// }

// export default NavBar;
