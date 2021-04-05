import React from 'react';

import { Row, Col } from 'antd';

import "./MainBanner.scss";

const MainBanner = () => {
    return (
        <div className="main-banner">
            <div className="main-banner__dark" />

            <Row>
                <Col lg={4}></Col>
                <Col lg={16}>
                    <h2>
                        Aprende nuevas <br /> tecnologías web y móvil.
                    </h2>

                    <h3>
                        A través de cursos prácticos y actualizados, creador por { " " } 
                        <br />

                        profesionales con años de experiencia.
                    </h3>
                </Col>
                <Col lg={4}></Col>
            </Row>
        </div>
    );
};

export default MainBanner;
