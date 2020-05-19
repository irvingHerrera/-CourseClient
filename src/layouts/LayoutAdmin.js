import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import './LayoutAdmin.scss';

export default function LayoutAdmin(props) {
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    console.log(props);
    
    return (
        <Layout>
            {/* TODO: Menu Silder */}
            <Layout className='layout-admin'>
                <Header className='layout-admin__header'></Header>
                {/* TODO: Menu Top */}
                <Content className='layout-admin__content'>
                    <LoadRoutes routes={routes}></LoadRoutes>
                </Content>
                <Footer className='layout-admin__footer'>Irving Herrera</Footer>
            </Layout>
        </Layout>
    );
}
    function LoadRoutes({ routes }) {
        return (
            <Switch>
                {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                        />
                    ))}
            </Switch>
        );
    }