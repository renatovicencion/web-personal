import React, { useState, useEffect } from 'react';

import { getMenusApi } from '../../../api/menu';
import MenuWebList from '../../../components/Admin/MenuWeb/MenuWebList';

const MenuWeb = () => {

    const [menus, setMenus] = useState([]);
    const [reloadMenuWeb, setReloadMenuWeb] = useState(false);

    useEffect(() => {
        getMenusApi()
            .then(response =>{
                setMenus(response.menus);
            });
            setReloadMenuWeb(false);
    }, [reloadMenuWeb]);

    return (
        <div className="menu-web">
            <MenuWebList menus={menus} setReloadMenuWeb={setReloadMenuWeb} />
        </div>
    );
}

export default MenuWeb;