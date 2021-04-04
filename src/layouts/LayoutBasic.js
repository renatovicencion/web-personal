import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Layout, Row, Col } from "antd";
import MenuTop from '../components/Web/MenuTop';

import "./LayoutBasic.scss";

const LayoutBasic = ({ routes }) => {

    const { Footer } = Layout;

    return (
        <Row>
            <Col lg={4} />

            <Col lg={16}>
                <MenuTop />
                <LoadRoutes routes={routes} />
                <Footer>Piñisco...</Footer>
            </Col>

            <Col lg={4} />
        </Row>
    );
};

function LoadRoutes({ routes }) {
    return (
        <Switch>
            {
                routes.map((route, index) => (
                    <Route 
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))
            }
        </Switch>
    )
};

export default LayoutBasic;
