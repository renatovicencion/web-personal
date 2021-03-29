import React, { useState, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from "antd";
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider';
import AdminSignIn from '../pages/Admin/SignIn';

import "./LayoutAdmin.scss";

const LayoutAdmin = (props) => {

    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { Header, Content, Footer } = Layout;

    const user = null;

    if (!user) {
        return (
            <Fragment>
                <Route path="/admin/login" component={AdminSignIn} />
                <Redirect to="/admin/login" />
            </Fragment>
        );
    };

    return (
        <Layout>
            <MenuSider menuCollapsed={menuCollapsed} />
            <Layout className="layout-admin">
                <Header className="layout-admin__header">
                    <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
                </Header>
                <Content className="layout-admin__content" style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}>
                    <LoadRoutes routes={routes} />
                </Content>
                <Footer className="layout-admin__footer">Piñisco</Footer>
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
