import React, { useState } from 'react';

import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { signInApi } from '../../../api/user';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';

import './LoginForm.scss';

const LoginForm = () => {

    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const onChangeForm = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const login = async e => {

        const result = await signInApi(input);

        if (result.message) {
            notification['error']({
                message: result.message
            });
        } else {
            const { accessToken, refreshToken } = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);

            notification['success']({
                message: "Login Correcto."
            });

            window.location.href = "/admin";
        }

        console.log(result);
    };

    return (
        <Form className="login-form" onChange={onChangeForm} onFinish={login}>
            <Form.Item>
                <Input 
                    prefix={<UserOutlined className="ico" style={{ color: "rgba(0,0,0,.25)"}} /> }
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    className="login-form__input"
                />
            </Form.Item>

            <Form.Item>
                <Input.Password
                    prefix={<LockOutlined className="ico" style={{ color: "rgba(0,0,0,.25)"}} /> }
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="login-form__input"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" className="login-form__button">
                    Entrar
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
