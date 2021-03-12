import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';
import * as HiIcons from 'react-icons/hi';

export const SidebarData = [
    {
        title: 'Inventari',
        icon: <FaIcons.FaWarehouse />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
            title: 'Shto Produktin',
            path: '/addproduct',
            icon: <AiIcons.AiOutlineAppstoreAdd />,
            },
            {
            title: 'Shto Partner',
            path: '/addpartner',
            icon: <BiIcons.BiBuildingHouse />,
            },
            {
            title: 'Produktet',
            path: '/products',
            icon: <HiIcons.HiOutlineDocumentSearch />,
            },

        ]
    },
    {
        title: 'Shtije',
        path: '/sales',
        icon: <FaIcons.FaCartPlus />,
    },
    {
        title: 'Raporti',
        path: '/reports',
        icon: <HiIcons.HiOutlineDocumentText />,
    },
    {
        title: 'Informacioni',
        path: '/information',
        icon: <HiIcons.HiOutlineInformationCircle />,
    },
    {
        title: 'Llogaria',
        path: '/account',
        icon: <RiIcons.RiAccountCircleFill />,
    },
    {
        title: 'Përditësimet',
        path: '/settings',
        icon: <AiIcons.AiFillSetting />,
    },
]