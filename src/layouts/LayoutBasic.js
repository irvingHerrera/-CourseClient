import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';

import './LayoutBasic.scss';

export default function(props) {

    const { routes } = props;
    const { Content, Footer } = Layout;

    return(
        <Layout>
            <h2>Menu dddddddddd</h2>
            <Layout>
                <Content>
                    <LoadRouters routes={routes}></LoadRouters>
                </Content>
                <Footer>Irving Herrera</Footer>
            </Layout>
        </Layout>
    );

    function LoadRouters({ routes }) {
        return routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
        ));
    }
}