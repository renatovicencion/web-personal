import React, { useState, useEffect } from 'react';

import { Menu } from 'antd';
import { Link } from "react-router-dom";
import SocialLinks from '../SocialLinks';
import { getMenusApi } from '../../../api/menu';
import logoWhite from '../../../assets/img/png/logo-white.png';

import "./MenuTop.scss";

const MenuTop = () => {

    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        getMenusApi()
            .then(response => {
                const arrayMenu = [];

                response.menus.forEach(menu => {
                    // if (menu.active) {
                    //     arrayMenu.push(menu);
                    // } // Es lo mismo que lo de abajo

                    menu.active && arrayMenu.push(menu);
                });

                setMenuData(arrayMenu);
            });
    }, []);

    return (
        <Menu className="menu-top-web" mode="horizontal">
            <Menu.Item className="menu-top-web__logo">
                <Link to={"/"}>
                    <img src={logoWhite} alt="Piñisco" />
                </Link>
            </Menu.Item>

            {
                menuData.map(item => {
                    const external = item.url.indexOf("http") > -1 ? true : false;

                    if (external) {
                        return (
                            <Menu.Item key={item._id} className="menu-top-web__item">
                                <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item key={item._id} className="menu-top-web__item">
                            <Link to={item.url}>{item.title}</Link>
                        </Menu.Item>
                    );
                })
            }

            <SocialLinks />
        </Menu>
    );
};

export default MenuTop;
