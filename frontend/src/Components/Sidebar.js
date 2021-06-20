import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SidebarSubM from './SidebarSubM';
import logo from '../logo.png'

const Nav = styled.div`
background: #FC5C7D;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #6A82FB, #FC5C7D);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #6A82FB, #FC5C7D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: 80px;
  width 100%;
  position: fixed;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  top: 0;
  z-index: 9
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  &:hover{
      color: #FC5C7D;
  }
`;

const SidebarNav = styled.nav`
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
const Footer = styled.div`
    bottom: 0;
    margin-left: 60px;
    position: fixed;
    color: white;
    font-size: 12px;
`

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    function refreshPage() {
        window.location.reload(false);
      }
    return (
        <>
        <Nav>
        <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar}/>
        </NavIcon>
        </Nav>
        <SidebarNav className="SidebarNav" sidebar={sidebar}>
            <SidebarWrap>
                <NavIcon to="#">
                    <AiIcons.AiOutlineClose onClick={showSidebar} />
                </NavIcon>
                <div className="profile">
                    <div className="img-holder">
                        <img src={logo} alt="logo"/>
                    </div>
                    <div className="profile-name">
                        Irfan Ferati
                    </div> <button class="btn btn-danger mt05" onClick={refreshPage}>Log Out</button>
                </div>
                {SidebarData.map((item, index) => {
                    return <SidebarSubM item={item} key={index}  />;
                })}
            </SidebarWrap>
            <Footer><p>Powered by 2BMedia</p></Footer>
        </SidebarNav>
        </>
    );
};

export default Sidebar
