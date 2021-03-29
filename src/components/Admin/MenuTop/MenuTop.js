import React from 'react';
import { Button } from "antd";
import { Link } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined, PoweroffOutlined } from '@ant-design/icons';
import logo from '../../../assets/img/png/logo-white.png';

import "./MenuTop.scss";

const MenuTop = ({ menuCollapsed, setMenuCollapsed }) => {
    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <Link to={"/admin"}>
                    <img 
                        className="menu-top__left-logo"
                        src={logo}
                        alt="Piñisco"
                    />
                </Link>

                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                    { menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
                </Button>
            </div>

            <div className="menu-top__right">
                <Button type="link" onClick={() => console.log('Desconexión')}>
                    <PoweroffOutlined />
                </Button>
            </div>
        </div>
    );
};

export default MenuTop;
