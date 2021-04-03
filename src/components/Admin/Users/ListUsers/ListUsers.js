import React, { useState, useEffect } from 'react';

import './ListUsers.scss';

import { Switch, List, Avatar, Button, Modal as ModalAntd, notification } from 'antd';
import { EditOutlined, StopOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import noAvatar from '../../../../assets/img/png/no-avatar.png';
import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm';
import AddUserForm from '../AddUserForm';
import { getAvatarApi, activateUserApi, deleteUserApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';

const { confirm } = ModalAntd;

const ListUsers = ({ usersActive, usersInactive, setReloadUsers }) => {

    const [viewUsersActives, setViewUsersActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const addUserModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando Nuevo Usuarix");
        setModalContent(<AddUserForm setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />);
    }

    return (
        <div className="list-users">
            <div className="list-users__header">

                <div className="list-users__header-switch">
                    <Switch
                        defaultChecked
                        onChange={() => setViewUsersActives(!viewUsersActives)}
                    />

                    <span className="span">
                        {viewUsersActives ? "Usuarios Activos" : "Usuarios Inactivos"}
                    </span>
                </div>

                <Button type="primary" onClick={addUserModal}>
                    Nuevo Usuario
                </Button>
            </div>
            

            {viewUsersActives ? ( 
                <UsersActive 
                    usersActive={usersActive} 
                    setIsVisibleModal={setIsVisibleModal} 
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    setReloadUsers={setReloadUsers}
                /> 
            ) : (
                <UsersInactive usersInactive={usersInactive} setReloadUsers={setReloadUsers} />
            )}

            <Modal 
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
                >
                {modalContent}
            </Modal>
        </div>
    );
};

function UsersActive({ usersActive, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers }) {

    const editUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`);
        setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />);
    }
    return (
        <List 
            className="users-active" 
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem={user => <UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers } />}
        />
    );  
}

function UserActive({ user, editUser, setReloadUsers }) {
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar)
                .then(response => {
                    setAvatar(response);
                });
        } else {
            setAvatar(null);
        }
    }, [user]);

    const desactivateUser = () => {
        const accessToken = getAccessTokenApi();

        activateUserApi(accessToken, user._id, false)
            .then(response => {
                notification["success"]({
                    message: response
                });
                setReloadUsers(true);
            })
            .catch(err => {
                notification["error"]({
                    message: err
                });
            });
    }

    const showDeleteConfirm = () => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: `Eliminando usuarix ${user.email}`,
            content: `¿Estás segurx que deseas eliminar a ${user.email}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteUserApi(accessToken, user._id)
                    .then(response => {
                        notification["success"]({
                            message: response
                        });
                        setReloadUsers(true);
                    })
                    .catch(err => {
                        notification["error"]({
                            message: err
                        })
                    })
            } 
        });
    }

    return (
        <List.Item 
            actions={[
                <Button 
                    onClick={() => editUser(user)}
                    style={{ background: "orange", borderColor: "orange", color: "#fff" }}
                >
                    <EditOutlined />
                </Button>,

                <Button 
                    style={{ background: "grey", borderColor: "grey", color: "#fff" }}
                    onClick={desactivateUser}
                >
                    <StopOutlined />
                </Button>,

                <Button 
                    type="danger"
                    onClick={showDeleteConfirm}
                >
                    <DeleteOutlined />
                </Button>
            ]}
        >
            <List.Item.Meta 
                avatar={<Avatar src={ avatar ? avatar : noAvatar } />} 
                title={`
                    ${ user.name ? user.name : '...' }
                    ${ user.lastname ? user.lastname : '...' }
                `}
                description={user.email}
            />
        </List.Item>
    );
}

function UsersInactive({ usersInactive, setReloadUsers  }) {
    return (
        <List 
            className="users-active" 
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={user => <UserInactive user={user} setReloadUsers={setReloadUsers } />}
        />
    );  
}

function UserInactive({ user, setReloadUsers  }) {
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar)
                .then(response => {
                    setAvatar(response);
                });
        } else {
            setAvatar(null);
        }
    }, [user]);

    const activateUser = () => {
        const accessToken = getAccessTokenApi();

        activateUserApi(accessToken, user._id, true)
            .then(response => {
                notification["success"]({
                    message: response
                });
                setReloadUsers(true);
            })
            .catch(err => {
                notification["error"]({
                    message: err
                });
            });
    }

    const showDeleteConfirm = () => {
        const accessToken = getAccessTokenApi();

        confirm({
            title: `Eliminando usuarix ${user.email}`,
            content: `¿Estás segurx que deseas eliminar a ${user.email}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteUserApi(accessToken, user._id)
                    .then(response => {
                        notification["success"]({
                            message: response
                        });
                        setReloadUsers(true);
                    })
                    .catch(err => {
                        notification["error"]({
                            message: err
                        })
                    })
            } 
        });
    }

    return (
        <List.Item 
            actions={[
                <Button 
                    type="primary"
                    onClick={activateUser}
                >
                    <CheckOutlined />
                </Button>,

                <Button 
                    type="danger"
                    onClick={showDeleteConfirm}
                >
                    <DeleteOutlined />
                </Button>

                
            ]}
        >
            <List.Item.Meta 
                avatar={<Avatar src={ avatar ? avatar : noAvatar } />} 
                title={`
                    ${ user.name ? user.name : '...' }
                    ${ user.lastname ? user.lastname : '...' }
                `}
                description={user.email}
            />
        </List.Item>
    );
}

export default ListUsers;
