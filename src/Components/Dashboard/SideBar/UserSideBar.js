import React, { useContext, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import './UserSideBar.css';
import { IconContext } from 'react-icons';
import { AdminSideBarData } from './AdminSideBarData';
import { SellerSideBarData } from './SellerSideBarData';
import { UserContext } from '../../../App';
const UserSideBar = () => {

    const history = useHistory();

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    let { role } = loggedInUser;
    const Role = role || sessionStorage.getItem('role');

    const handleSignOut = () => {
        setLoggedInUser({});
        sessionStorage.clear();
        history.push("/login");
    }
    return (
        <div>
            <>
                <IconContext.Provider value={{ color: '#fff' }}>
                    <div className='navbar-top d-flex justify-content-between pb-3'>
                        <Link to='#' className='menu-bars'>
                            <FaIcons.FaBars onClick={showSidebar} />
                        </Link>
                        <p className='text-white px-4 pt-4'>{Role}<span className="signOut" onClick={handleSignOut}><span><FaIcons.FaSignOutAlt /></span> SignOut</span></p>
                    </div>

                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items' onClick={showSidebar}>
                            <li className='navbar-top-toggle'>
                                <Link to='#' className='menu-bars'>
                                    <AiIcons.AiOutlineClose />
                                </Link>
                            </li>
                            {Role === "Admin" ?
                                AdminSideBarData.map((item, index) => {
                                    return (
                                        <li key={index} className={item.cName}>
                                            <Link to={item.path}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    );
                                }
                                )
                                :
                                SellerSideBarData.map((item, index) => {
                                    return (
                                        <li key={index} className={item.cName}>
                                            <Link to={item.path}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    );
                                }
                                )
                            }
                        </ul>
                    </nav>
                </IconContext.Provider>
            </>
        </div>
    );
};

export default UserSideBar;