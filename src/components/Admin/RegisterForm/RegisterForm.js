import React, { useState } from 'react';

import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { emailValidation, minLengthValidation } from '../../../utils/formValidation';
import { signUpApi } from '../../../api/user';

import "./RegisterForm.scss";

const RegisterForm = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        repeat_password: "",
        privacy_policy: false
    });

    const [formValid, setFormValid] = useState({
        email: false,
        password: false,
        repeat_password: false,
        privacy_policy: false
    });

    const onChangeForm = e => {
        if (e.target.name === "privacy_policy") {
            setInput({
                ...input,
                [e.target.name]: e.target.checked
            });
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            });
        }
    };

    const inputValidation = e => {
        const { type, name } = e.target;

        if (type === "email") {
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target)
            });
        }

        if (type === "password") {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target, 6)
            });
        }

        if (type === "checkbox") {
            setFormValid({
                ...formValid,
                [name]: e.target.checked
            });
        }
    }

    const register = async e => {
        const { email, password, repeat_password, privacy_policy } = formValid;
        const emailVal = input.email;
        const passwordVal = input.password;
        const repeat_passwordVal = input.repeat_password;
        const privacy_policyVal = input.privacy_policy;

        if (!emailVal || !passwordVal || !repeat_passwordVal || !privacy_policyVal) {
            notification['error'] ({
                message: "Todos los campos son obligatorios"
            });
        } else {
            if (passwordVal !== repeat_passwordVal) {
                notification['error'] ({
                    message: "Las contraseñas tienen que ser iguales"
                });
            } else {
                // TO DO: CONECTAR CON EL API Y REGISTRAR EL USUARIO.

                const result = await signUpApi(input);
                
                if (!result.ok) {
                    notification['error'] ({
                        message: result.message
                    });
                } else {
                    notification['success'] ({
                        message: result.message
                    });
                    resetForm();
                }
            }
        }
    };

    const resetForm = () => {
        const input = document.getElementsByTagName('input');

        for (let i = 0; i < input.length; i++) {
            input[i].classList.remove("success");
            input[i].classList.remove("error");
        }

        setInput({
            email: "",
            password: "",
            repeat_password: "",
            privacy_policy: false
        });

        setFormValid({
            email: false,
            password: false,
            repeat_password: false,
            privacy_policy: false
        });
    };

    return (
        <div>
            <Form className="register-form" onFinish={register} onChange={onChangeForm}>
                <Form.Item>
                    <Input
                        prefix={<UserOutlined className="ico" style={{ color: "rgba(0,0,0,.25) "}} />}
                        type="email" 
                        name="email" 
                        placeholder="Correo Electrónico"
                        className="register-form__input"
                        onChange={inputValidation}
                        value={input.email}
                        addonAfter={ formValid.email ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                    />
                </Form.Item>

                <Form.Item>
                    <Input.Password
                        prefix={<LockOutlined className="ico"  style={{ color: "rgba(0,0,0,.25) "}} />}
                        type="password" 
                        name="password" 
                        placeholder="Contraseña"
                        className="register-form__input"
                        onChange={inputValidation}
                        value={input.password}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        addonAfter={ formValid.password ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                    />
                </Form.Item>

                <Form.Item>
                    <Input.Password
                        prefix={<LockOutlined className="ico"  style={{ color: "rgba(0,0,0,.25) "}} />}
                        type="password" 
                        name="repeat_password" 
                        placeholder="Repetir Contraseña"
                        className="register-form__input"
                        onChange={inputValidation}
                        value={input.repeat_password}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        addonAfter={ formValid.repeat_password ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                    />
                </Form.Item>

                <Form.Item>
                    <Checkbox
                        name="privacy_policy"
                        onChange={inputValidation}
                        checked={input.privacy_policy}
                    >
                        He leído y acepto las políticas de privacidad.
                    </Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button block htmlType="submit" className="register-form__button">
                        Crear Cuenta
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterForm;
