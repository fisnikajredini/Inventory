import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SidebarSubM from './SidebarSubM';
import logo from '../logo.png'

const SidebarNav = styled.nav`
    width: 250px;
`

const SidebarWrap = styled.div`
    width: 100%;
`


const Sidebar = () => {
    return (
        <>
        <SidebarNav className="SidebarNav">
            <div className="profile">
                <div className="img-holder">
                    <img src={logo} />
                </div>
                <div className="profile-name">
                    Irfan Ferati
                </div> <button class="btn btn-danger mt05">Log Out</button>
            </div>
            {SidebarData.map((item, index) => {
                return <SidebarSubM item={item} key={index}  />;
            })}
            <SidebarWrap>
                
            </SidebarWrap>
            <div className="footer"><p>Powered by 2BMedia</p></div>
        </SidebarNav>
        </>
    )
}

export default Sidebar
