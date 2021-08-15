import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const SellerSideBarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Sell Medicine',
    path: '/sellMedicine',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Edit Profile',
    path: '/editProfile',
    icon: <FaIcons.FaTools />,
    cName: 'nav-text'
  }
];