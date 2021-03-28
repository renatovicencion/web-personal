import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from "antd";

import "./LayoutBasic.scss";

const LayoutBasic = ({ routes }) => {

    const { Content, Footer } = Layout;

    return (
        <Layout>
            <h2>Menú Sider Basic</h2>
            <Layout>
                <Content>
                    <LoadRoutes routes={routes} />
                </Content>
                <Footer>Piñisco...</Footer>
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
    )
};

export default LayoutBasic;
