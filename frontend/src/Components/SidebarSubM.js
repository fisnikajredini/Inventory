import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
    display: flex;
    color: #e1e9fc;
`

const SidebarLabel = styled.span``;

const DropdownLink = styled(Link)`
`;

const SidebarSubM = ({ item }) => {
    const [subnav, setSubnav] = useState(false)

    const showSubnav = () => setSubnav(!subnav)
    return (
        <>
            <SidebarLink to={item.path} className="SidebarLink" id={window.location.pathname == item.path ? "active" : ""} onClick={item.subNav && showSubnav} >
                <div>
                    {item.icon}
                    <SidebarLabel className="SidebarLabel">{item.title}</SidebarLabel>
                </div>
                <div>
                    {item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null}
                </div>
            </SidebarLink>
            {subnav && item.subNav.map((item, index) => {
                return (
                    <DropdownLink to={item.path} key={index} className="DropdownLink" id={window.location.pathname == item.path ? "active" : ""}>
                        {item.icon}
                        <SidebarLabel className="SidebarLabel">{item.title}</SidebarLabel>
                    </DropdownLink>
                )
            })}
        </>
    )
}

export default SidebarSubM

