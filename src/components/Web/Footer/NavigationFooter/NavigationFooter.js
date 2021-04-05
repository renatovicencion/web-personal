import React from 'react';

import { Row, Col } from 'antd';
import { BookOutlined, CodeOutlined, DatabaseOutlined, RightOutlined, HddOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './NavigationFooter.scss';

const NavigationFooter = () => {
    return (
        <Row className="navigation-footer">
            <Col>
                <h3>Navegación</h3>
            </Col>

            <Row>
                <Col md={12}>
                    <RenderListLeft />
                </Col>
                <Col md={12}><RenderListRight /></Col>
            </Row>
        </Row>
    );
};

function RenderListLeft() {
    return (
        <ul>
            <li>
                <a href="#">
                    <BookOutlined className="icon" /> Cursos Online
                </a>
            </li>

            <li>
                <a href="#">
                    <CodeOutlined className="icon" /> Desarrollo Web
                </a>
            </li>

            <li>
                <a href="#">
                    <DatabaseOutlined className="icon" /> Bases de Datos
                </a>
            </li>

            <li>
                <a href="#">
                    <RightOutlined className="icon" /> Políticas de Privacidad
                </a>
            </li>

        </ul>
    );
}

function RenderListRight() {
    return (
        <ul>
            <li>
                <a href="#">
                    <HddOutlined className="icon" /> Sistemas / Servidores
                </a>
            </li>

            <li>
                <a href="#">
                    <AppstoreOutlined className="icon" /> CMS
                </a>
            </li>

            <li>
                <a href="#">
                    <UserOutlined className="icon" /> Portafolio
                </a>
            </li>

            <li>
                <a href="#">
                <RightOutlined className="icon" /> Políticas de Cookie
                </a>
            </li>

        </ul>
    );
}


export default NavigationFooter;
