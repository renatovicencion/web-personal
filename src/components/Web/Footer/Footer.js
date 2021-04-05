import React from 'react';

import { Layout, Row, Col } from 'antd';
import MyInfo from './MyInfo';
import NavigationFooter from './NavigationFooter';
import Newsletter from '../Newsletter';

import './Footer.scss';

const Footer = () => {

    const { Footer } = Layout;

    return (
        <Footer className="footer">
            <Row>
                <Col md={4} />
                <Col md={16}>
                    <Row>
                        <Col md={8}><MyInfo /></Col>
                        <Col md={10}><NavigationFooter /></Col>
                        <Col md={6}><Newsletter /></Col>
                    </Row>


                    <Row className="footer__copyright">
                        <Col md={12}>© 2021 ALL RIGHTS RESERVED.</Col>
                        <Col md={12}>PIÑISCORATA | DESARROLLADOR WEB.</Col>
                    </Row>
                </Col>
                <Col md={4} />
            </Row>
        </Footer>
    );
};

export default Footer;
