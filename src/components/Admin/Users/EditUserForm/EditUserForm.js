import React, { useState, useEffect, useCallback } from 'react';

import noAvatar from '../../../../assets/img/png/no-avatar.png';
import { Avatar, Form, Input, Select, Button, Row, Col, notification } from 'antd';
import { useDropzone } from 'react-dropzone';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { updateUserApi, uploadAvatarApi, getAvatarApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';

import "./EditUserForm.scss";

const EditUserForm = ({ user, setIsVisibleModal, setReloadUsers }) => {

    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setUserData({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            avatar: user.avatar
        });
    }, [user]);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar)
                .then(response => {
                    console.log(response);
                    setAvatar(response);
                });
        } else {
            setAvatar(null);
        }
    }, [user]);

    useEffect(() => {
        if (avatar) {
            setUserData({ ...userData, avatar: avatar.file });
        }
    }, [avatar]);

    const updateUser = e => {
        const token = getAccessTokenApi();
        let userUpdate = userData;

        if (userUpdate.password || userUpdate.repeat_password) {
            if (userUpdate.password !== userUpdate.repeat_password) {
                notification['error']({
                    message: "Las contraseñas tienen que ser iguales."
                });
                
                return;
            } else {
                delete userUpdate.repeat_password;
            }
        }

        if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
            notification['error']({
                message: "El nombre, apellidos y email son obligatorios."
            });
            return;
        }

        if (typeof userUpdate.avatar === "object") {
            uploadAvatarApi(token, userUpdate.avatar, user._id)
                .then(response => {
                    userUpdate.avatar = response.avatarName;
                    updateUserApi(token, userUpdate, user._id)
                        .then(result => {
                            notification["success"]({
                                message: result.message
                            });
                            setIsVisibleModal(false);
                            setReloadUsers(true);
                        });
                });
        } else {
            updateUserApi(token, userUpdate, user._id)
                .then(result => {
                    notification["success"]({
                        message: result.message
                    });
                    setIsVisibleModal(false);
                    setReloadUsers(true);
                });
        }
        // setUserData({
        //     password: user.password,
        //     repeat_password: user.repeat_password
        // }); // Otra forma de limpiar campos
        setUserData({...userData, password:"", repeat_password:""});
    };

    return (
        <div className="edit-user-form">
            <UploadAvatar className="upload-avatar" avatar={avatar} setAvatar={setAvatar} />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} />
        </div>
    );
};

function UploadAvatar({ avatar, setAvatar }) {

    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if (avatar) {
            if (avatar.preview) {
                setAvatarUrl(avatar.preview);
            } else {
                setAvatarUrl(avatar);
            }
        } else {
            setAvatarUrl(null);
        }
    }, [avatar]);

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({file, preview: URL.createObjectURL(file)})
        }, [setAvatar]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={noAvatar} />
            ) : (
                <Avatar size={150} src={avatarUrl ? avatarUrl : noAvatar} />
            )}
        </div>
    );
}

function EditForm({ userData, setUserData, updateUser }) {

    const { Option } = Select;

    return (
        <Form className="form-edit" onFinish={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<UserOutlined className="ico" />}
                            placeholder="Nombre"
                            value={userData.name}
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<UserOutlined className="ico" />}
                            placeholder="Apellidos"
                            value={userData.lastname}
                            onChange={e => setUserData({ ...userData, lastname: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<MailOutlined className="ico" />}
                            placeholder="Correo Electrónico"
                            value={userData.email}
                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                        <Select 
                            placeholder="Selecciona un rol"
                            onChange={e => setUserData({ ...userData, role: e })}
                            value={userData.role}
                        >
                            <Option value="admin">Administrador</Option>
                            <Option value="editor">Editor</Option>
                            <Option value="reviewr">Revisor</Option>
                        </Select>
                    </Form.Item>
                    
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<LockOutlined className="ico" />}
                            type="password"
                            value={userData.password}
                            placeholder="Contraseña"
                            onChange={e => setUserData({ ...userData, password: e.target.value })}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item>
                        <Input 
                            prefix={<LockOutlined className="ico" />}
                            type="password"
                            value={userData.repeat_password}
                            placeholder="Repetir Contraseña"
                            onChange={e => setUserData({ ...userData, repeat_password: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Usuario
                </Button>
            </Form.Item>
        </Form>
    );
}

export default EditUserForm;
