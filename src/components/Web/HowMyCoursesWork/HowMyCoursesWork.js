import React from 'react';

import { Row, Col, Card } from 'antd';
import { ClockCircleOutlined, KeyOutlined, MessageOutlined, UserOutlined, DollarCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

import './HowMyCoursesWork.scss';

const HowMyCoursesWork = () => {
    return (
        <Row className="how-my-courses-work">
            <Col lg={24} className="how-my-courses-work__title">
                <h2>¿Cómo funcionan mis cursos?</h2>
                <h3>
                    Cada curso cuenta con contenido bajo la web de Udemy, activa las 24
                    horas al día los 365 días del año.
                </h3>
            </Col>

            <Col lg={4} />
            <Col lg={16}>
                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo 
                            icon={<ClockCircleOutlined className="icon" />}
                            title="Cursos y Clases"
                            description="Cursos de entre 10 y 30 horas y cada clase del curso con duración máxima de 15 minutos, fáciles de llevar en tu día a día de aprendizaje."
                        />
                    </Col>

                    <Col md={8}>
                        <CardInfo 
                            icon={<KeyOutlined className="icon" />}
                            title="Acceso 24/7"
                            description="Acceso a los cursos en cualquier momento, desde cualquier lugar sin importar día y hora."
                        />
                    </Col>

                    <Col md={8}>
                        <CardInfo 
                            icon={<MessageOutlined className="icon" />}
                            title="Aprendizaje Colaborativo"
                            description="Aprender de los demás dejando tus dudas para que profesores y compañerxs te ayuden."
                        />
                    </Col>
                </Row>

                <Row className="row-cards">
                    <Col md={8}>
                        <CardInfo 
                            icon={<UserOutlined className="icon" />}
                            title="Mejora tu Perfil"
                            description="Aprende a mejorar tu perfil para mantenerte informado de actualizaciones."
                        />
                    </Col>

                    <Col md={8}>
                        <CardInfo 
                            icon={<DollarCircleOutlined className="icon" />}
                            title="Precios Bajos"
                            description="Obtén el curso que necesitas por sólo $9.99 y ten acceso a el por tiempo ilimitado y soporte ilimitado."
                        />
                    </Col>

                    <Col md={8}>
                        <CardInfo 
                            icon={<CheckCircleOutlined className="icon" />}
                            title="Certificado de Finalización"
                            description="Al completar tu curso recibirás una certificación que te expedirá Udemy en PDF."
                        />
                    </Col>
                </Row>
            </Col>
            <Col lg={4} />
        </Row>
    );
};

function CardInfo({ icon, title, description }) {
    
    const { Meta } = Card;

    return (
        <Card className="how-my-courses-work__card">
            {icon}
            <Meta title={title} description={description} />
        </Card>
    );
}

export default HowMyCoursesWork;
