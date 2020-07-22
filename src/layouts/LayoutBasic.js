import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import MenuTop from '../components/Web/MenuTop'

import './LayoutBasic.scss';

export default function(props) {

    const { routes } = props;
    const { Footer } = Layout;

 return(
     <>
        <Row>
            <Col md={4}></Col>
            <Col md={16}>
                <MenuTop></MenuTop>
                
            </Col>
            <Col md={4}></Col>
        </Row>
        <LoadRoutes routes={routes}></LoadRoutes>
        <Footer>Irving Herrera</Footer>
    </>
);

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
}