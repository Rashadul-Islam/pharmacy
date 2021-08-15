import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const AdminSideBarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Add Medicine',
    path: '/addMedicine',
    icon: <IoIcons.IoMdAddCircleOutline />,
    cName: 'nav-text'
  },
  {
    title: 'Manage Medicine',
    path: '/manageMedicine',
    icon: <FaIcons.FaTools />,
    cName: 'nav-text'
  },
  {
    title: 'Add Member',
    path: '/addMember',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Manage Member',
    path: '/manageMember',
    icon: <FaIcons.FaTools />,
    cName: 'nav-text'
  },
  {
    title: 'Report',
    path: '/report',
    icon: <FaIcons.FaFilePdf/>,
    cName: 'nav-text'
  }
];