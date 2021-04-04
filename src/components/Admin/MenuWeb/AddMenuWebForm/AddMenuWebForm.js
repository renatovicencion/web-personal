import React, { useState } from 'react';

import { Form, Input, Button, Select, notification } from "antd";
import { FontSizeOutlined } from '@ant-design/icons';
import { addMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

import "./AddMenuWebForm.scss";

const AddMenuWebForm = ({ setIsVisibleModal, setReloadMenuWeb }) => {

    const [menuWebData, setMenuWebData] = useState({});

    const addMenu = e => {
        let finalData = {
            title: menuWebData.title,
            url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url
        };

        if (!finalData.title || !finalData.url || !menuWebData.url) {
            notification["error"]({
                message: "Todos los campos son obligatorios."
            });
        } else {
            const accessToken = getAccessTokenApi();

            finalData.active = false;
            finalData.order = 1000;

            addMenuApi(accessToken, finalData)
                .then(response => {
                    notification["success"]({
                        message: response
                    });
                    
                    setIsVisibleModal(false);
                    setReloadMenuWeb(true);
                    setMenuWebData({});
                    finalData = {};
                })
                .catch(() => {
                    notification["error"]({
                        message: "Error en el servidor."
                    });
                });
        }
        
    }

    return (
        <div className="add-menu-web-form">
            <AddForm 
                menuWebData={menuWebData}
                setMenuWebData={setMenuWebData}
                addMenu={addMenu}
            />
        </div>
    );
};

function AddForm({ menuWebData, setMenuWebData, addMenu }) {

    const { Option } = Select;

    const selectBefore = (
        <Select
            defaultValue="http://"
            style={{ width: 90}}
            onChange={e => setMenuWebData({ ...menuWebData, http: e })}
        >
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );

    return (
        <Form className="form-add" onFinish={addMenu}>
            <Form.Item>
                <Input 
                    prefix={<FontSizeOutlined />}
                    placeholder="Título"
                    value={menuWebData.title}
                    onChange={e => setMenuWebData({ ...menuWebData, title: e.target.value })}
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    addonBefore={selectBefore}
                    placeholder="URL"
                    value={menuWebData.url}
                    onChange={e => setMenuWebData({ ...menuWebData, url: e.target.value })}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Crear Menú
                </Button>
            </Form.Item>
        </Form>
    );
} 

export default AddMenuWebForm;
