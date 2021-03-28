import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from "antd";

import "./LayoutAdmin.scss";

const LayoutAdmin = (props) => {

    const { routes } = props;
    const { Header, Content, Footer } = Layout;

    // console.log(routes);

    return (
        <Layout>
            <h2>Menú Sider</h2>
            <Layout>
                <Header>Header...</Header>
                <Content>
                    <LoadRoutes routes={routes} />
                </Content>
                <Footer>Piñisco</Footer>
            </Layout>
        </Layout>
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
    );
};

export default LayoutAdmin;
