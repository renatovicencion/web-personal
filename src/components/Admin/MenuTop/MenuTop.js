import React from 'react';
import { Button } from "antd";
import { Link, Redirect } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined, PoweroffOutlined } from '@ant-design/icons';
import logo from '../../../assets/img/png/logo-white.png';
import { logout } from '../../../api/auth';


import "./MenuTop.scss";

const MenuTop = ({ menuCollapsed, setMenuCollapsed }) => {

    const logoutUser = () => {
        logout();
        window.location.reload(); // Otra opción de redirigir
        // return <Redirect to="/admin/login" />
    };

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
                <Button type="link" onClick={logoutUser}>
                    <PoweroffOutlined />
                </Button>
            </div>
        </div>
    );
};

export default MenuTop;
